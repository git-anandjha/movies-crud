import express from 'express';
import { MoviesController } from '@api/controller/movies.controller';
import { AuthenticateRequest } from '@middleware/authenticate-request';
import { HttpRequestValidator } from '@middleware/http-request-validator';
import {
  paginatedSearchValidator,
  paginationValidator,
  movie,
  idValidation,
} from '@api/validator/movies.validation';

class MoviesRoute {
  public router: express.Router = express.Router();
  private moviesController: MoviesController;
  private authenticate;
  private isAdmin;
  private httpRequestValidator: HttpRequestValidator;
  constructor() {
    const authMiddleware = new AuthenticateRequest();
    this.authenticate = authMiddleware.validate;
    this.isAdmin = authMiddleware.isAdmin;
    this.moviesController = new MoviesController();
    this.httpRequestValidator = new HttpRequestValidator();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/',
      this.httpRequestValidator.validate('query', paginationValidator),
      this.moviesController.getAllMovies
    );
    this.router.get(
      '/search',
      this.httpRequestValidator.validate('query', paginatedSearchValidator),
      this.moviesController.searchMovies
    );
    this.router.post(
      '/',
      this.authenticate,
      this.isAdmin,
      this.httpRequestValidator.validate('body', movie),
      this.moviesController.addMovie
    );
    this.router.put(
      '/:id',
      this.authenticate,
      this.isAdmin,
      this.httpRequestValidator.validate('params', idValidation),
      this.httpRequestValidator.validate('body', movie),
      this.moviesController.updateMovie
    );
    this.router.delete(
      '/:id',
      this.authenticate,
      this.isAdmin,
      this.httpRequestValidator.validate('params', idValidation),
      this.moviesController.deleteMovie
    );
  }
}

export default new MoviesRoute().router;
