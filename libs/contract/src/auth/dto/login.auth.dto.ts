import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
	@ApiProperty({ example: 'test@example.com', description: 'The email address or username of the user' })
	@IsNotEmpty({ message: 'Please enter email address or username' })
	emailOrUsername: string;

	@ApiProperty({ example: 'password', description: 'The password of the user' })
	@IsNotEmpty({ message: 'Please enter password' })
	password: string;
}
