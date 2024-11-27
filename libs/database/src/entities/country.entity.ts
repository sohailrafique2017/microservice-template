import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('country')
export class CountryEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'name', nullable: true, unique: true })
	name: string;

	@Column({ name: 'country_code', nullable: true })
	country_code: string;

	@Column({ name: 'iso_code2', nullable: true })
	iso_code2: string;

	@Column({ name: 'iso_code3', nullable: true })
	iso_code3: string;

	@Column({ name: 'active', nullable: true, default: true })
	active: boolean;
}
