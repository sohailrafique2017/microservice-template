import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOtpTable1728898528727 implements MigrationInterface {
	name = 'CreateOtpTable1728898528727';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "otp" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "otp" integer, "otp_expires_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_2fa"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "contact_number"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address"`);
		await queryRunner.query(`ALTER TABLE "users" ADD "user_name" character varying NOT NULL`);
		await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_074a1f262efaca6aba16f7ed920" UNIQUE ("user_name")`);
		await queryRunner.query(`ALTER TABLE "users" ADD "mobile_number" character varying`);
		await queryRunner.query(`ALTER TABLE "users" ADD "gender" character varying DEFAULT 'Male'`);
		await queryRunner.query(`ALTER TABLE "users" ADD "dob" TIMESTAMP DEFAULT now()`);
		await queryRunner.query(`ALTER TABLE "users" ADD "mobile_verified" boolean DEFAULT false`);
		await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_ace513fa30d485cfd25c11a9e4a"`);
		await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2"`);
		await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "id"`);
		await queryRunner.query(`ALTER TABLE "role" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
		await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")`);
		await queryRunner.query(`ALTER TYPE "public"."role_name_enum" RENAME TO "role_name_enum_old"`);
		await queryRunner.query(`CREATE TYPE "public"."role_name_enum" AS ENUM('Merchant', 'Buyer', 'Super', 'Sub', 'Trainer', 'Influencer', 'Guest')`);
		await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "name" DROP DEFAULT`);
		await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "name" TYPE "public"."role_name_enum" USING "name"::"text"::"public"."role_name_enum"`);
		await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "name" SET DEFAULT 'Buyer'`);
		await queryRunner.query(`DROP TYPE "public"."role_name_enum_old"`);
		await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
		await queryRunner.query(`ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
		await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
		await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "is_blocked" DROP NOT NULL`);
		await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email_verified" DROP NOT NULL`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
		await queryRunner.query(`ALTER TABLE "users" ADD "role" uuid`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "FK_ace513fa30d485cfd25c11a9e4a" FOREIGN KEY ("role") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "otp" ADD CONSTRAINT "FK_258d028d322ea3b856bf9f12f25" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "otp" DROP CONSTRAINT "FK_258d028d322ea3b856bf9f12f25"`);
		await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_ace513fa30d485cfd25c11a9e4a"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
		await queryRunner.query(`ALTER TABLE "users" ADD "role" integer`);
		await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email_verified" SET NOT NULL`);
		await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "is_blocked" SET NOT NULL`);
		await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
		await queryRunner.query(`ALTER TABLE "users" ADD "id" SERIAL NOT NULL`);
		await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
		await queryRunner.query(`CREATE TYPE "public"."role_name_enum_old" AS ENUM('USER', 'INFLUENCER')`);
		await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "name" DROP DEFAULT`);
		await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "name" TYPE "public"."role_name_enum_old" USING "name"::"text"::"public"."role_name_enum_old"`);
		await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "name" SET DEFAULT 'USER'`);
		await queryRunner.query(`DROP TYPE "public"."role_name_enum"`);
		await queryRunner.query(`ALTER TYPE "public"."role_name_enum_old" RENAME TO "role_name_enum"`);
		await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2"`);
		await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "id"`);
		await queryRunner.query(`ALTER TABLE "role" ADD "id" SERIAL NOT NULL`);
		await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "FK_ace513fa30d485cfd25c11a9e4a" FOREIGN KEY ("role") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "mobile_verified"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "dob"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "mobile_number"`);
		await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_074a1f262efaca6aba16f7ed920"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_name"`);
		await queryRunner.query(`ALTER TABLE "users" ADD "address" character varying`);
		await queryRunner.query(`ALTER TABLE "users" ADD "contact_number" character varying`);
		await queryRunner.query(`ALTER TABLE "users" ADD "is_2fa" boolean NOT NULL DEFAULT true`);
		await queryRunner.query(`DROP TABLE "otp"`);
	}
}
