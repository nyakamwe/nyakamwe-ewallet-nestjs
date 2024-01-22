import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1705852224122 implements MigrationInterface {
    name = 'FirstMigration1705852224122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wallet_transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "type" character varying NOT NULL, "amount" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "customerId" uuid, "walletId" uuid, CONSTRAINT "PK_62a01b9c3a734b96a08c621b371" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "balance" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "customerId" uuid, "transactionsId" uuid, CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" ADD CONSTRAINT "FK_358f2884bab4f69bdc53296487a" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" ADD CONSTRAINT "FK_07de5136ba8e92bb97d45b9a7af" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_fe7ef5ca5ba7189b3258b813d52" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_3d77ad65f6f1934216eca4d299a" FOREIGN KEY ("transactionsId") REFERENCES "wallet_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_3d77ad65f6f1934216eca4d299a"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_fe7ef5ca5ba7189b3258b813d52"`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" DROP CONSTRAINT "FK_07de5136ba8e92bb97d45b9a7af"`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" DROP CONSTRAINT "FK_358f2884bab4f69bdc53296487a"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "wallet_transaction"`);
    }

}
