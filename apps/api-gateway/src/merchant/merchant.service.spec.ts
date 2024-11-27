import { Test, TestingModule } from '@nestjs/testing';
import { MerchantService } from './merchant.service';
import { USERS_CLIENT } from '@app/contract/constant';

describe('MerchantService', () => {
	// Declare a variable to hold an instance of the MerchantService.
	let service: MerchantService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MerchantService,
				{
					provide: USERS_CLIENT, // Mock the USERS_CLIENT provider
					useValue: {
						send: jest.fn(), // Mocked send method for ClientProxy
					},
				},
			],
		}).compile();
		// Retrieve an instance of the MerchantService from the compiled testing module.
		service = module.get<MerchantService>(MerchantService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
