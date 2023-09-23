import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const appointmentsRouter = router({
  addComment: protectedProcedure.input({}).query(async () => {}),
});
