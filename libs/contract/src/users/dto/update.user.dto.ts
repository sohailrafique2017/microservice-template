import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';
import { Gender } from '@app/database/enums';

export class UpdateUserDto {
	@ApiProperty({ example: 'firstname', description: 'The first name of the user' })
	@IsOptional()
	firstName: string;

	@ApiProperty({ example: 'lastname', description: 'The last name of the user' })
	@IsOptional()
	lastName: string;

	@ApiProperty({
		example: '1234567890',
		description: 'Mobile number as a string of digits',
	})
	@IsOptional()
	@IsNumberString({}, { message: 'Mobile number must be a valid numeric string' })
	mobileNumber: string;

	@ApiProperty({
		// Descriptive text for Swagger
		enum: Gender, // Specifies that this property can only be one of the ROLE enum values
		example: Gender.MALE, // Example value for Swagger UI
	})
	@IsOptional()
	gender: Gender;

	@ApiProperty({
		example: '1990-01-01', // Example date for Swagger UI
		description: 'Date of birth in ISO 8601 format',
	})
	@IsOptional()
	dob: string;
}
