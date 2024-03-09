import { config as dotenvConfig } from 'dotenv';

dotenvConfig();
export const ENVIRONMENT = process.env.NODE_ENV;
export const { PORT, JWT_SECRET, DB_URL } = process.env;
