import { MigrationInterface, QueryRunner } from 'typeorm';

export class AltarUser1728907738304 implements MigrationInterface {
	name = 'AltarUser1728907738304';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "gender" TO "name"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
		await queryRunner.query(`CREATE TYPE "public"."users_name_enum" AS ENUM('Male', 'Female', 'Rather_not_say')`);
		await queryRunner.query(`ALTER TABLE "users" ADD "name" "public"."users_name_enum" DEFAULT 'Male'`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
		await queryRunner.query(`DROP TYPE "public"."users_name_enum"`);
		await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying DEFAULT 'Male'`);
		await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "name" TO "gender"`);
	}
}
