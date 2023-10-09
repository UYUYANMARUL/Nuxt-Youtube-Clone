import { inferAsyncReturnType } from "@trpc/server";
import { AppDataSource } from "../data/data-source";
import { DataSource } from "typeorm";
import { User } from "server/models/User";
import * as trpcNuxt from "@trpc/server/adapters/nuxt";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */

export interface ContextType {
  db: DataSource;
  session: { user: Partial<User> };
}

export const createContext = (opts: trpcNuxt.create) => {
  return <ContextType>{
    db: AppDataSource,
    session: { user: { userName: "test" } },
    req: opts.req,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
