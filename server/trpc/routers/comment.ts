import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const commentRouter = router({
  addComment: protectedProcedure
    .input(z.object({ videoId: z.string().uuid() }))
    .query(async () => {}),
});
