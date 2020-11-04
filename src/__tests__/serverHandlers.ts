import { rest } from 'msw';
import { suggestions } from './suggestions';
import { selection } from './selection';

export const handlers = [
  rest.get(
    'https://api.addressy.com/Capture/Interactive/Find/v1.10/json3.ws',
    async (req, res, ctx) => {
      const apiKey = req.url.searchParams.get('Key');
      if (apiKey) {
        return res(ctx.status(200), ctx.json(suggestions));
      }
      return res(ctx.status(401, 'Provide API key'));
    }
  ),
  rest.get(
    'https://api.addressy.com/Capture/Interactive/Retrieve/v1/json3.ws',
    async (req, res, ctx) => {
      const apiKey = req.url.searchParams.get('Key');
      const id = req.url.searchParams.get('Id');
      if (apiKey && id) {
        return res(ctx.status(200), ctx.json(selection));
      }
      return res(ctx.status(401, 'Provide API key'));
    }
  ),
];
