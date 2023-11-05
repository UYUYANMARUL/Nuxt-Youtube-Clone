import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { videoRouter } from "./video";
import { playlistRouter } from "./playlist";
import { commentRouter } from "./comment";
import { videoEngagementRouter } from "./videoEngagement";
import { userRouter } from "./user";

export const appRouter = router({
  user: userRouter,
  video: videoRouter,
  playlist: playlistRouter,
  comment: commentRouter,
  videoEngagement: videoEngagementRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
