/* eslint-disable @typescript-eslint/ban-ts-comment */
import { routingError } from '../../../src/app/router';
import { TestApp, Request, Response, TestResponse } from '../e2e-setup';

describe('express app testing', () => {

  describe('routing tests', () => {
    it('should response 200 and "it works..." on GET /', async () => {
      const response: TestResponse = await TestApp.get('/');

      expect(response.status).toBe(200);
      expect(response.text).toMatch(/^it works with version \[.+?\]$/);
    });

    it('should response 404 on unset GET', async () => {
      const response: TestResponse = await TestApp.get('/unset');

      expect(response.status).toBe(404);
      expect(response.text).toBe('404 - page not found');
    });

    test.each([
      ['POST', '/'],
      ['PUT', '/'],
      ['DELETE', '/'],
      ['PATCH', '/'],
      ['OPTIONS', '/'],
      ['TRACE', '/'],
    ])('should response 501 on %s', async (method: string, url: string) => {
      // @ts-ignore
      const response: TestResponse = await TestApp[method.toLowerCase()](url);

      expect(response.status).toBe(501);
      expect(response.text).toBe('501 - not implemented');
    });

    it('should response 500 on error', async () => {
      const response: TestResponse = await TestApp.get('/errortest');

      expect(response.status).toBe(500);
      expect(response.text).toBe('Something went wrong');
    });

  });

});

describe('routing error tests', () => {
  let req: Request;
  let res: Response;
  const next = jest.fn();
  const statusMock = jest.fn();
  const sendMock = jest.fn();

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: statusMock,
      send: sendMock,
    } as unknown as Response;
    next.mockClear();
  });

  test('should handle error', () => {
    statusMock.mockImplementation((status) => {
      expect(status).toBe(500);
      return res;
    });

    routingError(new Error('testerror'), req, res, next);
    expect(next).toBeCalledTimes(1);
  });
});
