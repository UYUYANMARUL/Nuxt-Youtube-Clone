import { createOpenApiNuxtHandler } from 'trpc-openapi';
import { a as appRouter } from './index.mjs';
import { c as createContext } from './context.mjs';
import '@trpc/server';
import 'zod';
import 'typeorm';

const ____trpc_ = createOpenApiNuxtHandler({
  router: appRouter,
  createContext
});

export { ____trpc_ as default };
//# sourceMappingURL=_...trpc_.mjs.map
