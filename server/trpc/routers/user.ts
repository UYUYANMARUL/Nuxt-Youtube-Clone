import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const userRouter = router({
  getUserFollowings: publicProcedure.input(z.object({})).query(async () => {}),

  getChannelById: publicProcedure.input(z.object({})).query(async () => {}),

  getDashboardData: protectedProcedure
    .input(z.object({}))
    .query(async () => {}),

  addFollow: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {}),

  updateUser: protectedProcedure.input(z.object({})).query(async () => {}),

  login: publicProcedure.input(z.object({})).query(async () => {}),

  register: publicProcedure.input(z.object({})).query(async () => {}),
});
