import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateStateDto {
	@ApiProperty({ example: '', description: 'The name of the state' })
	@IsNotEmpty({ message: 'Please enter state name' })
	name: string;

	@ApiProperty({ example: '', description: 'Country id' })
	@IsNotEmpty({ message: 'Please enter country id' })
	country_id: string;
}
