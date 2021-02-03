/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Express, Request, Response } from 'express';
// @ts-ignore
import request from 'supertest';
import App from '../../src/app/app';

// fake to use 'app' in tests without the need of a running server!
class AppFake extends App {
  constructor() {
    super(0);
    this.app.use('/errortest', (req: Request, res: Response) => {
      throw new Error('');
    });
    this.setRouter();
  }

  public getAppForTest(): Express { return this.app; }
}

const TestApp = request(new AppFake().getAppForTest());
type TestResponse = request.Response;


export { TestApp, Request, Response, TestResponse };
