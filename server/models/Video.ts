import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationCount,
} from "typeorm";
import { User } from "./User";
import { Playlist } from "./Playlist";
import { BaseEntity } from "./base/base-entity";
import { LikeTable } from "./LikeTable";

@Entity()
export class Video extends BaseEntity {
  @Column("text", { unique: true })
  public title: String;

  @Column("text", { nullable: true })
  public thumbnailUrl: String;

  @Column("text", { nullable: true })
  public description: String;

  @Column("text")
  public videoUrl: String;

  @Column("boolean")
  public published: boolean;

  @ManyToOne(() => User, (user: User) => user.videos)
  @JoinColumn({ name: "userId" })
  public user: User;

  @Column("uuid")
  public userId: String;

  @OneToMany(() => LikeTable, (likeTable: LikeTable) => likeTable.user)
  public likeTable: LikeTable[];

  @ManyToMany(() => Playlist, (playlist) => playlist.videos)
  @JoinTable({ name: "playlist-videos" })
  public playlists: Playlist[];

  // id               String             @id @default(cuid())
  //   userId           String
  //   user             User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  //   comments         Comment[]
  //   videoEngagements VideoEngagement[]
  //   playlists        PlaylistHasVideo[]
  //
  //   @@index([userId])
}
