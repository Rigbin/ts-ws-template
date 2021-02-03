import { requestLogging } from '@app/middleware/logging/logging';
import { router, routingError } from '@app/router';
import { CorsOptionsDelegate } from '@config/cors.settings';
import { NODE_ENV, VERSION } from '@config/environment';
import { LogFactory } from '@util/logger/logger';
import cors from 'cors';
import express, { Express } from 'express';

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

  private start(): void {
    this.app.listen(this.port, () => {
      LOGGER.info(`server successfully started and is listening on Port ${this.port}... you're environment is '${NODE_ENV}'... you're version is '${VERSION}'`);
    });
  }

}