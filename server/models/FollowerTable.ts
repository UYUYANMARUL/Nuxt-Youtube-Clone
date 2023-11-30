import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Video } from "./Video";
import { BaseEntity } from "./base/base-entity";

export enum LikeCondition {
  None = 0,
  DisLiked = 1,
  Liked = 2,
}

@Entity()
export class FollowerTable {
  @PrimaryColumn({ name: "userId", type: "uuid" })
  public userId: String;

  @PrimaryColumn({ name: "followingId", type: "uuid" })
  public followingId: String;

  @ManyToOne(() => User, (user: User) => user.following)
  public user: User;

  @ManyToOne(() => User, (user: User) => user.followers)
  public following: User;

  // id               String             @id @default(cuid())
  //   userId           String
  //   user             User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  //   comments         Comment[]
  //   playlists        PlaylistHasVideo[]
  //   videoEngagements VideoEngagement[]
  //
  //   @@index([userId])
}
