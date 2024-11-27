import { Module } from '@nestjs/common';
import { StateController } from './state.controller';
import { USERS_CLIENT_CONFIG } from '@app/contract/config/config.microservice';
import { ClientsModule } from '@nestjs/microservices';

@Module({
	imports: [
		// registers a client for the USERS_CLIENT constant.
		ClientsModule.register([USERS_CLIENT_CONFIG]),
	],
	controllers: [StateController],
})
export class StateModule {}
