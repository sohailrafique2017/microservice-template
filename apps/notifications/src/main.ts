import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
	/**
	 * This method creates a Nest Application and Microservice instance,
	 * and starts the Microservice.
	 */
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(NotificationsModule, {
		/**
		 * Define the transport layer for the Microservice.
		 * In this case, we use TCP (connection-oriented protocol).
		 */
		transport: Transport.TCP,
		/**
		 * Define the options for the transport layer.
		 * In this case, we set the port number.
		 * If the environment variable NOTIFICATION_SERVICE_PORT is set,
		 * its value is used. Otherwise, the default value is 3004.
		 */
		options: {
			port: process.env.NOTIFICATION_SERVICE_PORT ? parseInt(process.env.NOTIFICATION_SERVICE_PORT) : 3004,
		},
	});
	await app.listen();
}
bootstrap();
