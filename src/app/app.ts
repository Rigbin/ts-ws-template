import { requestLogging } from '@app/middleware/logging/logging';
import { router, routingError } from '@app/router';
import { CorsOptionsDelegate } from '@config/cors.settings';
import { MONGODB, NODE_ENV, VERSION } from '@config/environment';
import { LogFactory } from '@util/logger/logger';
import cors from 'cors';
import express, { Express } from 'express';
import mongoose from 'mongoose';

const LOGGER = LogFactory.getLogger('app');

export default class App {
  private static instance: App;
  protected app: Express;

  protected constructor(private port: number) {
    this.app = express();
  }

  public static start(port: number): void {
    if (!this.instance) {
      this.instance = new App(port);
      this.instance.setMiddleware();
      this.instance.setRouter();
    }
    this.instance.start();
  }

  /**
 * To pre-inject separate routes (e.g. for testing), the setRouter will not be called in the constructor!
 */
  protected setRouter(): void {
    this.app.use(router);
    this.app.use(routingError);
  }

  protected setMiddleware(): void {
    this.app.use(cors(CorsOptionsDelegate));
    this.app.use(requestLogging);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  private initDb(): Promise<void> {
    const url = `mongodb://${MONGODB.DB_USER}:${MONGODB.DB_PASS}@${MONGODB.DB_HOST}:${MONGODB.DB_PORT}/${MONGODB.DATABASE}?authSource=admin`;
    return new Promise<void>((resolve, reject) => {
      mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      }, (err) => {
        if (err) {
          LOGGER.error('db connection error:', err);
          reject(err);
        } else {
          LOGGER.info('successfully connected to database');
          resolve();
        }
      });
    });

  }

  private start(): void {
    this.initDb()
      .then(_ => {
        this.app.listen(this.port, () => {
          LOGGER.info(`server successfully started and is listening on Port ${this.port}... you're environment is '${NODE_ENV}'... you're version is '${VERSION}'`);
        });
      })
      .catch(err => {
        LOGGER.error('could not start server!');
      });
  }

}