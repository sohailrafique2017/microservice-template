import { Test, TestingModule } from '@nestjs/testing';
import { SettingsService } from './settings.service';
import { USERS_CLIENT } from '@app/contract/constant';

describe('SettingsService', () => {
	// Define a variable to hold an instance of the SettingsService.
	let service: SettingsService;
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SettingsService,
				{
					provide: USERS_CLIENT, // Mock the USERS_CLIENT provider
					useValue: {
						send: jest.fn(), // Mocked send method for ClientProxy
					},
				},
			],
		}).compile();

		service = module.get<SettingsService>(SettingsService);
	});

	// Test to ensure the SettingsService instance is defined
	it('should be defined', () => {
		// Use Jest's expect function to assert that
		// the service variable is not undefined
		expect(service).toBeDefined();
	});
});
