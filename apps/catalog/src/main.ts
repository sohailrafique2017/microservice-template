import { NestFactory } from '@nestjs/core';
import { CatalogModule } from './catalog.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
	/**
	 * Bootstrap the Catalog microservice.
	 *
	 * The microservice uses TCP transport and listens on port 3002 by default.
	 * The port can be overridden using the CATALOG_SERVICE_PORT environment variable.
	 */
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(CatalogModule, {
		/**
		 * The transport layer for the microservice.
		 * In this case, we use TCP (connection-oriented protocol).
		 */
		transport: Transport.TCP,
		/**
		 * Options for the transport layer.
		 * In this case, we set the port number.
		 * If the environment variable CATALOG_SERVICE_PORT is set,
		 * its value is used. Otherwise, the default value is 3002.
		 */
		options: {
			port: process.env.CATALOG_SERVICE_PORT ? parseInt(process.env.CATALOG_SERVICE_PORT) : 3002,
		},
	});
	await app.listen();
}
bootstrap();
