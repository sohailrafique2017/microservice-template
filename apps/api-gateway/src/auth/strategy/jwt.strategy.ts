import { USERS_CLIENT } from '@app/contract/constant';
import { USERS_PATTERN } from '@app/contract/users/pattern/users.pattern';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { firstValueFrom } from 'rxjs';
/**
 * This class is a custom Passport strategy for validating JWT tokens.
 * It extends the `PassportStrategy` class from the `@nestjs/passport` package.
 * @see https://docs.nestjs.com/security/authentication#custom-strategy
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	/**
	 * The constructor injects the `USERS_CLIENT` client proxy and the `AppLogger`.
	 * It also sets up the JWT strategy with the secret key from the environment variable.
	 * @param authClient The `USERS_CLIENT` client proxy.
	 */
	constructor(@Inject(USERS_CLIENT) private authClient: ClientProxy) {
		super({
			/**
			 * The `jwtFromRequest` option specifies how to extract the JWT token from the request.
			 * In this case, it extracts the token from the `Authorization` header as a bearer token.
			 */
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			/**
			 * The `ignoreExpiration` option specifies whether to ignore the expiration date of the JWT token.
			 * In this case, it is set to `false`, which means that the token will not be considered valid if it is expired.
			 */
			ignoreExpiration: false,
			/**
			 * The `secretOrKey` option specifies the secret key used to sign the JWT token.
			 * In this case, it is set to the value of the `JWT_SECRET_KEY` environment variable.
			 */
			secretOrKey: process.env.JWT_SECRET_KEY,
		});
	}

	/**
	 * The `validate` method is called by Passport to validate the JWT token.
	 * It takes a `payload` object as an argument, which contains the claims of the JWT token.
	 * It returns a user object if the token is valid, or throws an `UnauthorizedException` if the token is invalid.
	 * @param payload The claims of the JWT token.
	 */
	async validate(payload: any) {
		/**
		 * This line sends a request to the `users` service to find a user with the given ID.
		 * The `firstValueFrom` function is used to convert the Observable returned by the `ClientProxy` to a Promise.
		 */
		const user = await firstValueFrom(this.authClient.send(USERS_PATTERN.FIND_ONE, payload.sub));
		if (!user) {
			/**
			 * If the user is not found, throw an `UnauthorizedException`.
			 */
			throw new UnauthorizedException();
		}
		return user;
	}
}
