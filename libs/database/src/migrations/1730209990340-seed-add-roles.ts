import { MigrationInterface, QueryRunner } from 'typeorm';
import { ROLE } from '@app/database/enums';

export class SeedAddRoles1730209990340 implements MigrationInterface {
	name = 'SeedAddRoles1730209990340';
	public async up(queryRunner: QueryRunner): Promise<void> {
		const query = `
            INSERT INTO "public"."role" ("is_active", "is_custom", "name") VALUES
            ('t', 'f', '${ROLE.SUPER_ADMIN}'), 
            ('t', 'f', '${ROLE.MERCHANT}'),
            ('t', 'f', '${ROLE.BUYER}'),
            ('t', 'f', '${ROLE.INFLUENCER}'),
            ('t', 'f', '${ROLE.TRAINER}'),
            ('t', 'f', '${ROLE.GUEST}'),
            ('t', 'f', '${ROLE.SUB_ADMIN}');
        `;
		await queryRunner.query(query);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            DELETE FROM "public"."role" 
            WHERE name IN ('${ROLE.SUPER_ADMIN}', '${ROLE.MERCHANT}', '${ROLE.BUYER}', '${ROLE.INFLUENCER}', '${ROLE.TRAINER}', '${ROLE.GUEST}', '${ROLE.SUB_ADMIN}');
        `);
	}
}
