import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { Video } from "../../models/Video";
import { User } from "../../models/User";
import { TRPCError } from "@trpc/server";

export const videoRouter = router({
  getVideoById: publicProcedure
    .input(
      z.object({
        id: z.string(),
        viewerId: z.string().optional(),
      }),
    )
    .meta({
      openapi: {
        method: "POST",
        path: "/videos/getVideoById",
        tags: ["videos"],
      },
    })
    .output(z.object({ id: z.string(), userId: z.string() }))
    .query(async ({ ctx, input }) => {
      let video = await ctx.db
        .getRepository(Video)
        .createQueryBuilder("video")
        .where("video.id =:id", { id: input.id })
        .getOne();

      if (video == null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Video That match with id could not found",
          // optional: pass the original error to retain stack trace
        });
      }

      return video;
    }),

  getVideosBySearch: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/videos/getVideosBySearch",
        tags: ["videos"],
      },
    })
    .input(
      z.object({
        search: z.string().optional(),
        count: z.number().optional(),
        viewerId: z.string().optional(),
      }),
    )
    .output(z.array(z.object({ id: z.string() })))
    .query(async ({ ctx, input }) => {
      console.log(input.search);
      const videos = await ctx.db
        .getRepository(Video)
        .createQueryBuilder("video")
        .where("video.title like :title", { title: `%${input.search}%` })
        .take(input.count || 5)
        .getMany();

      return videos;
    }),

  getRandomVideos: publicProcedure
    .input(
      z.object({
        viewerId: z.string().optional(),
      }),
    )
    .meta({
      openapi: {
        method: "GET",
        path: "/videos/getRandomVideo",
        tags: ["videos"],
      },
    })
    .output(z.array(z.object({ id: z.string() })))
    .query(async ({ ctx, input }) => {
      const videos = await ctx.db
        .getRepository(Video)
        .createQueryBuilder("video")
        .take(10)
        .getMany();

      return videos;
    }),

  getVideosByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .meta({
      openapi: {
        method: "GET",
        path: "/videos/getVideosByUserId",
        tags: ["videos"],
      },
    })
    .output(z.array(z.object({ id: z.string() })))
    .query(async ({ ctx, input }) => {
      const videos = await ctx.db
        .getRepository(Video)
        .createQueryBuilder("videos")
        .where("videos.userId = :userId", { userId: input.userId })
        .getMany();

      return videos;
    }),

  publishVideo: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .meta({
      openapi: {
        method: "PUT",
        path: "/videos/publishVideo",
        tags: ["videos"],
      },
    })
    .output(z.object({}))
    .mutation(async ({ ctx, input }) => {
      const oldVideo = await ctx.db
        .getRepository(Video)
        .createQueryBuilder("videos")
        .where("videos.id = :videoId", { videoId: input.id })
        .getOne();
      if (!oldVideo) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not found a video that matches with given id",
        });
      }

      if (oldVideo?.userId != ctx.session.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not allowed to publish a video that is not yours",
        });
      }

      if (oldVideo.published == true) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not allowed to publish a video that is not yours",
        });
      }

      oldVideo.published = true;

      const result = await ctx.db.getRepository(Video).save(oldVideo);

      console.log(result);

      return {};
    }),

  deleteVideo: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .meta({
      openapi: {
        method: "DELETE",
        path: "/videos/deleteVideo",
        tags: ["videos"],
      },
    })
    .output(z.object({}))
    .mutation(async ({ ctx, input }) => {
      const video = await ctx.db
        .getRepository(Video)
        .createQueryBuilder("videos")
        .where("videos.id = :id", { id: input.id })
        .getOne();

      if (!video) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not found a video that matches with given id",
        });
      }

      const result = await ctx.db.getRepository(Video).remove(video);

      console.log(result);
      return {};
    }),

  updateVideo: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        title: z.string(),
        thumbnailUrl: z.string().optional(),
        description: z.string().optional(),
        videoUrl: z.string(),
      }),
    )
    .meta({
      openapi: {
        method: "PUT",
        path: "/videos/updateVideo",
        tags: ["videos"],
      },
    })
    .output(z.object({}))
    .mutation(async ({ ctx, input }) => {
      const oldVideo = await ctx.db
        .getRepository(Video)
        .createQueryBuilder("videos")
        .where("videos.id = :videoId", { videoId: input.id })
        .getOne();

      if (oldVideo?.userId != ctx.session.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not allowed to update a video that is not yours",
        });
      }

      const video = {
        id: input.id,
        title: input.title,
        thumbnailUrl: input.thumbnailUrl,
        description: input.description,
        videoUrl: input.videoUrl,
        published: false,
      };

      const result = await ctx.db.getRepository(Video).save(video);

      return { success: true };
    }),

  createVideo: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        thumbnailUrl: z.string().optional(),
        description: z.string().optional(),
        videoUrl: z.string(),
      }),
    )
    .meta({
      openapi: {
        method: "POST",
        path: "/videos/createVideo",
        tags: ["videos"],
      },
    })
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const video = {
        title: input.title,
        thumbnailUrl: input.thumbnailUrl,
        description: input.description,
        videoUrl: input.videoUrl,
        userId: ctx.session.user.id,
        published: false,
      };

      const result = await ctx.db.getRepository(Video).save(video);

      return { success: true };
    }),
});
