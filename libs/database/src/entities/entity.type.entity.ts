import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('entity_type')
export class EntityTypeEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string; // e.g., Product, Order, Category, etc.
}
