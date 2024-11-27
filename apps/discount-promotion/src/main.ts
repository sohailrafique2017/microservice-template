import { NestFactory } from '@nestjs/core';
import { DiscountPromotionModule } from './discount-promotion.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
	/**
	 * The main entry point of the application.
	 * It creates a new instance of the Nest microservice and starts it.
	 */
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(DiscountPromotionModule, {
		/**
		 * The transport layer to use for communication.
		 * In this case, we use TCP, a connection-oriented protocol.
		 */
		transport: Transport.TCP,
		/**
		 * Options for the transport layer.
		 * In this case, we set the port number to use.
		 */
		options: {
			/**
			 * The port number to use for the service.
			 * If the environment variable DISCOUNT_PROMOTION_SERVICE_PORT is set,
			 * its value is used. Otherwise, the default value is 3005.
			 */
			port: process.env.DISCOUNT_PROMOTION_SERVICE_PORT ? parseInt(process.env.DISCOUNT_PROMOTION_SERVICE_PORT) : 3005,
		},
	});
	await app.listen();
}
bootstrap();
