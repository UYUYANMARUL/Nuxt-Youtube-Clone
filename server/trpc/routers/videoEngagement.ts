import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { Video } from "../../models/Video";
import { LikeCondition, LikeTable } from "../../models/LikeTable";

export const videoEngagementRouter = router({
  addViewCount: publicProcedure
    .input(z.object({}))
    .meta({
      openapi: {
        method: "PUT",
        path: "/videosEngagement/addViewCount",
        tags: ["videosEngagement"],
      },
    })
    .output(z.object({}))
    .mutation(async ({ ctx, input }) => {}),

  getLikeStatus: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .meta({
      openapi: {
        method: "PUT",
        path: "/videosEngagement/getLikeStatus",
        tags: ["videosEngagement"],
      },
    })
    .output(z.object({}))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .getRepository(LikeTable)
        .createQueryBuilder("likeTable")
        .where("likeTable.userId := userId AND likeTable.videoId := videoId", {
          userId: ctx.session.user.id,
          videoId: input.id,
        })
        .select(["LikeCondition"])
        .getOne();
    }),

  addLike: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .meta({
      openapi: {
        method: "PUT",
        path: "/videosEngagement/addLike",
        tags: ["videosEngagement"],
      },
    })
    .output(z.object({}))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.getRepository(LikeTable).save({
        user: { id: ctx.session.user.id },
        video: { id: input.id },
        likeCondition: LikeCondition.Liked,
      });
      console.log(result);
      return {};
    }),

  addDislike: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .meta({
      openapi: {
        method: "PUT",
        path: "/videosEngagement/addDislike",
        tags: ["videosEngagement"],
      },
    })

    .output(z.object({}))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.getRepository(LikeTable).save({
        user: { id: ctx.session.user.id },
        video: { id: input.id },
        likeCondition: LikeCondition.DisLiked,
      });

      console.log(result);
      return {};
    }),

  removeLike: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .meta({
      openapi: {
        method: "PUT",
        path: "/videosEngagement/removeLike",
        tags: ["videosEngagement"],
      },
    })
    .output(z.object({}))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.getRepository(LikeTable).save({
        user: { id: ctx.session.user.id },
        video: { id: input.id },
        likeCondition: LikeCondition.None,
      });

      console.log(result);
      return {};
    }),
});
