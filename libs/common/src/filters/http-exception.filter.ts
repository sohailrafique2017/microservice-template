import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { ResponseStatus } from '@app/common/enums/response-status.enum';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		// Handle HTTP exceptions
		if (exception instanceof HttpException) {
			const status = exception.getStatus();
			const message = exception instanceof Error ? (exception['response']?.message ? exception['response']?.message : exception.message) : 'Internal server error';
			return response.status(status).json({
				status: ResponseStatus.ERROR,
				data: null,
				message: message,
			});
		}

		// Handle RPC exceptions from microservices
		if (exception instanceof RpcException) {
			return response.status(HttpStatus.BAD_REQUEST).json({
				status: ResponseStatus.ERROR,
				data: null,
				message: exception.message || 'A microservice error occurred',
			});
		}

		// Handle other types of exceptions (fallback)
		const status = HttpStatus.INTERNAL_SERVER_ERROR;
		return response.status(status).json({
			status: ResponseStatus.ERROR,
			data: null,
			message: exception.message || 'An unexpected error occurred',
		});
	}
}
