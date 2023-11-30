import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RelationOptions } from "typeorm";
import { Video } from "./Video";
import { BaseEntity } from "./base/base-entity";
import { Playlist } from "./Playlist";
import { LikeTable } from "./LikeTable";
import { FollowerTable } from "./FollowerTable";

@Entity()
export class User extends BaseEntity {
  @Column("text", { unique: true })
  public userName: String;

  @Column("text", { nullable: true })
  public name: String;

  @Column("text", { unique: true })
  public email: String;

  @Column("text")
  public password: String;

  @Column("text", { unique: true })
  public passwordrnd: String;

  @Column("date", { nullable: true })
  public emailVerified: Date;

  @Column("bytea", { nullable: true })
  public image: Buffer;

  @Column("bytea", { nullable: true })
  public backgroungImage: Buffer;

  @Column("text", { nullable: true })
  public description: String;

  @OneToMany(() => Video, (video: Video) => video.user, { cascade: true })
  public videos: Video[];

  @OneToMany(() => Playlist, (playlist: Playlist) => playlist.user, {
    cascade: true,
  })
  public playlists: Playlist[];

  @OneToMany(() => LikeTable, (likeTable: LikeTable) => likeTable.user)
  public likeTable: LikeTable[];

  @OneToMany(
    () => FollowerTable,
    (followerTable: FollowerTable) => followerTable.user,
  )
  public following: FollowerTable[];

  @OneToMany(
    () => FollowerTable,
    (followerTable: FollowerTable) => followerTable.following,
  )
  public followers: FollowerTable[];

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
