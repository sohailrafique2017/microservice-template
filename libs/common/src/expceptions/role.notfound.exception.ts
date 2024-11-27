import { RpcException } from '@nestjs/microservices';

export class RoleNotFoundException extends RpcException {
	constructor() {
		// You can pass the error message or any other necessary information
		super('Role not found');
	}
}
