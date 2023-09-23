import superjson from 'superjson'
/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */
import { initTRPC } from '@trpc/server'
import { Context } from './context'
import { OpenApiMeta } from 'trpc-openapi'

/**
 * Unprotected procedure
 **/
const t = initTRPC
  .context<Context>()
  .meta<OpenApiMeta>()
  .create({
    errorFormatter: ({ error, shape }) => {
      if (error.code === 'INTERNAL_SERVER_ERROR' && process.env.NODE_ENV === 'production') {
        return { ...shape, message: 'Internal server error' }
      }
      return shape
    },
  })
export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure

export const router = t.router
export const middleware = t.middleware
