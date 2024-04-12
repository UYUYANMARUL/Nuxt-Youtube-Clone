import { createTRPCNuxtClient, httpBatchLink } from "trpc-nuxt/client";

import type { AppRouter } from "server/trpc/routers";

export default defineNuxtPlugin(async (nuxtApp) => {
  const client = createTRPCNuxtClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "/api/trpc",
      }),
    ],
  });
  async function test(value) {
    const data = await client.video.getVideosBySearch.useQuery({
      search: value,
    });
  }
  return { provide: { client, test } };
});
