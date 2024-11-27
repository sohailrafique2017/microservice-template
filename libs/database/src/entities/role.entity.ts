import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ROLE } from '@app/database/enums/role.enum';
import { RolePermissionEntity } from './role.permission.entity';

@Entity('role')
export class RoleEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'name', default: ROLE.BUYER })
	name: string;

	@Column({ name: 'is_active', default: true })
	isActive: boolean;

	@Column({ name: 'is_custom', default: false })
	isCustom: boolean;

	@OneToMany(() => RolePermissionEntity, rolePermission => rolePermission.role)
	permissions: RolePermissionEntity[];

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;
}
