import { Playlist } from "../models/Playlist";
import { User } from "../models/User";
import { Video } from "../models/Video";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  schema: "public",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123456",
  database: "mydb",
  entities: [User, Video, Playlist],
  migrations: ["server/migrations/**/*.{ts,js}"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
