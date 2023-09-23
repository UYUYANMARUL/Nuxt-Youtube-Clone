import { createTRPCNuxtClient, httpBatchLink } from "trpc-nuxt/client"

import type { AppRouter } from "server/trpc/routers"

export default defineNuxtPlugin(async (nuxtApp) => {
  const client = createTRPCNuxtClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "/api/trpc",
      }),
    ],
  })
  async function test() {
    console.log("he")
    const data = await client.hello.useQuery({ text: "asd" })
    console.log(data)
  }
  return { provide: { client } }
})
