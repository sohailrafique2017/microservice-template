import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * This class is a custom JWT authentication guard.
 * It extends the `AuthGuard` class from the `@nestjs/passport` package.
 * @see https://docs.nestjs.com/security/authentication#custom-strategy
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	/**
	 * The constructor injects the `AppLogger` instance.
	 * @param logger The `AppLogger` instance.
	 */
	constructor() {
		super();
	}

	/**
	 * This method is called by NestJS to check if the request is authenticated.
	 * It logs a message when the guard is triggered.
	 * @param context The execution context.
	 * @returns A boolean indicating whether the request is authenticated.
	 */
	canActivate(context: ExecutionContext) {
		return super.canActivate(context);
	}
}
