import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Playlist } from "./Playlist";

@Entity()
export class Video {
  @PrimaryGeneratedColumn("uuid")
  id: String;

  @Column("text", { nullable: true })
  title: String;

  @Column("text", { nullable: true })
  thumbnailUrl: String;

  @Column("text", { nullable: true })
  description: String;

  @Column("text", { nullable: true })
  videoUrl: String;

  @Column("boolean")
  published: boolean;

  @ManyToOne(() => User, (user: User) => user.videos)
  user: User;

  @ManyToMany(() => Playlist, (playlist) => playlist.videos)
  playlists: Playlist[];

  // id               String             @id @default(cuid())
  //   userId           String
  //   user             User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  //   comments         Comment[]
  //   videoEngagements VideoEngagement[]
  //   playlists        PlaylistHasVideo[]
  //
  //   @@index([userId])
}
