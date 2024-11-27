import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
	/**
	 * Bootstrap the Orders microservice.
	 *
	 * The microservice uses TCP transport and listens on port 3003 by default.
	 * The port can be overridden using the ORDERS_SERVICE_PORT environment variable.
	 */
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(OrdersModule, {
		transport: Transport.TCP,
		options: {
			/**
			 * The port to listen on.
			 * Defaults to 3003 if not specified.
			 */
			port: process.env.ORDERS_SERVICE_PORT ? parseInt(process.env.ORDERS_SERVICE_PORT) : 3003,
		},
	});
	/**
	 * Start the microservice.
	 */
	await app.listen();
}
bootstrap();
