import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1706538165645 implements MigrationInterface {
    name = 'Migrations1706538165645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wallet_transaction" ("id" varchar2(36), "status" varchar2(255) NOT NULL, "type" varchar2(255) NOT NULL, "amount" float NOT NULL, "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "customerId" varchar2(36), "walletId" varchar2(36), CONSTRAINT "PK_62a01b9c3a734b96a08c621b371" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallet" ("id" varchar2(36), "name" varchar2(255) NOT NULL, "balance" float NOT NULL, "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "customerId" varchar2(36), "transactionsId" varchar2(36), CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" varchar2(36), "firstName" varchar2(255) NOT NULL, "lastName" varchar2(255) NOT NULL, "email" varchar2(255) NOT NULL, "password" varchar2(255) NOT NULL, "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" ADD CONSTRAINT "FK_358f2884bab4f69bdc53296487a" FOREIGN KEY ("customerId") REFERENCES "customers" ("id")`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" ADD CONSTRAINT "FK_07de5136ba8e92bb97d45b9a7af" FOREIGN KEY ("walletId") REFERENCES "wallet" ("id")`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_fe7ef5ca5ba7189b3258b813d52" FOREIGN KEY ("customerId") REFERENCES "customers" ("id")`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_3d77ad65f6f1934216eca4d299a" FOREIGN KEY ("transactionsId") REFERENCES "wallet_transaction" ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_3d77ad65f6f1934216eca4d299a"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_fe7ef5ca5ba7189b3258b813d52"`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" DROP CONSTRAINT "FK_07de5136ba8e92bb97d45b9a7af"`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" DROP CONSTRAINT "FK_358f2884bab4f69bdc53296487a"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
        await queryRunner.query(`DROP TABLE "wallet_transaction"`);
    }

}
