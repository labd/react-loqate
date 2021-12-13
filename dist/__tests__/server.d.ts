import { rest } from 'msw';
declare const server: {
    listen(options?: import("msw/lib/types/sharedOptions").SharedOptions | undefined): void;
    use(...handlers: import("msw/lib/types/setupWorker/glossary").RequestHandlersList): void;
    restoreHandlers(): void;
    resetHandlers(...nextHandlers: import("msw/lib/types/setupWorker/glossary").RequestHandlersList): void;
    close(): void;
};
export { server, rest };
