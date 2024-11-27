import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { ClientsModule } from '@nestjs/microservices';
import { USERS_CLIENT_CONFIG } from '@app/contract/config/config.microservice';

@Module({
	imports: [
		// registers a client for the USERS_CLIENT constant.
		ClientsModule.register([USERS_CLIENT_CONFIG]),
	],
	controllers: [SettingsController],
	providers: [SettingsService],
})
export class SettingsModule {}
