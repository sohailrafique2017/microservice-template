import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { EntityTypeEntity } from './entity.type.entity';
import { RoleEntity } from './role.entity';

@Entity('role_permission')
export class RolePermissionEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => RoleEntity, role => role.permissions)
	role: RoleEntity;

	@ManyToOne(() => PermissionEntity)
	permission: PermissionEntity;

	@ManyToOne(() => EntityTypeEntity)
	entityType: EntityTypeEntity; // Defines which entity the role's permission applies to (e.g., Product, Order, etc.)
}
