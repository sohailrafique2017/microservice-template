import { Module } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { TrainerController } from './trainer.controller';
import { RoleEntity } from '@app/database/entities/role.entity';
import { UserEntity } from '@app/database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '@app/users/users.service';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
	controllers: [TrainerController],
	providers: [TrainerService, UsersService],
})
export class TrainerModule {}
