import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RoleEntity } from './role.entity';
import { Gender } from '@app/database/enums/gender.enum';

@Entity('users')
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'user_name', unique: true, nullable: false })
	username: string;

	@Column({ name: 'email', unique: true, nullable: false })
	email: string;

	@Column({ name: 'password', nullable: false })
	password: string;

	@Column({ name: 'first_name', nullable: true })
	firstName: string;

	@Column({ name: 'last_name', nullable: true })
	lastName: string;

	@Column({ name: 'mobile_number', nullable: true })
	mobileNumber: string;

	@Column({ name: 'gender', type: 'enum', enum: Gender, default: Gender.MALE, nullable: true })
	gender: Gender;

	@CreateDateColumn({ name: 'dob', nullable: true })
	dob: Date;

	@Column({ name: 'is_blocked', default: false, nullable: true })
	isBlocked: boolean;

	@Column({ name: 'mobile_verified', default: false, nullable: true })
	mobileVerified: boolean;

	@Column({ name: 'email_verified', default: false, nullable: true })
	emailVerified: boolean;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@ManyToOne(() => RoleEntity, role => role.id, { nullable: true })
	@JoinColumn({ name: 'role' })
	role: RoleEntity;
}
