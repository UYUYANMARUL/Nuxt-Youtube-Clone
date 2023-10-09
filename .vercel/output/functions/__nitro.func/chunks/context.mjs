import { U as User, V as Video, P as Playlist } from './index.mjs';
import { DataSource } from 'typeorm';

async function Seed(db) {
  try {
    const user = db.manager.create(User, {
      userName: "asdaaaaad",
      thirdname: "asaaaaadd",
      email: "tesaaaat",
      videos: [{ title: "asdasdasd", published: false, playlists: [] }]
    });
  } catch (err) {
    console.log(`Something Went Wrong Err : ${err}`);
  }
}

const AppDataSource = new DataSource({
  schema: "public",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123456",
  database: "mydb",
  entities: [User, Video, Playlist],
  migrations: ["server/migrations/**.ts"]
});
AppDataSource.initialize().then(async () => {
  console.log("Data Source has been initialized!");
  console.log("Seeding ...");
  await Seed(AppDataSource);
  console.log("Seeding Completed");
}).catch((err) => {
  console.error("Error during Data Source initialization", err);
});

const createContext = () => ({ db: AppDataSource });

export { createContext as c };
//# sourceMappingURL=context.mjs.map
