import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule } from '@nestjs/microservices';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppLogger } from '@app/common/logger/logger.service';
import { USERS_CLIENT_CONFIG } from '@app/contract/config/config.microservice';

@Module({
	imports: [
		/**
		 * The PassportModule is required for authentication.
		 */
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET_KEY,
			signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
		}),
		/**
		 * The ClientsModule is required for microservices communication.
		 * It is used to register the USERS_CLIENT client proxy.
		 * The transport is set to TCP and the port is set to the value of the USER_SERVICE_PORT environment variable.
		 */
		ClientsModule.register([USERS_CLIENT_CONFIG]),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, AppLogger],
	exports: [AuthService],
})
export class AuthModule {}
