import { ROLE } from '@app/database/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class RegisterAuthDto {
	@ApiProperty({
		description: 'The email address of the user',
		example: 'test@example.com',
	})
	@IsNotEmpty({ message: 'Please enter email' })
	@IsEmail({}, { message: 'Please enter a valid email address' })
	email: string;

	@ApiProperty({ example: 'testuser' })
	@IsNotEmpty({ message: 'Please enter username' })
	username: string;

	@ApiProperty({ example: 'Abc1234#' })
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

	@ApiProperty({
		description: `The role of the user {${ROLE.BUYER},${ROLE.INFLUENCER},${ROLE.MERCHANT},${ROLE.TRAINER}} `, // Descriptive text for Swagger
		enum: ROLE, // Specifies that this property can only be one of the ROLE enum values
		example: ROLE.BUYER, // Example value for Swagger UI
	})
	@IsNotEmpty({ message: 'Please select a role' }) // Updated error message
	role: ROLE;
}
