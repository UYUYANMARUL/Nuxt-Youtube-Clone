import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Video } from "./Video";
import { BaseEntity } from "./base/base-entity";

@Entity()
export class Playlist extends BaseEntity {
  @Column("text", { nullable: true })
  titles: String;

  @Column("text", { nullable: true })
  description: String;

  @ManyToMany(() => Video, (video: Video) => video.playlists)
  @JoinTable({ name: "playlist-videos" })
  videos: Video[];

  @ManyToOne(() => User, (user: User) => user.videos)
  @JoinColumn()
  user: User;

  userId: String;

  // id               String             @id @default(cuid())
  //   userId           String
  //   user             User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  //   comments         Comment[]
  //   playlists        PlaylistHasVideo[]
  //   videoEngagements VideoEngagement[]
  //
  //   @@index([userId])
}
