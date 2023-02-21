import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1676981887895 implements MigrationInterface {
    name = 'addedUserEntity1676981887895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "taskColumns" DROP CONSTRAINT "UQ_45a462802763f08f7c53b28a37c"`);
        await queryRunner.query(`ALTER TABLE "taskColumns" DROP COLUMN "title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "taskColumns" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "taskColumns" ADD CONSTRAINT "UQ_45a462802763f08f7c53b28a37c" UNIQUE ("title")`);
    }

}
