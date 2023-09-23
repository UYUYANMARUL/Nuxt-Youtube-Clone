import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const appointmentsRouter = router({
  getUserFollowings: publicProcedure.input({}).query(async () => {}),

  getChannelById: publicProcedure.input({}).query(async () => {}),

  getDashboardData: protectedProcedure.input({}).query(async () => {}),

  addFollow: protectedProcedure.input({}).query(async () => {}),

  updateUser: protectedProcedure.input({}).query(async () => {}),

  login: publicProcedure.input({}).query(async () => {}),

  register: publicProcedure.input({}).query(async () => {}),
});
