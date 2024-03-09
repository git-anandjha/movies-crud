// Copyright (C) 2019 by StudioGraphene. All rights reserved.

import { Request, Response, NextFunction } from 'express';
import i18n from 'i18n';
import * as jwt from 'jsonwebtoken';
import createError from 'http-errors';

import { ResponseParser } from '@util/response-parser';
import constant from '@config/constant';
import logger from '@core/logger';
import { JWT_SECRET } from '@config/secret';
import { User } from '@database/model/user.model';

declare module 'express' {
  export interface Request {
    user: Record<string, unknown>;
  }
}

export class AuthenticateRequest {
  /**
   * Global middleware to check request is autneticated of not
   * @param req
   * @param res
   * @param next
   */
  public validate(req: Request, res: Response, next: NextFunction): void {
    const token = req.header('x-auth-token');
    if (!token) {
      const responseParser = new ResponseParser();
      responseParser
        .setHttpCode(constant.HTTP_STATUS_UNAUTHORIZED)
        .setStatus(false)
        .setResponseCode('unauthorized')
        .setMessage(i18n.__('unauthorized'))
        .setBody({})
        .send(res);
      return;
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);
    logger.debug({
      message: 'Decoded Token',
      data: decodedToken,
    });
    if (!decodedToken) {
      throw new createError.Unauthorized(i18n.__('invalidToken'));
    }
    req.user = JSON.parse(JSON.stringify(decodedToken));

    logger.info({
      message: 'User Context',
      user: req.user,
    });
    next();
  }

  /**
   * Middleware to check request from an admin role
   * @param req
   * @param res
   * @param next
   */
  public async isAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userDetails = await User.findOne({ email: req.user.email });
    if (userDetails.role !== 'admin') {
      const responseParser = new ResponseParser();
      responseParser
        .setHttpCode(constant.HTTP_STATUS_UNAUTHORIZED)
        .setStatus(false)
        .setResponseCode('unauthorized')
        .setMessage(i18n.__('only_admin_allowed'))
        .setBody({})
        .send(res);
    }
    next();
  }
}
