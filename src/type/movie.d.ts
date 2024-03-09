import { Document } from 'mongoose';

interface IMovie extends Document {
  title: string;
  genre: string;
  rating: number;
  streamingLink: string;
}
