import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCountryStateCity1730290556538 implements MigrationInterface {
	name = 'CreateTableCountryStateCity1730290556538';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "country" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "country_code" character varying, "iso_code2" character varying, "iso_code3" character varying, "active" boolean DEFAULT true, CONSTRAINT "UQ_2c5aa339240c0c3ae97fcc9dc4c" UNIQUE ("name"), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "state" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "active" boolean DEFAULT true, "country_id" uuid, CONSTRAINT "UQ_b2c4aef5929860729007ac32f6f" UNIQUE ("name"), CONSTRAINT "PK_549ffd046ebab1336c3a8030a12" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "city" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "active" boolean DEFAULT true, "state_id" uuid, CONSTRAINT "UQ_f8c0858628830a35f19efdc0ecf" UNIQUE ("name"), CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "state" ADD CONSTRAINT "FK_dd19065b0813dbffd8170ea6753" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "city" ADD CONSTRAINT "FK_37ecd8addf395545dcb0242a593" FOREIGN KEY ("state_id") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "city" DROP CONSTRAINT "FK_37ecd8addf395545dcb0242a593"`);
		await queryRunner.query(`ALTER TABLE "state" DROP CONSTRAINT "FK_dd19065b0813dbffd8170ea6753"`);
		await queryRunner.query(`DROP TABLE "city"`);
		await queryRunner.query(`DROP TABLE "state"`);
		await queryRunner.query(`DROP TABLE "country"`);
	}
}
