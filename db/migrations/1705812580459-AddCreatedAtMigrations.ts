import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1705812580459 implements MigrationInterface {
    name = 'Migrations1705812580459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet_transaction" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" DROP COLUMN "createdAt"`);
    }

}
