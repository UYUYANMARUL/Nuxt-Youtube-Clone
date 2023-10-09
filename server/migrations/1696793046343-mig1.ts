import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig11696793046343 implements MigrationInterface {
    name = 'Mig11696793046343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist-videos" DROP CONSTRAINT "FK_30e37a29c85d94b9c37b52b9971"`);
        await queryRunner.query(`ALTER TABLE "playlist-videos" DROP CONSTRAINT "FK_b64398a43ef06e6f64c711e28cd"`);
        await queryRunner.query(`ALTER TABLE "like_table" DROP CONSTRAINT "PK_d2771fec01ba7b0337219d7e737"`);
        await queryRunner.query(`ALTER TABLE "like_table" ADD CONSTRAINT "PK_1ea9e96bab3104b9f9e15384440" PRIMARY KEY ("video_id")`);
        await queryRunner.query(`ALTER TABLE "like_table" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "like_table" DROP CONSTRAINT "PK_1ea9e96bab3104b9f9e15384440"`);
        await queryRunner.query(`ALTER TABLE "like_table" DROP COLUMN "video_id"`);
        await queryRunner.query(`ALTER TABLE "like_table" ADD CONSTRAINT "PK_3d468bf8f42155f42ae8555109d" PRIMARY KEY ("userId", "videoId")`);
        await queryRunner.query(`ALTER TABLE "like_table" DROP CONSTRAINT "FK_4d3008fcaa4983605ae0f4f6333"`);
        await queryRunner.query(`ALTER TABLE "like_table" DROP CONSTRAINT "FK_991a92ce9dd3400cb6d0f210350"`);
        await queryRunner.query(`ALTER TABLE "like_table" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "like_table" ALTER COLUMN "videoId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "like_table" ADD CONSTRAINT "FK_991a92ce9dd3400cb6d0f210350" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like_table" ADD CONSTRAINT "FK_4d3008fcaa4983605ae0f4f6333" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist-videos" ADD CONSTRAINT "FK_30e37a29c85d94b9c37b52b9971" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "playlist-videos" ADD CONSTRAINT "FK_b64398a43ef06e6f64c711e28cd" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist-videos" DROP CONSTRAINT "FK_b64398a43ef06e6f64c711e28cd"`);
        await queryRunner.query(`ALTER TABLE "playlist-videos" DROP CONSTRAINT "FK_30e37a29c85d94b9c37b52b9971"`);
        await queryRunner.query(`ALTER TABLE "like_table" DROP CONSTRAINT "FK_4d3008fcaa4983605ae0f4f6333"`);
        await queryRunner.query(`ALTER TABLE "like_table" DROP CONSTRAINT "FK_991a92ce9dd3400cb6d0f210350"`);
        await queryRunner.query(`ALTER TABLE "like_table" ALTER COLUMN "videoId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "like_table" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "like_table" ADD CONSTRAINT "FK_991a92ce9dd3400cb6d0f210350" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like_table" ADD CONSTRAINT "FK_4d3008fcaa4983605ae0f4f6333" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like_table" DROP CONSTRAINT "PK_3d468bf8f42155f42ae8555109d"`);
        await queryRunner.query(`ALTER TABLE "like_table" ADD "video_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "like_table" ADD CONSTRAINT "PK_1ea9e96bab3104b9f9e15384440" PRIMARY KEY ("video_id")`);
        await queryRunner.query(`ALTER TABLE "like_table" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "like_table" DROP CONSTRAINT "PK_1ea9e96bab3104b9f9e15384440"`);
        await queryRunner.query(`ALTER TABLE "like_table" ADD CONSTRAINT "PK_d2771fec01ba7b0337219d7e737" PRIMARY KEY ("user_id", "video_id")`);
        await queryRunner.query(`ALTER TABLE "playlist-videos" ADD CONSTRAINT "FK_b64398a43ef06e6f64c711e28cd" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist-videos" ADD CONSTRAINT "FK_30e37a29c85d94b9c37b52b9971" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
