export declare const handlers: import("msw/lib/types").RequestHandler<import("msw/lib/types").MockedRequest<import("msw/lib/types/utils/handlers/requestHandler").DefaultRequestBodyType, import("msw/lib/types").RequestParams>, {
    set: typeof import("msw/lib/types/context").set;
    status: (statusCode: number, statusText?: string | undefined) => import("msw/lib/types").ResponseTransformer<any>;
    cookie: (name: string, value: string, options?: import("cookie").CookieSerializeOptions | undefined) => import("msw/lib/types").ResponseTransformer<any>;
    body: <BodyType extends string | Blob | ArrayBufferView | ArrayBuffer | FormData | ReadableStream<any>>(value: BodyType) => import("msw/lib/types").ResponseTransformer<BodyType>;
    text: <BodyType_1 extends string>(body: BodyType_1) => import("msw/lib/types").ResponseTransformer<BodyType_1>;
    json: <BodyType_2>(body: BodyType_2) => import("msw/lib/types").ResponseTransformer<BodyType_2>;
    xml: <BodyType_3 extends string>(body: BodyType_3) => import("msw/lib/types").ResponseTransformer<BodyType_3>;
    delay: (durationMs?: number | undefined) => import("msw/lib/types").ResponseTransformer<any>;
    fetch: (input: string | import("msw/lib/types").MockedRequest<import("msw/lib/types/utils/handlers/requestHandler").DefaultRequestBodyType, import("msw/lib/types").RequestParams>, requestInit?: RequestInit | undefined) => any;
}, import("msw/lib/types").ParsedRestRequest, import("msw/lib/types").MockedRequest<import("msw/lib/types/utils/handlers/requestHandler").DefaultRequestBodyType, import("msw/lib/types").RequestParams>, any>[];
