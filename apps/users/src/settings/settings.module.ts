import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { EntityTypeEntity } from '@app/database/entities/entity.type.entity';
import { PermissionEntity } from '@app/database/entities/permission.entity';
import { RolePermissionEntity } from '@app/database/entities/role.permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '@app/database/entities/role.entity';

@Module({
	imports: [TypeOrmModule.forFeature([PermissionEntity, EntityTypeEntity, RolePermissionEntity, RoleEntity])],
	controllers: [SettingsController],
	providers: [SettingsService],
})
export class SettingsModule {}
