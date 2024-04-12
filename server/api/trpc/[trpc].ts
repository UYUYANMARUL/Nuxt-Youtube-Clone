import { createNuxtApiHandler } from "trpc-nuxt";
import { appRouter } from "../../trpc/routers";
import { createContext } from "../../trpc/context";

const data = [1, 2, 3, 4];
// export API handler
export default createNuxtApiHandler({
  router: appRouter,
  createContext,
});
