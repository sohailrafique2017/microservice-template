import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('otp')
export class OtpEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'otp', nullable: true })
	otp: number;

	@Column({ name: 'otp_expires_at', nullable: true })
	otpExpiresAt: Date;

	@ManyToOne(() => UserEntity, user => user.id)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;
}
