import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '@app/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/database/entities/user.entity';
import { RoleEntity } from '@app/database/entities/role.entity';
import { OtpEntity } from '@app/database/entities/otp.entity';
import { CountryModule } from './country/country.module';
import { InfluencerModule } from './influencer/influencer.module';
import { TrainerModule } from './trainer/trainer.module';
import { SettingsModule } from './settings/settings.module';
import { MerchantModule } from './merchant/merchant.module';
import { StateModule } from './state/state.module';

@Module({
	imports: [
		DatabaseModule,
		TypeOrmModule.forFeature([UserEntity, RoleEntity, OtpEntity]),
		CountryModule,
		InfluencerModule,
		TrainerModule,
		SettingsModule,
		MerchantModule,
		StateModule,
	],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
