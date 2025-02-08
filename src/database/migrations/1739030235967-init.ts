import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1739030235967 implements MigrationInterface {
  name = 'Init1739030235967';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" ADD "description" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "description"`);
  }
}
