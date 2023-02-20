import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1676934434888 implements MigrationInterface {
    name = 'addedUserEntity1676934434888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "taskColumns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "color" character varying NOT NULL DEFAULT '#FFF', "projectId" uuid, CONSTRAINT "UQ_45a462802763f08f7c53b28a37c" UNIQUE ("title"), CONSTRAINT "PK_efd99bc26df4b305c206113936c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "creatorId" uuid, "taskColumnId" uuid, "projectId" uuid, CONSTRAINT "UQ_067be4bd67747aa64451933929e" UNIQUE ("title"), CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "color" character varying NOT NULL DEFAULT '#FFF', "public" boolean NOT NULL DEFAULT false, "creatorId" uuid, CONSTRAINT "UQ_2117ba29bd245f2b53c42f429c9" UNIQUE ("title"), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "taskColumns" ADD CONSTRAINT "FK_f551466c587a9e4b5b3431fd326" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_90bc62e96b48a437a78593f78f0" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_d62616bb28b8fff5ae0fe33eea2" FOREIGN KEY ("taskColumnId") REFERENCES "taskColumns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_e08fca67ca8966e6b9914bf2956" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_1beb66d6bdd694692f8eb9881b4" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_1beb66d6bdd694692f8eb9881b4"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_e08fca67ca8966e6b9914bf2956"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_d62616bb28b8fff5ae0fe33eea2"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_90bc62e96b48a437a78593f78f0"`);
        await queryRunner.query(`ALTER TABLE "taskColumns" DROP CONSTRAINT "FK_f551466c587a9e4b5b3431fd326"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "taskColumns"`);
    }

}
