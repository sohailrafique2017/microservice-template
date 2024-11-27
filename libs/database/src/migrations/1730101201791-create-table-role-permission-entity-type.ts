import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableRolePermissionEntityType1730101201791 implements MigrationInterface {
	name = 'CreateTableRolePermissionEntityType1730101201791';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TYPE "public"."permission_name_enum" AS ENUM('Read', 'Write', 'Delete')`);
		await queryRunner.query(
			`CREATE TABLE "permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" "public"."permission_name_enum" NOT NULL DEFAULT 'Read', "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "entity_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_a673aa035fbda0a8f4b1bf81286" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "role_permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "roleId" uuid, "permissionId" uuid, "entityTypeId" uuid, CONSTRAINT "PK_96c8f1fd25538d3692024115b47" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(`ALTER TABLE "role" ADD "is_custom" boolean NOT NULL DEFAULT false`);
		await queryRunner.query(
			`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3130a39c1e4a740d044e685730" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_72e80be86cab0e93e67ed1a7a9a" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_4ce6d1cbfce80827214200525a4" FOREIGN KEY ("entityTypeId") REFERENCES "entity_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_4ce6d1cbfce80827214200525a4"`);
		await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_72e80be86cab0e93e67ed1a7a9a"`);
		await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3130a39c1e4a740d044e685730"`);
		await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "is_custom"`);
		await queryRunner.query(`DROP TABLE "role_permission"`);
		await queryRunner.query(`DROP TABLE "entity_type"`);
		await queryRunner.query(`DROP TABLE "permission"`);
		await queryRunner.query(`DROP TYPE "public"."permission_name_enum"`);
	}
}
