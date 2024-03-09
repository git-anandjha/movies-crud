import mongoose from 'mongoose';
import { DB_URL } from '@config/secret';
import logger from '@core/logger';
export const dbConnection = async () => {
  try {
    await mongoose.connect(DB_URL);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('Error connecting to MongoDB', error);
  }
};
