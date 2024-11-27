import { Module } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { TrainerController } from './trainer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_CLIENT } from '@app/contract/constant';
@Module({
	imports: [
		// registers a client for the USERS_CLIENT constant.
		ClientsModule.register([
			{
				// The name of the client is set to the USERS_CLIENT constant.
				name: USERS_CLIENT,
				// The transport is set to TCP.
				transport: Transport.TCP,
				// port, which is set to the value of the USER_SERVICE_PORT environment
				options: {
					port: process.env.USER_SERVICE_PORT ? parseInt(process.env.USER_SERVICE_PORT) : 3001,
				},
			},
		]),
	],
	controllers: [TrainerController],
	providers: [TrainerService],
})
export class TrainerModule {}
