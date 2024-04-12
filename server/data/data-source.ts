import { Playlist } from "../models/Playlist";
import { User } from "../models/User";
import { Video } from "../models/Video";
import { DataSource } from "typeorm";
import { Seed } from "./seeder";
import { LikeTable } from "../models/LikeTable";
import { FollowerTable } from "../models/FollowerTable";

export const AppDataSource = new DataSource({
    schema: "public",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123456",
  database: "mydb",
  entities: [User, Video, Playlist, LikeTable, FollowerTable],
  migrations: ["server/migrations/**.js"],
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");

    console.log("Seeding ...");
    await Seed(AppDataSource);
    console.log("Seeding Completed");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
