import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { UsersService } from '@app/users/users.service';
import { RoleEntity } from '@app/database/entities/role.entity';
import { UserEntity } from '@app/database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
	controllers: [MerchantController],
	providers: [MerchantService, UsersService],
})
export class MerchantModule {}
