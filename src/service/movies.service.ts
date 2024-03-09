import { Movie } from '@database/model/movie.model';
import { IMovie } from '@type/movie';

export class MoviesService {
  public async getAllMovies(page: number, limit: number): Promise<IMovie[]> {
    console.log('getAllMovies', page, limit);
    return Movie.find(
      {},
      {},
      {
        skip: (page - 1) * limit,
        limit,
      }
    );
  }

  public async searchMovies(query: string, page: number, limit: number): Promise<IMovie[]> {
    const queryFilter = query
      ? {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { genre: { $regex: query, $options: 'i' } },
        ],
      }
      : {};

    return Movie.find(
      queryFilter,
      {},
      {
        skip: (page - 1) * limit,
        limit,
      }
    );
  }

  public async addMovie(movie: Partial<IMovie>): Promise<IMovie> {
    return Movie.create(movie);
  }

  public async updateMovie(id: string, movie: Partial<IMovie>): Promise<IMovie> {
    return Movie.findByIdAndUpdate(id, movie, { new: true });
  }

  public async deleteMovie(id: string): Promise<IMovie> {
    return Movie.findByIdAndDelete(id);
  }
}
