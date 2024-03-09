import bcrypt from 'bcrypt';
import createError from 'http-errors';
import i18n from 'i18n';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@config/secret';
import constant from '@config/constant';
import logger from '@core/logger';
import { User } from '@database/model/user.model';
import IUser from '@type/user';

export class UserService {
  /**
   * @param  {string} email user's email
   * @param  {string} password password
   * @returns Promise<User>
   */

  public async register(
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    role?: string
  ): Promise<Partial<IUser>> {
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      throw new createError.BadRequest(i18n.__('user_already_exists'));
    }
    const hashedPassword = await this.getEncryptedPassword(password);
    const user = new User();
    user.email = email.toLowerCase();
    user.password = hashedPassword;
    user.firstName = firstName;
    user.lastName = lastName || null;
    user.role = role || constant.USER_ROLE;
    const savedUser = await User.create(user);
    logger.info(`User ${user.email} registered at ${new Date().toLocaleString()}`);
    const token = jwt.sign({ id: savedUser._id, email: user.email }, JWT_SECRET);
    return {
      token,
      id: savedUser._id,
      email: savedUser.email,
      role: savedUser.role,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
    };
  }

  /**
   * @param  {string} email
   * @param  {string} password
   * @returns Promise
   */
  public async login(email: string, password: string): Promise<Partial<IUser>> {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new createError.NotFound(i18n.__('user_not_found'));
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new createError.BadRequest(i18n.__('incorrect_password'));
    }
    logger.info(`User ${user.email} logged in at ${new Date().toLocaleString()}`);
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    return {
      id: user.id,
      email: user.email,
      token,
    };
  }

  /**
   * generates a hashed string from the given string
   * @param  {string} password
   * @returns Promise for a hashed string
   */
  private async getEncryptedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(constant.SALT_ROUNDS);
    return bcrypt.hash(password, salt);
  }
}
