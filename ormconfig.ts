import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
dotenv.config();

const DBDataSource = new DataSource({
	type: process.env.DB_TYPE as any,
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT, 0),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: ['libs/database/src/entities/**/*.ts'],
	migrations: ['libs/database/src/migrations/**/*.ts'],
});

export default DBDataSource;
