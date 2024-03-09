import { Request, Response } from 'express';
import i18n from 'i18n';
import { ResponseParser } from '@util/response-parser';
import constant from '@config/constant';
import { UserService } from '@service/user.service';

export class UsersController {
  private responseParser: ResponseParser;
  private userService: UserService;

  constructor() {
    this.responseParser = new ResponseParser();
    this.userService = new UserService();
  }

  public register = async (req: Request, res: Response): Promise<void> => {
    const { email, password, firstName, lastName = null, role = null } = req.body;
    const response = await this.userService.register(email, password, firstName, lastName, role);
    this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_CREATED)
      .setBody(response)
      .setMessage(i18n.__('SUCCESS'))
      .send(res);
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const response = await this.userService.login(email, password);
    this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__('SUCCESS'))
      .send(res);
  };
}
