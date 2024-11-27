import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AppLogger } from '@app/common/logger/logger.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { USERS_CLIENT } from '@app/contract/constant';
import { ClientsModule } from '@nestjs/microservices';
import { USERS_CLIENT_CONFIG } from '@app/contract/config/config.microservice';

describe('AuthController', () => {
	let controller: AuthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				PassportModule,
				JwtModule.register({
					secret: 'testSecret', // Provide a test secret key for JwtStrategy
					signOptions: { expiresIn: '3600s' }, // Mock expiration time
				}),
				ClientsModule.register([USERS_CLIENT_CONFIG]),
			],
			controllers: [AuthController],
			providers: [
				AuthService,
				{
					provide: JwtStrategy, // Mocking JwtStrategy with a valid secret key
					useValue: {
						jwtFromRequest: jest.fn(),
						ignoreExpiration: false,
						secretOrKey: 'testSecret', // Provide the same test secret here
					},
				},
				AppLogger,
				{
					// Mock the USERS_CLIENT provider
					provide: USERS_CLIENT,
					useValue: {
						send: jest.fn(), // Mocked send method for ClientProxy
					},
				},
			],
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	// Add more tests for AuthController methods
});
