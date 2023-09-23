import {
  Column,
  Entity,
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
  title: String;

  @Column("text", { nullable: true })
  description: String;

  @ManyToMany(() => Video, (video: Video) => video.playlists)
  videos: Video[];

  // id               String             @id @default(cuid())
  //   userId           String
  //   user             User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  //   comments         Comment[]
  //   playlists        PlaylistHasVideo[]
  //   videoEngagements VideoEngagement[]
  //
  //   @@index([userId])
}
