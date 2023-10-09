import { a as defineEventHandler } from './nitro/vercel.mjs';
import { generateOpenApiDocument } from 'trpc-openapi';
import { a as appRouter } from './index.mjs';
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
import '@trpc/server';
import 'zod';
import 'typeorm';

const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "Example CRUD API",
  description: "OpenAPI compliant REST API built using tRPC with Next.js",
  version: "1.0.0",
  baseUrl: "http://localhost:3000/api",
  docsUrl: "https://github.com/jlalmes/trpc-openapi",
  tags: ["auth", "users", "posts"]
});

const openapi_json = defineEventHandler(() => {
  return openApiDocument;
});

export { openapi_json as default };
//# sourceMappingURL=openapi.json.mjs.map
