import { MigrationInterface, QueryRunner } from 'typeorm';

export class AltarRolePermission1730118198902 implements MigrationInterface {
	name = 'AltarRolePermission1730118198902';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "name"`);
		await queryRunner.query(`DROP TYPE "public"."role_name_enum"`);
		await queryRunner.query(`ALTER TABLE "role" ADD "name" character varying NOT NULL DEFAULT 'Buyer'`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "name"`);
		await queryRunner.query(`CREATE TYPE "public"."role_name_enum" AS ENUM('Merchant', 'Buyer', 'Super', 'Sub', 'Trainer', 'Influencer', 'Guest')`);
		await queryRunner.query(`ALTER TABLE "role" ADD "name" "public"."role_name_enum" NOT NULL DEFAULT 'Buyer'`);
	}
}
