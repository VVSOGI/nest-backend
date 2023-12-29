import { MigrationInterface, QueryRunner } from "typeorm";

export class NestBackend1703836699634 implements MigrationInterface {
    name = 'NestBackend1703836699634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "fk_user"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "permission" character varying NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "priority"`);
        await queryRunner.query(`ALTER TABLE "board" ADD "priority" "public"."board_priority_enum" NOT NULL DEFAULT 'low'`);
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_c9951f13af7909d37c0e2aec484" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_c9951f13af7909d37c0e2aec484"`);
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "priority"`);
        await queryRunner.query(`ALTER TABLE "board" ADD "priority" character varying NOT NULL DEFAULT 'LOW'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "permission"`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "fk_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
