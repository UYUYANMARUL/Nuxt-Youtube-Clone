import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RelationOptions } from "typeorm";
import { Video } from "./Video";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: String;

  @Column("text", { unique: true })
  userName: String;

  @Column("text", { nullable: true })
  name: String;

  @Column("text", { unique: true })
  email: String;

  @Column("date")
  emailVerified: Date;

  @Column("bytea", { nullable: true })
  image: Buffer;

  @Column("bytea", { nullable: true })
  backgroungImage: Buffer;

  @Column("text", { nullable: true })
  description: String;

  @OneToMany(() => Video, (video: Video) => video.user, { cascade: true })
  videos: Video[];

  //  handle                  String?                  @unique
  //  videoEngagements        VideoEngagement[]
  //  playlists               Playlist[]
  //  announcements           Announcement[]
  //  announcementEngagements AnnouncementEngagement[]
  //  followers               FollowEngagement[]       @relation("Followings")
  //  followings              FollowEngagement[]       @relation("Followers")
  //  comments                Comment[]
  //  accounts                Account[]
  //  sessions                Session[]
}
