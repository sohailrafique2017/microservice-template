import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CountryEntity } from './country.entity';

@Entity('state')
export class StateEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'name', nullable: true, unique: true })
	name: string;

	@Column({ name: 'active', nullable: true, default: true })
	active: boolean;

	@ManyToOne(() => CountryEntity, country => country.id)
	@JoinColumn({ name: 'country_id' })
	country: CountryEntity;
}
