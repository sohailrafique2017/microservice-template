import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule } from '@nestjs/microservices';
import { USERS_CLIENT_CONFIG } from '@app/contract/config/config.microservice';

@Module({
	imports: [
		// registers a client for the USERS_CLIENT constant.
		ClientsModule.register([USERS_CLIENT_CONFIG]),
	],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
