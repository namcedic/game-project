import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1717314943299 implements MigrationInterface {
    name = 'Default1717314943299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "is_active" TO "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_deleted" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_deleted" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "is_deleted" TO "is_active"`);
    }

}
