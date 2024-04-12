import { User } from "../models/User";
import { DataSource } from "typeorm";

export async function Seed(db: DataSource) {
  try {
    // let data = await AppDataSource.createQueryBuilder()
    //   .insert()
    //   .into(User)
    //   .values(user)
    //   .execute();
    //
    // await AppDataSource.createQueryBuilder()
    //   .update(User)
    //   .set({
    //     thirdname: "asaadd",
    //     email: "tesaaat",
    //   })
    //   .where("userName = :userName", { userName: "test" })
    //   .execute();
    // console.log(data);
  } catch (err) {
    const array = [1, 2, 3];
    console.log(`Something Went Wrong Err : ${err}`);
  }
}
