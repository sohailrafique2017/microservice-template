import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateEntity } from '@app/database/entities/state.entity';
import { CountryEntity } from '@app/database/entities/country.entity';

@Module({
	imports: [TypeOrmModule.forFeature([StateEntity, CountryEntity])],
	controllers: [StateController],
	providers: [StateService],
})
export class StateModule {}
