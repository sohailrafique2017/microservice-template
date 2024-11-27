import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule } from '@nestjs/microservices';
import { USERS_CLIENT_CONFIG } from '@app/contract/config/config.microservice';

describe('UserController', () => {
	// Define a variable to hold an instance of the UserController.
	let controller: UserController;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let userService: UserService;

	// Before each test, create a TestingModule to test the UserController.
	beforeEach(async () => {
		// Create a TestingModule and compile it.
		const module: TestingModule = await Test.createTestingModule({
			imports: [ClientsModule.register([USERS_CLIENT_CONFIG])],
			// Specify that the UserController is the controller being tested.
			controllers: [UserController],
			// Specify that the UserService is a provider for the UserController.
			providers: [UserService],
		}).compile();

		// Get an instance of the UserController from the compiled module.
		controller = module.get<UserController>(UserController);
		userService = module.get<UserService>(UserService);
	});

	// Test if the controller is defined.
	it('should be defined', () => {
		// Expect the controller to be defined.
		expect(controller).toBeDefined();
	});
});
