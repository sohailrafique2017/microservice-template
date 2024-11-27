import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { USERS_CLIENT } from '@app/contract/constant';

describe('UserService', () => {
	// Define a variable to hold an instance of the UserService.
	let service: UserService;

	// Before each test, create a TestingModule to test the UserService.
	beforeEach(async () => {
		// Create a TestingModule and compile it.
		const module: TestingModule = await Test.createTestingModule({
			// Specify that the UserService is a provider for the testing module.
			providers: [
				UserService,
				{
					provide: USERS_CLIENT, // Mock the USERS_CLIENT provider
					useValue: {
						send: jest.fn(), // Mocked send method for ClientProxy
					},
				},
			],
		}).compile();

		// Get an instance of the UserService from the compiled module.
		service = module.get<UserService>(UserService);
	});

	// Test if the service is defined.
	it('should be defined', () => {
		// Expect the service to be defined.
		expect(service).toBeDefined();
	});
});
