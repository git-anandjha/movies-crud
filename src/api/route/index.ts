import { Application } from 'express';
import moviesRoute from './movies.route';
import usersRoute from './users.route';

export class Routes {
  public routes(app: Application): void {
    // resource and routes mapping comes here
    app.use('/user', usersRoute);
    app.use('/movies', moviesRoute);
  }
}
