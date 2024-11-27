import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PermissionType } from '@app/database/enums/role.enum';

@Entity('permission')
export class PermissionEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'name', type: 'enum', enum: PermissionType, default: PermissionType.READ })
	name: PermissionType;

	@Column({ name: 'is_active', default: true })
	isActive: boolean;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;
}
