import { HttpResponse, http } from 'msw';

import {
  LOQATE_BASE_URL,
  LOQATE_FIND_URL,
  LOQATE_RETRIEVE_URL,
} from '../constants/loqate';
import { selection } from './__fixtures__/selection';
import { suggestions } from './__fixtures__/suggestions';

export const handlers = [
  http.get(`${LOQATE_BASE_URL}/${LOQATE_FIND_URL}`, async ({ request }) => {
    const url = new URL(request.url);
    const apiKey = url.searchParams.get('Key');

    if (!apiKey) {
      return new HttpResponse('Provide API key', { status: 401 });
    }
    return HttpResponse.json(suggestions);
  }),

  http.get(`${LOQATE_BASE_URL}/${LOQATE_RETRIEVE_URL}`, async ({ request }) => {
    const url = new URL(request.url);
    const apiKey = url.searchParams.get('Key');
    const id = url.searchParams.get('Id');

    if (!apiKey) {
      return new HttpResponse('Provide API key', { status: 401 });
    }

    if (!id) {
      return new HttpResponse('Provide Id', { status: 400 });
    }
    return HttpResponse.json(selection);
  }),

  http.get(`https://foo.bar/${LOQATE_FIND_URL}`, async () => {
    return HttpResponse.json({
      Items: [
        {
          Id: 'baz',
          Type: 'Address',
          Text: 'foo',
          Highlight: '0-13',
          Description: 'bar',
        },
      ],
    });
  }),
];

export const errorHandler = http.get(
  `${LOQATE_BASE_URL}/${LOQATE_FIND_URL}`,
  async () => {
    return HttpResponse.json({
      Items: [
        {
          Error: '2',
          Description: 'Unknown key',
          Cause: 'The key you are using to access the service was not found.',
          Resolution:
            'Please check that the key is correct. It should be in the form AA11-AA11-AA11-AA11.',
        },
      ],
    });
  }
);
