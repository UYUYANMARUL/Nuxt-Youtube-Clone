import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import jwt from "jsonwebtoken";
import cryptoRandomString from "crypto-random-string";
import * as bcrypt from "bcrypt";
import { serialize } from "cookie";
import { TRPCError } from "@trpc/server";
import { User } from "../../models/User";
import { FollowerTable } from "../../models/FollowerTable";

export const userRouter = router({
  getUserFollowings: publicProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const followers = await ctx.db
        .getRepository(User)
        .find({ select: { followers: true }, where: {} });

      return { followers };
    }),

  getChannelById: publicProcedure.input(z.object({})).query(async () => {
    return {};
  }),

  getDashboardData: protectedProcedure.input(z.object({})).query(async () => {
    return {};
  }),

  unFollow: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .meta({
      openapi: {
        method: "POST",
        path: "/auth/unFollow",
        tags: ["users"],
      },
    })
    .output(z.object({}))
    .mutation(async ({ ctx, input }) => {
      const user: User = await ctx.db
        .getRepository(User)
        .createQueryBuilder("users")
        .where("users.userName = :username", {
          username: ctx.session.user.userName,
        })
        .getOne();

      if (input.id == user.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You Can not unfollow yourself",
          // optional: pass the original error to retain stack trace
        });
      }

      const isAlreadyFollow = await ctx.db
        .getRepository(FollowerTable)
        .createQueryBuilder("followerTables")
        .where("followerTables.userId = :userId", { userId: user.id })
        .andWhere("followerTables.followingId = :followingId", {
          followingId: input.id,
        })
        .getExists();

      if (isAlreadyFollow == false) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You are not follow the user",
          // optional: pass the original error to retain stack trace
        });
      }

      await ctx.db
        .getRepository(FollowerTable)
        .delete({ userId: user.id, followingId: input.id });

      return {};
    }),

  follow: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .meta({
      openapi: {
        method: "POST",
        path: "/auth/follow",
        tags: ["users"],
      },
    })
    .output(z.object({}))
    .mutation(async ({ ctx, input }) => {
      const user: User = await ctx.db
        .getRepository(User)
        .createQueryBuilder("users")
        .where("users.userName = :username", {
          username: ctx.session.user.userName,
        })
        .getOne();

      if (input.id == user.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You Can not follow yourself",
          // optional: pass the original error to retain stack trace
        });
      }

      const isAlreadyFollow = await ctx.db
        .getRepository(FollowerTable)
        .createQueryBuilder("followerTables")
        .where("followerTables.userId = :userId", { userId: user.id })
        .andWhere("followerTables.followingId = :followingId", {
          followingId: input.id,
        })
        .getExists();

      if (isAlreadyFollow == true) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You are already follow the user",
          // optional: pass the original error to retain stack trace
        });
      }

      await ctx.db
        .getRepository(FollowerTable)
        .insert({ userId: user.id, followingId: input.id });
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
    .query(async ({ ctx, input }) => {
      const user: User = await ctx.db
        .getRepository(User)
        .createQueryBuilder("users")
        .where("users.email = :email", { email: input.email })
        .getOne();

      input.password = input.password + user?.passwordrnd;

      if (
        user == null ||
        !(await bcrypt.compare(input.password, user.password))
      ) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Email or password is wrong",
          // optional: pass the original error to retain stack trace
        });
      }

      const randomstr = cryptoRandomString({
        length: 16,
        type: "ascii-printable",
      });

      const token = jwt.sign(
        { username: user.userName, unique: randomstr },
        process.env.VITE_JWT_SECURITY ?? "SECRET",
        { issuer: "www/sadsad/", expiresIn: 300, keyid: "JWT_SECURITY1" },
      );

      const serialized = serialize("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      });

      ctx.res.setHeader("Set-Cookie", serialized);

      return {};
    }),

  register: publicProcedure
    .input(
      z.object({
        user_name: z.string(),
        name: z.string(),
        email: z.string(),
        password: z.string(),
        password_repeat: z.string(),
      }),
    )
    .meta({
      openapi: {
        method: "POST",
        path: "/auth/register",
        tags: ["users"],
      },
    })
    .output(z.object({}))
    .mutation(async ({ ctx, input }) => {
      const isemail: User = await ctx.db
        .getRepository(User)
        .createQueryBuilder("users")
        .where("users.email = :email", { email: input.email })
        .getOne();

      if (isemail != null) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "There is an account associated with this email.",
          // optional: pass the original error to retain stack trace
        });
      }

      const isusername: User = await ctx.db
        .getRepository(User)
        .createQueryBuilder("users")
        .where("users.userName = :username", { username: input.user_name })
        .getOne();

      if (isusername != null) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Username is not available",
          // optional: pass the original error to retain stack trace
        });
      }

      if (input.password != input.password_repeat) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Password Does Not Matches",
          // optional: pass the original error to retain stack trace
        });
      }

      const passwordrnd = cryptoRandomString({
        length: 16,
        type: "ascii-printable",
      });

      input.password = input.password + passwordrnd;

      input.password = await bcrypt.hash(input.password.toString(), 5);

      const user = ctx.db.getRepository(User).create({
        userName: input.user_name,
        password: input.password,
        email: input.email,
        name: input.name,
        passwordrnd,
      });

      await ctx.db.getRepository(User).save(user);

      return {};
    }),
});
