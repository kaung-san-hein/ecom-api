import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhoneAddressOrdersTable1752598428003 implements MigrationInterface {
    name = 'AddPhoneAddressOrdersTable1752598428003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "phone" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "address" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "phone"`);
    }

}
