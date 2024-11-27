import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USERS_CLIENT } from '@app/contract/constant';
import { USERS_PATTERN } from '@app/contract/users/pattern/users.pattern';
import { RegisterAuthDto } from '@app/contract/auth/dto/register.auth.dto';
import { LoginAuthDto } from '@app/contract/auth/dto/login.auth.dto';
import { AppLogger } from '@app/common/logger/logger.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { firstValueFrom } from 'rxjs';
import { ResetPasswordUserDto } from '@app/contract/users/dto/reset.password.user.dto';
/**
 * The AuthService class provides methods for registering, validating and logging in users.
 * It relies on the Users microservice to store and retrieve user data.
 */
@Injectable()
export class AuthService {
	/**
	 * The constructor injects the Users microservice client, the JwtService, and the AppLogger.
	 * @param authClient The Users microservice client.
	 * @param jwtService The JwtService.
	 * @param logger The AppLogger.
	 */
	constructor(
		@Inject(USERS_CLIENT) private readonly authClient: ClientProxy,
		private readonly jwtService: JwtService,
		private readonly logger: AppLogger,
	) {
		this.logger.setContext(AuthService.name);
	}

	/**
	 * Registers a new user in the Users microservice.
	 * @param registerAuthDto The user data to register.
	 */
	register(registerAuthDto: RegisterAuthDto) {
		return this.authClient.send(USERS_PATTERN.REGISTER, registerAuthDto);
	}

	/**
	 * Validates a user's username and password by making a request to the Users microservice.
	 * @param username The username to validate.
	 * @param password The password to validate.
	 */
	async validateUser(emailOrUsername: string, password: string) {
		const user = await firstValueFrom(this.authClient.send(USERS_PATTERN.FIND_BY_USERNAME, emailOrUsername));
		if (user && (await bcrypt.compare(password, user.password))) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	/**
	 * Authenticates a user by validating their email or username and password.
	 * If the credentials are valid, generates an access token for the user.
	 * @param loginAuthDto The login credentials provided by the user.
	 * @returns An object containing the access token for the authenticated user.
	 */
	async login(loginAuthDto: LoginAuthDto) {
		const { emailOrUsername, password } = loginAuthDto;
		const user = await this.validateUser(emailOrUsername, password);
		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}
		const payload = { username: user.username, sub: user.id };
		return {
			accessToken: this.jwtService.sign(payload),
		};
	}
	/**
	 * @param req The request object containing the authenticated user.
	 * @returns An object containing the new access token.
	 * @throws Propagates any errors encountered during token generation.
	 */
	async refreshToken(req) {
		try {
			const user = req.user;
			const payload = { username: user.username, sub: user.id };
			const refreshToken = await this.jwtService.sign(payload);
			return {
				accessToken: refreshToken,
			};
		} catch (error) {
			throw error;
		}
	}
	/**
	 * Resets the password of the user who made the request.
	 * @param req The request object containing the authenticated user.
	 * @param dto An object with the new password.
	 * @returns The updated user object.
	 * @throws Propagates any errors encountered during password reset.
	 */
	async resetPassword(req, dto: ResetPasswordUserDto) {
		try {
			return await this.authClient.send(USERS_PATTERN.RESET_PASSWORD, {
				id: req.user.id,
				newPassword: dto.newPassword,
			});
		} catch (error) {
			throw error;
		}
	}
}
