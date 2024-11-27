import { Module } from '@nestjs/common';
import { InfluencerService } from './influencer.service';
import { InfluencerController } from './influencer.controller';
import { ClientsModule } from '@nestjs/microservices';
import { USERS_CLIENT_CONFIG } from '@app/contract/config/config.microservice';

@Module({
	imports: [
		// registers a client for the USERS_CLIENT constant.
		ClientsModule.register([USERS_CLIENT_CONFIG]),
	],
	controllers: [InfluencerController],
	providers: [InfluencerService],
})
export class InfluencerModule {}
