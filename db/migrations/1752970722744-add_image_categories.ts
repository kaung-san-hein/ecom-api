import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageCategories1752970722744 implements MigrationInterface {
    name = 'AddImageCategories1752970722744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "image"`);
    }

}
