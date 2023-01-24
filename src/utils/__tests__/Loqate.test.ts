import Loqate from '../Loqate';
import { server } from '../../__tests__/server';
import { selection } from '../../__tests__/__fixtures__/selection';
import { suggestions } from '../../__tests__/__fixtures__/suggestions';
import { errorHandler } from '../../__tests__/serverHandlers';
import { describe, beforeAll, afterEach, afterAll, it, expect } from 'vitest';
import { fetch } from 'cross-fetch';

global.fetch = fetch;
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('Loqate', () => {
  it('should initialize', () => {
    const loqate = Loqate.create('some-key', 'some-base-url');

    expect(loqate.key).toBe('some-key');
    expect(loqate.baseUrl).toBe('some-base-url');
  });

  describe('retrieve()', () => {
    it('should retrieve results', async () => {
      const loqate = Loqate.create('some-key');

      const data = await loqate.retrieve('some-id');

      expect(data).toEqual(selection);
    });
  });

  describe('find()', () => {
    it('should find', async () => {
      const loqate = Loqate.create('some-key');

      const { Items } = await loqate.find({
        text: 'some-text',
        language: 'some-language',
        countries: ['GB', 'US'],
        limit: 10,
        containerId: 'some-container-id',
      });

      expect({ Items }).toEqual(suggestions);
    });

    it('should throw loqate errors', async () => {
      server.use(errorHandler);

      const loqate = Loqate.create('some-key');

      await expect(async () => {
        await loqate.find({
          text: 'some-text',
          language: 'some-language',
          countries: ['GB', 'US'],
          limit: 10,
          containerId: 'some-container-id',
        });
      }).rejects.toThrowError(
        new Error(
          'Loqate error: {"Error":"2","Description":"Unknown key","Cause":"The key you are using to access the service was not found.","Resolution":"Please check that the key is correct. It should be in the form AA11-AA11-AA11-AA11."}'
        )
      );
    });
  });
});
