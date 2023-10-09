import { resolveHTTPResponse } from '@trpc/server/http';
import { TRPCError } from '@trpc/server';
import { a as defineEventHandler, g as getRequestURL, c as createError, i as isMethod, r as readBody } from './nitro/vercel.mjs';
import { getErrorShape } from '@trpc/server/shared';
import { a as appRouter } from './index.mjs';
import { c as createContext } from './context.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'fs';
import 'path';
import 'zod';
import 'typeorm';

// src/index.ts
function getPath(event) {
  const { params } = event.context;
  if (typeof params?.trpc === "string") {
    return params.trpc;
  }
  if (params?.trpc && Array.isArray(params.trpc)) {
    return params.trpc.join("/");
  }
  return null;
}
function createNuxtApiHandler({
  router,
  createContext,
  responseMeta,
  onError,
  batching
}) {
  return defineEventHandler(async (event) => {
    const {
      req,
      res
    } = event.node;
    const $url = getRequestURL(event);
    const path = getPath(event);
    if (path === null) {
      const error = getErrorShape({
        config: router._def._config,
        error: new TRPCError({
          message: 'Query "trpc" not found - is the file named `[trpc]`.ts or `[...trpc].ts`?',
          code: "INTERNAL_SERVER_ERROR"
        }),
        type: "unknown",
        ctx: void 0,
        path: void 0,
        input: void 0
      });
      throw createError({
        statusCode: 500,
        statusMessage: JSON.stringify(error)
      });
    }
    const httpResponse = await resolveHTTPResponse({
      batching,
      router,
      req: {
        method: req.method,
        headers: req.headers,
        body: isMethod(event, "GET") ? null : await readBody(event),
        query: $url.searchParams
      },
      path,
      createContext: async () => await createContext?.(event),
      responseMeta,
      onError: (o) => {
        onError?.({
          ...o,
          req
        });
      }
    });
    const { status, headers, body } = httpResponse;
    res.statusCode = status;
    headers && Object.keys(headers).forEach((key) => {
      res.setHeader(key, headers[key]);
    });
    return body;
  });
}

const _trpc_ = createNuxtApiHandler({
  router: appRouter,
  createContext
});

export { _trpc_ as default };
//# sourceMappingURL=_trpc_.mjs.map
