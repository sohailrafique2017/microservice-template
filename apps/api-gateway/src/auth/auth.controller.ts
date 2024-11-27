import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegisterAuthDto } from '@app/contract/auth/dto/register.auth.dto';
import { LoginAuthDto } from '@app/contract/auth/dto/login.auth.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ResetPasswordUserDto } from '@app/contract/users/dto/reset.password.user.dto';
import { API_ENDPOINT } from '@app/api-gateway/utils/constant/api.endpoint.constant';
import { CONSTANTS } from '@app/api-gateway/utils/constant';
import { API_VERSION } from '@app/common/enums';

@ApiTags(CONSTANTS.AUTH_CONTROLLER)
@Controller({ path: CONSTANTS.AUTH_CONTROLLER, version: API_VERSION.V1 })
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Post(API_ENDPOINT.AUTH_REGISTER) /**
	 * Registers a new user by sending a request to the Users microservice.
	 * @param registerAuthDto The user data to register.
	 * @returns A message indicating the success of the registration.
	 */
	register(@Body() registerAuthDto: RegisterAuthDto) {
		return this.authService.register(registerAuthDto);
	}
	/**
	 * Logs a user in by validating their username and password and returning a JWT access token.
	 * @param loginAuthDto The user data to log in.
	 * @returns A JWT access token for the user.
	 */
	@Post(API_ENDPOINT.AUTH_LOGIN)
	login(@Body() loginAuthDto: LoginAuthDto) {
		return this.authService.login(loginAuthDto);
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard)
	@Get(API_ENDPOINT.USER_PROFILE)
	/**
	 * Returns the logged-in user's profile, without the password.
	 * @param req The request object, which has the user in the request context.
	 * @returns The user's profile, without the password.
	 */
	getProfile(@Request() req) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = req.user;
		return user;
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard)
	@Get(API_ENDPOINT.USER_REFRESH_TOKEN)
	/**
	 * Refreshes the JWT access token for the authenticated user.
	 * @param req The request object containing the authenticated user.
	 * @returns An object containing the new access token.
	 */
	refreshToken(@Request() req) {
		return this.authService.refreshToken(req);
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard)
	@Post(API_ENDPOINT.USER_RESET_PASSWORD)
	/**
	 * Resets the password of the user who made the request.
	 * @param req The request object containing the authenticated user.
	 * @param dto An object with the new password.
	 * @returns The updated user object.
	 * @throws Propagates any errors encountered during password reset.
	 */
	resetPassword(@Request() req, @Body() dto: ResetPasswordUserDto) {
		return this.authService.resetPassword(req, dto);
	}
}
