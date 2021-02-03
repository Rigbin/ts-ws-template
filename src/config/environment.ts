import { config } from 'dotenv';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('@pack');

// init .env
config();

const NODE_ENV: string = process.env.NODE_ENV || 'development';
const PORT: number = +process.env.SERVER_PORT || 8080;


export {
  NODE_ENV,
  PORT,
  version as VERSION,
};
