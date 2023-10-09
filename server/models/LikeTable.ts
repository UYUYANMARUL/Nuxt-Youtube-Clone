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
export class LikeTable {
  @Column("int", { nullable: false })
  public likeCondition: LikeCondition;

  @PrimaryColumn({ name: "userId", type: "uuid" })
  public userId: String;

  @PrimaryColumn({ name: "videoId", type: "uuid" })
  public videoId: String;

  @ManyToOne(() => Video, (video: Video) => video.likeTable)
  public video: Video;

  @ManyToOne(() => User, (user: User) => user.likeTable)
  public user: User;

  // id               String             @id @default(cuid())
  //   userId           String
  //   user             User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  //   comments         Comment[]
  //   playlists        PlaylistHasVideo[]
  //   videoEngagements VideoEngagement[]
  //
  //   @@index([userId])
}
