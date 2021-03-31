import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { handlers } from './serverHandlers';

const server = setupServer(...handlers);

export { server, rest };
