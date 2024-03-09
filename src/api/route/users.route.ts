import express from 'express';
import { UsersController } from '@api/controller/users.controller';
import { HttpRequestValidator } from '@middleware/http-request-validator';
import { login, userRegister } from '@api/validator/user.validation';

class UsersRoute {
  public router: express.Router = express.Router();
  private usersController: UsersController;
  private httpRequestValidator: HttpRequestValidator;

  constructor() {
    this.usersController = new UsersController();
    this.httpRequestValidator = new HttpRequestValidator();
    this.assign();
  }

  private assign(): void {
    this.router.post(
      '/register',
      this.httpRequestValidator.validate('body', userRegister),
      this.usersController.register
    );

    this.router.post(
      '/login',
      this.httpRequestValidator.validate('body', login),
      this.usersController.login
    );
  }
}

export default new UsersRoute().router;
