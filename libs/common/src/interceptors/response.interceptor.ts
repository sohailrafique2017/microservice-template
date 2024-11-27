// src/interceptors/response.interceptor.ts
import { ResponseStatus } from '@app/common/enums/response-status.enum';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map(data => {
				return {
					status: ResponseStatus.SUCCESS,
					data: data || null,
					message: 'Request successful',
				};
			}),
		);
	}
}
