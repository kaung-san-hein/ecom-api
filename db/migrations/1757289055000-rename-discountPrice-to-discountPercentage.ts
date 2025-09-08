import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameDiscountPriceToDiscountPercentage1757289055000 implements MigrationInterface {
    name = 'RenameDiscountPriceToDiscountPercentage1757289055000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "discountPrice" TO "discountPercentage"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "discountPercentage" TO "discountPrice"`);
    }
}
