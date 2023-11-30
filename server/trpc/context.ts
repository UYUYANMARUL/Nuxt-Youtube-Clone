import { inferAsyncReturnType } from "@trpc/server";
import { AppDataSource } from "../data/data-source";
import { DataSource } from "typeorm";
import { User } from "server/models/User";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

import { H3Event } from "h3";

import * as h3 from "h3";

import type { NodeIncomingMessage, NodeServerResponse } from "h3";

export interface ContextType {
  db: DataSource;
  session: { user: Partial<User> };
  req: NodeIncomingMessage;
  res: NodeServerResponse;
}

function getSession(opts: H3Event<h3.EventHandlerRequest>): {
  user: Partial<User>;
} {
  try {
    const cookie = parse(opts?.req?.headers?.cookie);
    const parsedToken: jwt.Jwt = jwt.verify(
      cookie.token,
      process.env.VITE_JWT_SECURITY ?? "SECRET",
      { complete: true },
    );

    return { user: { userName: parsedToken?.payload?.username } };
  } catch (err) {
    return { user: {} };
  }
}

export const createContext = async (opts: H3Event<h3.EventHandlerRequest>) => {
  const session = getSession(opts);
  return <ContextType>{
    db: AppDataSource,
    session,
    req: opts.req,
    res: opts.res,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
