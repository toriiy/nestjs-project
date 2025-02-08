import * as process from 'process';
import * as dotenv from 'dotenv';
import { IConfig } from './config.interface';

dotenv.config();

export default (): IConfig => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
  },
  token: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  },
});
