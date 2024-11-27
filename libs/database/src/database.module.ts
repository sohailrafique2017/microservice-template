import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';
import { OtpEntity } from './entities/otp.entity';
import { ConfigModule } from '@nestjs/config';
import { EntityTypeEntity } from './entities/entity.type.entity';
import { PermissionEntity } from './entities/permission.entity';
import { RolePermissionEntity } from './entities/role.permission.entity';
import { CountryEntity } from './entities/country.entity';
import { StateEntity } from './entities/state.entity';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: +process.env.DB_PORT,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			synchronize: false,
			logging: false,
			entities: [UserEntity, RoleEntity, OtpEntity, EntityTypeEntity, PermissionEntity, RolePermissionEntity, CountryEntity, StateEntity],
			// todo - erenkeskin - needed for AWS services like RDS

			ssl: {
				rejectUnauthorized: false,
			},
		}),
	],
	providers: [DatabaseService],
	exports: [DatabaseService],
})
export class DatabaseModule {}
