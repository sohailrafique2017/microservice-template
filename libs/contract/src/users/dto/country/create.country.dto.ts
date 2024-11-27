import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCountryDto {
	@ApiProperty({ example: 'Türkiye', description: 'The name of the country' })
	@IsNotEmpty({ message: 'Please enter country name' })
	name: string;

	@ApiProperty({ example: '90', description: 'The country code of the country' })
	@IsNotEmpty({ message: 'Please enter country code' })
	country_code: string;

	@ApiProperty({ example: 'TR', description: 'The country iso code' })
	@IsNotEmpty({ message: 'Please enter country iso 2 digit code ' })
	iso_code2: string;

	@ApiProperty({ example: 'TUR', description: 'The country iso 3 digit code' })
	@IsNotEmpty({ message: 'Please enter country iso 3 digit code' })
	iso_code3: string;
}
