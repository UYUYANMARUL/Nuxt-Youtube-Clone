import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const appointmentsRouter = router({
  addViewCount: publicProcedure.input({}).query(async () => {}),

  addLike: protectedProcedure.input({}).query(async () => {}),

  addDislike: protectedProcedure.input({}).query(async () => {}),

  removeLike: protectedProcedure.input({}).query(async () => {}),
});
