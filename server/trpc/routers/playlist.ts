import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { Playlist } from "../../models/Playlist";
import { TRPCError } from "@trpc/server";
import { User } from "../../models/User";
import { Video } from "../..//models/Video";

export const playlistRouter = router({
  createPlaylist: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    )
    .meta({
      openapi: {
        method: "POST",
        path: "/playlist/createPlaylist",
        tags: ["playlist"],
      },
    })
    .output(z.object({}))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db
        .getRepository(User)
        .createQueryBuilder("users")
        .where("users.id = :id", { id: ctx.session.user.id })
        .getOne();

      const playlist: Partial<Playlist> = {
        titles: input.title,
        description: input.description,
        videos: [],
        user: user!,
        userId: ctx.session.user.id,
      };

      await ctx.db.getRepository(Playlist).save(playlist);
      return {};
    }),

  deletePlaylist: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .meta({
      openapi: {
        method: "DELETE",
        path: "/playlist/deletePlaylist",
        tags: ["playlist"],
      },
    })
    .output(z.object({}))
    .mutation(async ({ ctx, input }) => {
      const playlist = await ctx.db
        .getRepository(Playlist)
        .createQueryBuilder("playlists")
        .where("playlists.id = :playlistId", { playlistId: input.id })
        .getOne();

      if (!playlist) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not found a playlist that matches with given id",
        });
      }

      if (playlist.userId != ctx.session?.user?.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not allowed to update a video that is not yours",
        });
      }

      await ctx.db.getRepository(Playlist).delete(playlist.id.toString());

      return {};
    }),

  addVideoToPlaylist: protectedProcedure
    .input(
      z.object({
        videoId: z.string().uuid(),
        playlistId: z.string().uuid(),
      }),
    )
    .meta({
      openapi: {
        method: "PUT",
        path: "/playlist/addVideoToPlaylist",
        tags: ["playlist"],
      },
    })
    .output(z.object({}))
    .mutation(async ({ ctx, input }) => {
      const playlist = await ctx.db
        .getRepository(Playlist)
        .createQueryBuilder("playlists")
        .where("playlists.id = :id", { id: input.playlistId })
        .getOne();

      if (!playlist) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not found a playlist that matches with given id",
        });
      }

      if (playlist.userId != ctx.session?.user?.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not allowed to update a video that is not yours",
        });
      }

      const video = await ctx.db
        .getRepository(Video)
        .createQueryBuilder("videos")
        .where("videos.id = :id", { id: input.videoId })
        .getOne();

      if (!video) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not found a video that matches with given id",
        });
      }

      playlist?.videos.push(video);

      await ctx.db.getRepository(Playlist).save(playlist);

      return {};
    }),

  removeVideoFromPlaylist: protectedProcedure
    .input(z.object({}))
    .meta({
      openapi: {
        method: "DELETE",
        path: "/playlist/removeVideoFromPlaylist",
        tags: ["playlist"],
      },
    })
    .output(z.object({}))
    .mutation(async ({ ctx, input }) => {}),

  getPlaylistById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .meta({
      openapi: {
        method: "GET",
        path: "/playlist/getPlaylistById",
        tags: ["playlist"],
      },
    })
    .output(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const playlist = await ctx.db
        .getRepository(Playlist)
        .createQueryBuilder("playlists")
        .where("playlists.id = :id", { id: input.id })
        .getOne();

      return playlist;
    }),

  getPlaylistsByUserId: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .meta({
      openapi: {
        method: "GET",
        path: "/playlist/getPlaylistByUserId",
        tags: ["playlist"],
      },
    })
    .output(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const playlists = await ctx.db
        .getRepository(Playlist)
        .createQueryBuilder("playlists")
        .getOne();

      console.log(playlists);

      return playlists;
    }),
});
