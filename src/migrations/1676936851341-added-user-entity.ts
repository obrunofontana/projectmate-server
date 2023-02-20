import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1676936851341 implements MigrationInterface {
    name = 'addedUserEntity1676936851341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ADD "description" character varying NOT NULL`);
    }

}
