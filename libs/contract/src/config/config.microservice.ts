import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { USERS_CLIENT } from '@app/contract/constant';

export const USERS_CLIENT_CONFIG: ClientProviderOptions = {
	name: USERS_CLIENT,
	transport: Transport.TCP,
	options: {
		port: process.env.USER_SERVICE_PORT ? parseInt(process.env.USER_SERVICE_PORT, 10) : 3001,
	},
};
