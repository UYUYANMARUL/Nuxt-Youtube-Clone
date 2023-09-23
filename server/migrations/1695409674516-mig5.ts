import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig51695409674516 implements MigrationInterface {
    name = 'Mig51695409674516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist" DROP CONSTRAINT "FK_cdaefef58f6dc6ef23081392a7e"`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "videosId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist" ADD "videosId" uuid`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD CONSTRAINT "FK_cdaefef58f6dc6ef23081392a7e" FOREIGN KEY ("videosId") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
