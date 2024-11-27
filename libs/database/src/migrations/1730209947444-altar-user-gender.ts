import { MigrationInterface, QueryRunner } from 'typeorm';

export class AltarUserGender1730209947444 implements MigrationInterface {
	name = 'AltarUserGender1730209947444';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "name" TO "gender"`);
		await queryRunner.query(`ALTER TYPE "public"."users_name_enum" RENAME TO "users_gender_enum"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TYPE "public"."users_gender_enum" RENAME TO "users_name_enum"`);
		await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "gender" TO "name"`);
	}
}
