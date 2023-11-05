import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig11697482812569 implements MigrationInterface {
    name = 'Mig11697482812569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "like_table" ("likeCondition" integer NOT NULL, "userId" uuid NOT NULL, "videoId" uuid NOT NULL, CONSTRAINT "PK_3d468bf8f42155f42ae8555109d" PRIMARY KEY ("userId", "videoId"))`);
        await queryRunner.query(`CREATE TABLE "video" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "title" text NOT NULL, "thumbnailUrl" text, "description" text, "videoUrl" text NOT NULL, "published" boolean NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "UQ_99e2178fda31ff2d65764473685" UNIQUE ("title"), CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "userName" text NOT NULL, "name" text, "email" text NOT NULL, "password" text NOT NULL, "passwordrnd" text NOT NULL, "emailVerified" date, "image" bytea, "backgroungImage" bytea, "description" text, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_c53ceb3a4062d3e7ad85e0ff006" UNIQUE ("passwordrnd"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "titles" text, "description" text, "userId" uuid NOT NULL, CONSTRAINT "PK_538c2893e2024fabc7ae65ad142" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlist-videos" ("videoId" uuid NOT NULL, "playlistId" uuid NOT NULL, CONSTRAINT "PK_ff2a7b54e597e4aa9e2dec0cd14" PRIMARY KEY ("videoId", "playlistId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_30e37a29c85d94b9c37b52b997" ON "playlist-videos" ("videoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b64398a43ef06e6f64c711e28c" ON "playlist-videos" ("playlistId") `);
        await queryRunner.query(`ALTER TABLE "like_table" ADD CONSTRAINT "FK_991a92ce9dd3400cb6d0f210350" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like_table" ADD CONSTRAINT "FK_4d3008fcaa4983605ae0f4f6333" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "video" ADD CONSTRAINT "FK_74e27b13f8ac66f999400df12f6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist-videos" ADD CONSTRAINT "FK_30e37a29c85d94b9c37b52b9971" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "playlist-videos" ADD CONSTRAINT "FK_b64398a43ef06e6f64c711e28cd" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist-videos" DROP CONSTRAINT "FK_b64398a43ef06e6f64c711e28cd"`);
        await queryRunner.query(`ALTER TABLE "playlist-videos" DROP CONSTRAINT "FK_30e37a29c85d94b9c37b52b9971"`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b"`);
        await queryRunner.query(`ALTER TABLE "video" DROP CONSTRAINT "FK_74e27b13f8ac66f999400df12f6"`);
        await queryRunner.query(`ALTER TABLE "like_table" DROP CONSTRAINT "FK_4d3008fcaa4983605ae0f4f6333"`);
        await queryRunner.query(`ALTER TABLE "like_table" DROP CONSTRAINT "FK_991a92ce9dd3400cb6d0f210350"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b64398a43ef06e6f64c711e28c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_30e37a29c85d94b9c37b52b997"`);
        await queryRunner.query(`DROP TABLE "playlist-videos"`);
        await queryRunner.query(`DROP TABLE "playlist"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "video"`);
        await queryRunner.query(`DROP TABLE "like_table"`);
    }

}
