import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
	/**
	 * Create a new NestJS microservice application.
	 * The application listens on a TCP port.
	 * The port is set by the USER_SERVICE_PORT environment variable.
	 * If the variable is not set, the default port is 3001.
	 */
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(UsersModule, {
		/**
		 * The transport layer for the microservice.
		 * In this case, we use TCP.
		 */
		transport: Transport.TCP,
		/**
		 * Options for the transport layer.
		 */
		options: {
			/**
			 * The port number to listen on.
			 * If the USER_SERVICE_PORT environment variable is set,
			 * its value is used. Otherwise, the default value is 3001.
			 */
			port: process.env.USER_SERVICE_PORT ? parseInt(process.env.USER_SERVICE_PORT) : 3001,
		},
	});
	await app.listen();
}
bootstrap();
