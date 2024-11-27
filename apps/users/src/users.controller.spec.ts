import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
	/**
	 * UsersController unit tests
	 */
	let usersController: UsersController;
	//eslint-disable-next-line @typescript-eslint/no-unused-vars
	let usersService: UsersService;

	beforeEach(async () => {
		/**
		 * Mock the UsersService provider
		 */
		const mockUsersService = {
			// Define methods that should be mocked here, e.g., findUser, createUser, etc.
			findAll: jest.fn().mockResolvedValue([]),
		};

		/**
		 * Create a testing module for the UsersController
		 * Use the mock service instead of the actual service
		 */
		const app: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [
				{
					provide: UsersService,
					useValue: mockUsersService,
				},
			],
		}).compile();

		/**
		 * Get the instance of the UsersController and UsersService
		 */
		usersController = app.get<UsersController>(UsersController);
		usersService = app.get<UsersService>(UsersService);
	});

	/**
	 * Test suite for the root action
	 */
	describe('root', () => {
		/**
		 * Test that the UsersController is defined
		 */
		it('should be defined', () => {
			/**
			 * Expect the UsersController to be defined
			 */
			expect(usersController).toBeDefined();
		});
	});
});
