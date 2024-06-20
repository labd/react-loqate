import { fetch } from 'cross-fetch';
import { describe, expect, it } from 'vitest';
import { selection } from '../../__tests__/__fixtures__/selection';
import { suggestions } from '../../__tests__/__fixtures__/suggestions';
import { server } from '../../__tests__/server';
import { biasHandler, errorHandler } from '../../__tests__/serverHandlers';
import Loqate from '../Loqate';

global.fetch = fetch;

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

    it('accepts bias and origin', async () => {
      server.use(biasHandler);

      const loqate = Loqate.create('some-key');
      const { Items } = await loqate.find({
        text: 'some-text',
        language: 'some-language',
        countries: ['GB', 'US'],
        limit: 10,
        containerId: 'some-container-id',
        bias: true,
        origin: '93.184.216.34',
      });

      expect({ Items }).toEqual({
        Items: {
          Id: 'GB|RM|ENG|TAMWORTH-PICCADILLY',
          Type: 'Locality',
          Text: 'Piccadilly, Tamworth, B78',
          Highlight: '0-10',
          Description: '174 Addresses',
        },
      });
    });

    it('should throw errors', async () => {
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
      }).rejects.toThrowError(new Error('Unknown key'));
    });

    it('should throw loqate errors', async () => {
      server.use(errorHandler);

      const loqate = Loqate.create('some-key');

      let error;
      try {
        await loqate.find({
          text: 'some-text',
          language: 'some-language',
          countries: ['GB', 'US'],
          limit: 10,
          containerId: 'some-container-id',
        });
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(new Error('Unknown key'));
      expect(JSON.stringify(error)).toEqual(
        JSON.stringify({
          Cause: 'The key you are using to access the service was not found.',
          Description: 'Unknown key',
          Error: '2',
          Resolution:
            'Please check that the key is correct. It should be in the form AA11-AA11-AA11-AA11.',
        })
      );
    });
  });
});
