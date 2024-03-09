import { Request, Response } from 'express';
import { MoviesService } from '@service/movies.service';
import { ResponseParser } from '@util/response-parser';
import constant from '@config/constant';
import i18n from 'i18n';

export class MoviesController {
  private responseParser: ResponseParser;
  private moviesService: MoviesService;
  constructor() {
    this.responseParser = new ResponseParser();
    this.moviesService = new MoviesService();
  }
  public getAllMovies = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const response = await this.moviesService.getAllMovies(page, limit);
    this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__('SUCCESS'))
      .send(res);
  };

  public searchMovies = async (req: Request, res: Response): Promise<void> => {
    const query = req.query.q as string;
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const response = await this.moviesService.searchMovies(query, page, limit);
    this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__('SUCCESS'))
      .send(res);
  };

  public addMovie = async (req: Request, res: Response): Promise<void> => {
    const movie = req.body;
    const response = await this.moviesService.addMovie(movie);
    this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_CREATED)
      .setBody(response)
      .setMessage(i18n.__('SUCCESS'))
      .send(res);
  };

  public updateMovie = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const movie = req.body;
    const response = await this.moviesService.updateMovie(id, movie);
    this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__('SUCCESS'))
      .send(res);
  };

  public deleteMovie = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const response = await this.moviesService.deleteMovie(id);
    this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__('SUCCESS'))
      .send(res);
  };
}
