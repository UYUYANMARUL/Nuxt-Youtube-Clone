import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const appointmentsRouter = router({
  addPlaylist: protectedProcedure.input({}).query(() => {}),
  removePlaylist: protectedProcedure.input({}).query(() => {}),
  getPlaylistById: publicProcedure.input({}).query(async () => {}),
  getPlaylistsByUserId: publicProcedure.input({}).query(() => {}),
});
