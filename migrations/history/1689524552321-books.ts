import { MigrationInterface, QueryRunner } from "typeorm";

export class Books1689524552321 implements MigrationInterface {
    name = 'Books1689524552321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Books" ("id" SERIAL NOT NULL, "author" character varying NOT NULL, "ISBN" character varying NOT NULL, "published" date NOT NULL, CONSTRAINT "PK_45fc00b09d337eadf83e9240157" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Books"`);
    }

}
