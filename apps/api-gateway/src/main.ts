import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from '@app/common/interceptors/response.interceptor';
import { HttpExceptionFilter } from '@app/common/filters/http-exception.filter';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(ApiGatewayModule);
	// Enable CORS for the entire API
	// This is necessary for the frontend to make requests to the API
	app.enableCors();
	// Create a global ValidationPipe
	// This will validate all incoming requests
	// and transform the objects to their respective
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);
	// Set the global prefix for the API
	// This is the prefix that will be added to all routes in the API
	app.setGlobalPrefix('api');
	// Enable versioning for the API
	// This will allow the API to support multiple versions of the API
	app.enableVersioning({
		type: VersioningType.URI,
	});

	// Build Swagger API Document
	const config = new DocumentBuilder()
		.setTitle('Sporday Backend')
		.setDescription('Sporday Backend APIs')
		.setVersion('1.0')
		.addBearerAuth(
			{
				type: 'http',
				name: 'JWT',
				description: 'Enter JWT token',
				in: 'header',
			},
			'authorization', // This name here is important for matching up with @ApiBearerAuth() in your controller!
		)
		.build();
	// Create Swagger API Document
	const document = SwaggerModule.createDocument(app, config);

	// Setup Swagger Endpoint
	SwaggerModule.setup('/', app, document);

	// Apply Global Response Interceptor
	app.useGlobalInterceptors(new ResponseInterceptor());

	// Apply Global Exception Filter
	app.useGlobalFilters(new HttpExceptionFilter());

	await app.listen(process.env.API_GATE_WAY_PORT || 3000);
}
bootstrap();
