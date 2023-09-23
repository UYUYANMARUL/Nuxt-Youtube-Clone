import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const appointmentsRouter = router({
  getVideoById: publicProcedure.input({}).query(async () => {}),

  getVideoBySearch: publicProcedure.input({}).query(async () => {}),

  getRandomVideos: publicProcedure.input({}).query(async () => {}),

  getVideoByUserId: publicProcedure.input({}).query(async () => {}),

  publishVideo: protectedProcedure.input({}).query(async () => {}),

  deleteVideo: protectedProcedure.input({}).query(async () => {}),

  updateVideo: protectedProcedure.input({}).query(async () => {}),

  createVideo: protectedProcedure.input({}).query(async () => {}),
});
