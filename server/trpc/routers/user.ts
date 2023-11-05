import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import jwt from "jsonwebtoken";
import cryptoRandomString from "crypto-random-string";
import * as bcrypt from "bcrypt";
import { serialize } from "cookie";
import { TRPCError } from "@trpc/server";
import { User } from "../../models/User";

export const userRouter = router({
  getUserFollowings: publicProcedure.input(z.object({})).query(async () => {
    return {};
  }),

  getChannelById: publicProcedure.input(z.object({})).query(async () => {
    return {};
  }),

  getDashboardData: protectedProcedure.input(z.object({})).query(async () => {
    return {};
  }),

  addFollow: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return {};
    }),

  updateUser: protectedProcedure.input(z.object({})).query(async () => {
    return {};
  }),

  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .meta({
      openapi: {
        method: "POST",
        path: "/auth/login",
        tags: ["users"],
      },
    })
    .output(z.object({}))
    .mutation(async ({ ctx, input }) => {
      const user: User = await ctx.db
        .getRepository(User)
        .createQueryBuilder("users")
        .where("users.email = :email", { email: input.email })
        .getOne();
      input.password = input.password + user?.passwordrnd;

      console.log(await bcrypt.hash(input.password, 5));

      // console.log(bcrypt.compare(input.password, user.password.toString())

      // if (!(await bcrypt.compare(input.password, user.password))) {
      //   throw TRPCError;
      // }

      const randomstr = cryptoRandomString({
        length: 16,
        type: "ascii-printable",
      });

      const token = jwt.sign(
        { username: user.userName, unique: randomstr },
        process.env.VITE_JWT_SECURITY ?? "SECRET",
        { issuer: "www/sadsad/", expiresIn: 300, keyid: "JWT_SECURITY1" },
      );

      console.log(user);

      const serialized = serialize("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      });

      console.log(serialized);
      ctx.res.appendHeader("Set-Cookie", serialized);
      console.log(ctx.req.headers);

      return {};
    }),

  register: publicProcedure.input(z.object({})).query(async () => {
    return {};
  }),
});
