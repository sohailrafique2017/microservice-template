import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ROLE } from '@app/database/enums';

export class SeedAddAdminUser1730210008176 implements MigrationInterface {
	name = 'SeedAddAdminUser1730210008176';
	public async up(queryRunner: QueryRunner): Promise<void> {
		const hashPassword = bcrypt.hashSync('Abc1234#', 10);
		const role = await queryRunner.query(`SELECT id FROM "public"."role" WHERE name ='${ROLE.SUPER_ADMIN}';`);
		// Check if role exists
		if (!role[0]?.id) {
			throw new Error('SUPER_ADMIN role not found in the role table.');
		}
		const roleId = role[0].id;

		await queryRunner.query(
			`INSERT INTO "public"."users" 
            ("email", "password", "first_name", "last_name", "email_verified", "is_blocked", "user_name", "mobile_number", "mobile_verified", "role", "gender") 
            VALUES
            (
                'admin@admin.com', 
                '${hashPassword}', 
                'admin', 
                'sporday', 
                't', 
                'f', 
                'admin', 
                NULL,  
                'f', 
                '${roleId}', 
                'Male'
            );`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE FROM user WHERE email = 'admin@admin.com';`);
	}
}
