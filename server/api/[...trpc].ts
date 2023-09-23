import { createOpenApiNuxtHandler } from 'trpc-openapi'

import { appRouter } from '../trpc/routers'

import { createContext } from '../trpc/context'

export default createOpenApiNuxtHandler({
  router: appRouter,
  createContext,
})
