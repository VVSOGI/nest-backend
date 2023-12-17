import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1702707050713 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "user" (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(40) UNIQUE NOT NULL,
        password VARCHAR NOT NULL
        );
  `);

    await queryRunner.query(`
        CREATE TABLE "board" (
            id VARCHAR(255) PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR NOT NULL,
            priority VARCHAR NOT NULL DEFAULT 'LOW',
            email VARCHAR(255) NOT NULL,
            "userId" VARCHAR(255),
            CONSTRAINT fk_user
            FOREIGN KEY ("userId") REFERENCES "user"(id)
            ON DELETE CASCADE
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Board 테이블 삭제
    await queryRunner.query(`DROP TABLE "board";`);

    // User 테이블 삭제
    await queryRunner.query(`DROP TABLE "user";`);
  }
}
