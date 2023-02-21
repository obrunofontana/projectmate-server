import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1676937528427 implements MigrationInterface {
    name = 'addedUserEntity1676937528427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ADD "alias" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "alias"`);
    }

}
