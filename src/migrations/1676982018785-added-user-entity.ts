import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1676982018785 implements MigrationInterface {
    name = 'addedUserEntity1676982018785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "taskColumns" ADD "title" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "taskColumns" DROP COLUMN "title"`);
    }

}
