import { RpcException } from '@nestjs/microservices';

export class UserNotFoundException extends RpcException {
	constructor() {
		// You can pass the error message or any other necessary information
		super('User not found');
	}
}
