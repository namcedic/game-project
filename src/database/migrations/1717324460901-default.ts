import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1717324460901 implements MigrationInterface {
    name = 'Default1717324460901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "is_deleted"`);
    }

}
