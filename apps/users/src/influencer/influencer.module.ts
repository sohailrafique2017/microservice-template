import { Module } from '@nestjs/common';
import { InfluencerService } from './influencer.service';
import { InfluencerController } from './influencer.controller';
import { UsersService } from '@app/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/database/entities/user.entity';
import { RoleEntity } from '@app/database/entities/role.entity';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
	controllers: [InfluencerController],
	providers: [InfluencerService, UsersService],
})
export class InfluencerModule {}
