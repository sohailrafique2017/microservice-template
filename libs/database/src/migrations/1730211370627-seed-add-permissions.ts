import { MigrationInterface, QueryRunner } from 'typeorm';
import { PermissionType } from '@app/database/enums/role.enum';

export class SeedAddPermissions1730211370627 implements MigrationInterface {
	name = 'SeedAddPermissions1730211370627';
	public async up(queryRunner: QueryRunner): Promise<void> {
		const query = `INSERT INTO "public"."permission" ( "name", "is_active") VALUES 
        ( '${PermissionType.READ}', 't'),
        ( '${PermissionType.WRITE}', 't');`;
		await queryRunner.query(query);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE FROM "public"."permission" WHERE "name" IN ('${PermissionType.READ}', '${PermissionType.WRITE}')`);
	}
}
