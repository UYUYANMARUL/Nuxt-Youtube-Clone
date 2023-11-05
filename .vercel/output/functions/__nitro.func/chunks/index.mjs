import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn, Entity, OneToMany } from 'typeorm';

const t = initTRPC.context().meta().create({
  errorFormatter: ({ error, shape }) => {
    if (error.code === "INTERNAL_SERVER_ERROR" && true) {
      return { ...shape, message: "Internal server error" };
    }
    return shape;
  }
});
const publicProcedure = t.procedure;
const protectedProcedure = t.procedure;
const router = t.router;
t.middleware;

var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$3(target, key, result);
  return result;
};
var __publicField$3 = (obj, key, value) => {
  __defNormalProp$3(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class BaseEntity {
  constructor() {
    __publicField$3(this, "id");
    __publicField$3(this, "createdDate");
    __publicField$3(this, "updatedDate");
  }
}
__decorateClass$3([
  PrimaryGeneratedColumn("uuid")
], BaseEntity.prototype, "id", 2);
__decorateClass$3([
  CreateDateColumn()
], BaseEntity.prototype, "createdDate", 2);
__decorateClass$3([
  UpdateDateColumn()
], BaseEntity.prototype, "updatedDate", 2);

var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$2(target, key, result);
  return result;
};
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
let Playlist = class extends BaseEntity {
  constructor() {
    super(...arguments);
    __publicField$2(this, "titles");
    __publicField$2(this, "description");
    __publicField$2(this, "videos");
    __publicField$2(this, "user");
    __publicField$2(this, "userId");
  }
  // id               String             @id @default(cuid())
  //   userId           String
  //   user             User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  //   comments         Comment[]
  //   playlists        PlaylistHasVideo[]
  //   videoEngagements VideoEngagement[]
  //
  //   @@index([userId])
};
__decorateClass$2([
  Column("text", { nullable: true })
], Playlist.prototype, "titles", 2);
__decorateClass$2([
  Column("text", { nullable: true })
], Playlist.prototype, "description", 2);
__decorateClass$2([
  ManyToMany(() => Video, (video) => video.playlists),
  JoinTable({ name: "playlist-videos" })
], Playlist.prototype, "videos", 2);
__decorateClass$2([
  ManyToOne(() => User, (user) => user.videos),
  JoinColumn()
], Playlist.prototype, "user", 2);
Playlist = __decorateClass$2([
  Entity()
], Playlist);

var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
let Video = class extends BaseEntity {
  constructor() {
    super(...arguments);
    __publicField$1(this, "title");
    __publicField$1(this, "thumbnailUrl");
    __publicField$1(this, "description");
    __publicField$1(this, "videoUrl");
    __publicField$1(this, "published");
    __publicField$1(this, "user");
    __publicField$1(this, "userId");
    __publicField$1(this, "playlists");
  }
  // id               String             @id @default(cuid())
  //   userId           String
  //   user             User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  //   comments         Comment[]
  //   videoEngagements VideoEngagement[]
  //   playlists        PlaylistHasVideo[]
  //
  //   @@index([userId])
};
__decorateClass$1([
  Column("text")
], Video.prototype, "title", 2);
__decorateClass$1([
  Column("text", { nullable: true })
], Video.prototype, "thumbnailUrl", 2);
__decorateClass$1([
  Column("text", { nullable: true })
], Video.prototype, "description", 2);
__decorateClass$1([
  Column("text")
], Video.prototype, "videoUrl", 2);
__decorateClass$1([
  Column("boolean")
], Video.prototype, "published", 2);
__decorateClass$1([
  ManyToOne(() => User, (user) => user.videos),
  JoinColumn()
], Video.prototype, "user", 2);
__decorateClass$1([
  ManyToMany(() => Playlist, (playlist) => playlist.videos),
  JoinTable({ name: "playlist-videos" })
], Video.prototype, "playlists", 2);
Video = __decorateClass$1([
  Entity()
], Video);

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
let User = class extends BaseEntity {
  constructor() {
    super(...arguments);
    __publicField(this, "userName");
    __publicField(this, "thirdname");
    __publicField(this, "name");
    __publicField(this, "email");
    __publicField(this, "emailVerified");
    __publicField(this, "image");
    __publicField(this, "backgroungImage");
    __publicField(this, "description");
    __publicField(this, "videos");
    __publicField(this, "playlists");
  }
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
};
__decorateClass([
  Column("text", { unique: true })
], User.prototype, "userName", 2);
__decorateClass([
  Column("text", { unique: true })
], User.prototype, "thirdname", 2);
__decorateClass([
  Column("text", { nullable: true })
], User.prototype, "name", 2);
__decorateClass([
  Column("text", { unique: true })
], User.prototype, "email", 2);
__decorateClass([
  Column("date", { nullable: true })
], User.prototype, "emailVerified", 2);
__decorateClass([
  Column("bytea", { nullable: true })
], User.prototype, "image", 2);
__decorateClass([
  Column("bytea", { nullable: true })
], User.prototype, "backgroungImage", 2);
__decorateClass([
  Column("text", { nullable: true })
], User.prototype, "description", 2);
__decorateClass([
  OneToMany(() => Video, (video) => video.user, { cascade: true })
], User.prototype, "videos", 2);
__decorateClass([
  OneToMany(() => Playlist, (playlist) => playlist.user, {
    cascade: true
  })
], User.prototype, "playlists", 2);
User = __decorateClass([
  Entity()
], User);

const videoRouter = router({
  getVideoById: publicProcedure.input(
    z.object({
      id: z.string(),
      viewerId: z.string().optional()
    })
  ).meta({
    openapi: {
      method: "GET",
      path: "/videos/getVideoById"
    }
  }).output(z.string()).query(async ({ ctx, input }) => {
    let videos = await ctx.db.getRepository(User).createQueryBuilder("user").getOne();
    console.log(videos);
    console.log("hi");
    return "asd";
  }),
  getVideoBySearch: publicProcedure.input(
    z.object({
      search: z.string(),
      viewerId: z.string().optional()
    })
  ).meta({
    openapi: {
      method: "GET",
      path: "/videos/getVideoBySearch"
    }
  }).output(z.object({})).query(async () => {
  }),
  getRandomVideos: publicProcedure.input(
    z.object({
      viewerId: z.string().optional()
    })
  ).meta({
    openapi: {
      method: "GET",
      path: "/videos/getRandomVideo"
    }
  }).output(z.object({})).query(async () => {
  }),
  getVideoByUserId: publicProcedure.input(
    z.object({
      id: z.string(),
      viewerId: z.string().optional()
    })
  ).meta({
    openapi: {
      method: "GET",
      path: "/videos/getVideoByUserId"
    }
  }).output(z.object({})).query(async () => {
  }),
  publishVideo: protectedProcedure.input(
    z.object({
      id: z.string(),
      viewerId: z.string().optional()
    })
  ).meta({
    openapi: {
      method: "POST",
      path: "/videos/publishVideo"
    }
  }).output(z.object({})).query(async () => {
  }),
  deleteVideo: protectedProcedure.input(
    z.object({
      id: z.string(),
      viewerId: z.string().optional()
    })
  ).meta({
    openapi: {
      method: "DELETE",
      path: "/videos/deleteVideo"
    }
  }).output(z.object({})).query(async () => {
  }),
  updateVideo: protectedProcedure.input(
    z.object({
      id: z.string(),
      viewerId: z.string().optional()
    })
  ).meta({
    openapi: {
      method: "PUT",
      path: "/videos/updateVideo"
    }
  }).output(z.object({})).query(async () => {
  }),
  createVideo: protectedProcedure.input(
    z.object({
      id: z.string(),
      viewerId: z.string().optional()
    })
  ).meta({
    openapi: {
      method: "POST",
      path: "/videos/createVideo"
    }
  }).output(z.object({})).query(async () => {
  })
});

const playlistRouter = router({
  addPlaylist: protectedProcedure.input(z.object({})).query(() => {
  }),
  removePlaylist: protectedProcedure.input(z.object({})).query(() => {
  }),
  getPlaylistById: publicProcedure.input(z.object({})).query(async () => {
  }),
  getPlaylistsByUserId: publicProcedure.input(z.object({})).query(() => {
  })
});

const commentRouter = router({
  addComment: protectedProcedure.input(z.object({})).query(async () => {
  })
});

const videoEngagementRouter = router({
  addViewCount: publicProcedure.input(z.object({})).query(async () => {
  }),
  addLike: protectedProcedure.input(z.object({})).query(async () => {
  }),
  addDislike: protectedProcedure.input(z.object({})).query(async () => {
  }),
  removeLike: protectedProcedure.input(z.object({})).query(async () => {
  })
});

const userRouter = router({
  getUserFollowings: publicProcedure.input(z.object({})).query(async () => {
  }),
  getChannelById: publicProcedure.input(z.object({})).query(async () => {
  }),
  getDashboardData: protectedProcedure.input(z.object({})).query(async () => {
  }),
  addFollow: protectedProcedure.input(z.object({})).query(async () => {
  }),
  updateUser: protectedProcedure.input(z.object({})).query(async () => {
  }),
  login: publicProcedure.input(z.object({})).query(async () => {
  }),
  register: publicProcedure.input(z.object({})).query(async () => {
  })
});

const appRouter = router({
  user: userRouter,
  video: videoRouter,
  playlist: playlistRouter,
  comment: commentRouter,
  videoEngagement: videoEngagementRouter
});

export { Playlist as P, User as U, Video as V, appRouter as a };
//# sourceMappingURL=index.mjs.map
