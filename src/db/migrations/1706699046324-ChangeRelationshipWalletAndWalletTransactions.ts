import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRelationshipWalletAndWalletTransactions1706699046324 implements MigrationInterface {
    name = 'ChangeRelationshipWalletAndWalletTransactions1706699046324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_3d77ad65f6f1934216eca4d299a"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "transactionsId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" ADD "transactionsId" varchar2(36)`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_3d77ad65f6f1934216eca4d299a" FOREIGN KEY ("transactionsId") REFERENCES "wallet_transaction" ("id")`);
    }

}
