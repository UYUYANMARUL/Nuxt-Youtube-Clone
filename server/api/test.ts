import { AppDataSource } from "../data/data-source";

export default defineEventHandler(async (event) => {
  return {
    hello: `world`,
  };
});
