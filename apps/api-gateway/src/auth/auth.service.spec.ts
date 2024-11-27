import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AppLogger } from '@app/common/logger/logger.service';
import { USERS_CLIENT } from '@app/contract/constant';
import { JwtService } from '@nestjs/jwt';
/**
 * Unit tests for the AuthService.
 */
describe('AuthService', () => {
	let service: AuthService;

	beforeEach(async () => {
		/**
		 * Create a testing module for the AuthService.
		 * Mock the AppLogger and USERS_CLIENT providers.
		 */
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				JwtService,
				AppLogger, // Mock the logger service
				{
					provide: USERS_CLIENT, // Mock the USERS_CLIENT provider
					useValue: {
						send: jest.fn(), // Mocked send method for ClientProxy
					},
				},
			],
		}).compile();

		/**
		 * Get the instance of the AuthService.
		 */
		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		/**
		 * Test that the AuthService is defined.
		 */
		expect(service).toBeDefined();
	});

	// Add more tests for AuthService methods if needed
});
