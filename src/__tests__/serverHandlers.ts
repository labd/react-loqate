import { rest } from 'msw';
import { suggestions } from './__fixtures__/suggestions';
import { selection } from './__fixtures__/selection';

import {
  LOQATE_BASE_URL,
  LOQATE_FIND_URL,
  LOQATE_RETRIEVE_URL,
} from '../constants/loqate';

export const handlers = [
  rest.get(`${LOQATE_BASE_URL}/${LOQATE_FIND_URL}`, async (req, res, ctx) => {
    const apiKey = req.url.searchParams.get('Key');

    if (apiKey) {
      return res(ctx.status(200), ctx.json(suggestions));
    }

    return res(ctx.status(401, 'Provide API key'));
  }),

  rest.get(
    `${LOQATE_BASE_URL}/${LOQATE_RETRIEVE_URL}`,
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
