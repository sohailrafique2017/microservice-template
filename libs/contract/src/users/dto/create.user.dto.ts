import { Gender } from '@app/database/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({ example: 'test@example.com', description: 'The email address of the user' })
	@IsNotEmpty({ message: 'Please enter email' })
	@IsEmail({}, { message: 'Please enter a valid email address' })
	email: string;

	@ApiProperty({ example: 'testuser', description: 'The username of the user' })
	@IsNotEmpty({ message: 'Please enter username' })
	username: string;

	@ApiProperty({ example: 'Abc1234#', description: 'The password of the user' })
	@IsNotEmpty({ message: 'Please enter password' })
	@IsStrongPassword(
		{
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 1,
		},
		{ message: 'Password must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character' },
	)
	password: string;

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
	@IsNotEmpty({ message: 'Please select gender' }) // Updated error message
	gender: Gender;

	@ApiProperty({
		example: '1990-01-01', // Example date for Swagger UI
		description: 'Date of birth in ISO 8601 format',
	})
	@IsOptional()
	@IsDateString({}, { message: 'Date of birth must be a valid date string (ISO 8601 format)' })
	dob: string;
}
