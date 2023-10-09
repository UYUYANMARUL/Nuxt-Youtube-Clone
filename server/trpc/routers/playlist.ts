import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const playlistRouter = router({
  addPlaylist: protectedProcedure.input(z.object({})).query(() => {}),
  removePlaylist: protectedProcedure.input(z.object({})).query(() => {}),
  getPlaylistById: publicProcedure.input(z.object({})).query(async () => {}),
  getPlaylistsByUserId: publicProcedure.input(z.object({})).query(() => {}),
});
