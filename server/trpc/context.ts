import { inferAsyncReturnType } from "@trpc/server";
import { AppDataSource } from "../data/data-source";
import { DataSource } from "typeorm";
import { User } from "server/models/User";

import { H3Event } from "h3";

import * as h3 from "h3";

import type { NodeIncomingMessage, NodeServerResponse } from "h3";

import {
  createError,
  defineEventHandler,
  getRequestURL,
  isMethod,
  readBody,
} from "h3";

import { OpenApiRouter } from "trpc-openapi";

export interface ContextType {
  db: DataSource;
  session: { user: Partial<User> };
  req: NodeIncomingMessage;
  res: NodeServerResponse;
}
//
// export interface TRPCRequest {
//   req: HTTPRequest;
//   res: HTTPResult;
// }

export const createContext = async (opts: H3Event<h3.EventHandlerRequest>) => {
  return <ContextType>{
    db: AppDataSource,
    session: { user: { userName: "test" } },
    req: opts.req,
    res: opts.res,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
