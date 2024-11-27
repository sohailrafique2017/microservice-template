import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRole1728470142444 implements MigrationInterface {
	name = 'CreateUserRole1728470142444';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TYPE "public"."role_name_enum" AS ENUM('USER', 'INFLUENCER')`);
		await queryRunner.query(
			`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" "public"."role_name_enum" NOT NULL DEFAULT 'USER', "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "first_name" character varying, "last_name" character varying, "is_2fa" boolean NOT NULL DEFAULT true, "email_verified" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "contact_number" character varying, "address" character varying, "is_blocked" boolean NOT NULL DEFAULT false, "role" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "FK_ace513fa30d485cfd25c11a9e4a" FOREIGN KEY ("role") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_ace513fa30d485cfd25c11a9e4a"`);
		await queryRunner.query(`DROP TABLE "users"`);
		await queryRunner.query(`DROP TABLE "role"`);
		await queryRunner.query(`DROP TYPE "public"."role_name_enum"`);
	}
}
