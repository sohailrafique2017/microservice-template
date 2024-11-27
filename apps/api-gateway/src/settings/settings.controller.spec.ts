import { Test, TestingModule } from '@nestjs/testing';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { USERS_CLIENT_CONFIG } from '@app/contract/config/config.microservice';
import { ClientsModule } from '@nestjs/microservices';

describe('SettingsController', () => {
	// Define a variable to hold an instance of the SettingsController.
	let controller: SettingsController;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let settingsService: SettingsService;

	// Before each test, create a fresh instance of the testing module.
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ClientsModule.register([USERS_CLIENT_CONFIG])],
			// The `controllers` array specifies the controllers that are part of
			// this testing module.
			controllers: [SettingsController],
			// The `providers` array specifies the providers that are part of this
			// testing module.
			// In this case, the SettingsService is the provider that is required
			// by the SettingsController.
			providers: [SettingsService],
		}).compile();

		// Get an instance of the SettingsController from the compiled module.
		controller = module.get<SettingsController>(SettingsController);
		settingsService = module.get<SettingsService>(SettingsService);
	});

	// Test if the controller is defined.
	it('should be defined', () => {
		// Expect the controller to be defined.
		expect(controller).toBeDefined();
	});
});
