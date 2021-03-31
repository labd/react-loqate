import Loqate from '../Loqate';
import { server } from '../../__tests__/server';
import { selection } from '../../__tests__/__fixtures__/selection';
import { suggestions } from '../../__tests__/__fixtures__/suggestions';

describe('Loqate', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should initialize', () => {
    const loqate = Loqate.create('some-key', 'some-base-url');

    expect(loqate.key).toBe('some-key');
    expect(loqate.baseUrl).toBe('some-base-url');
  });

  describe('retrieve()', () => {
    it('should retrieve results', async () => {
      const loqate = Loqate.create('some-key');

      const { data } = await loqate.retrieve('some-id');

      expect(data).toEqual(selection);
    });
  });

  describe('find()', () => {
    it('should find', async () => {
      const loqate = Loqate.create('some-key');

      const { data } = await loqate.find({
        text: 'some-text',
        language: 'some-language',
        countries: ['GB', 'US'],
        limit: 10,
        containerId: 'some-container-id',
      });

      expect(data).toEqual(suggestions);
    });
  });
});
