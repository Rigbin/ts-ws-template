import { TestApp, TestResponse } from '../../../e2e-setup';

const PATH = '/v1';

test('GET /', async () => {
  const response: TestResponse = await TestApp.get(PATH);

  expect(response.status).toBe(200);
  expect(response.text).toBe('API v1');
});
