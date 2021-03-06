import { config } from 'dotenv';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('@pack');

// init .env
config();

const NODE_ENV: string = process.env.NODE_ENV || 'development';
const PORT: number = +process.env.SERVER_PORT || 8080;
const DATABASE: string = process.env.MONGO_DB || '';
const DB_USER: string = process.env.MONGO_USER || '';
const DB_PASS: string = process.env.MONGO_PASS || '';
const DB_HOST: string = process.env.MONGO_HOST || '';
const DB_PORT: string = process.env.MONGO_PORT || '';

const MONGODB = {
  DATABASE,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_PORT,
};

export {
  MONGODB,
  NODE_ENV,
  PORT,
  version as VERSION,
};
