import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from '@app/database';
import { CommonModule } from '@app/common';
import { UserModule } from './user/user.module';
import { MerchantModule } from './merchant/merchant.module';
import { InfluencerModule } from './influencer/influencer.module';
import { TrainerModule } from './trainer/trainer.module';
import { SettingsModule } from './settings/settings.module';
import { CountryModule } from './country/country.module';
import { StateModule } from './state/state.module';

@Module({
	imports: [DatabaseModule, AuthModule, CommonModule, UserModule, MerchantModule, InfluencerModule, TrainerModule, SettingsModule, CountryModule, StateModule],
	controllers: [ApiGatewayController],
	providers: [ApiGatewayService],

	exports: [],
})
export class ApiGatewayModule {}
