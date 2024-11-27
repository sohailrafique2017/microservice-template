import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { StateEntity } from './state.entity';

@Entity('city')
export class CityEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'name', nullable: true, unique: true })
	name: string;

	@Column({ name: 'active', nullable: true, default: true })
	active: boolean;

	@ManyToOne(() => StateEntity, state => state.id)
	@JoinColumn({ name: 'state_id' })
	state: StateEntity;
}
