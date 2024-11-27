import { Test, TestingModule } from '@nestjs/testing';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { ClientsModule } from '@nestjs/microservices';
import { USERS_CLIENT_CONFIG } from '@app/contract/config/config.microservice';

describe('MerchantController', () => {
	// Create a testing module for the MerchantController.
	let controller: MerchantController;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let merchantService: MerchantService;

	// Before each test, create a fresh instance of the testing module.
	// This ensures that each test runs independently without any side effects.
	beforeEach(async () => {
		// Create a testing module that imports the ClientsModule and
		// registers the USERS_CLIENT with a mocked transport protocol (TCP)
		// and a mocked microservice port (3001).
		// The ClientsModule is a NestJS module that provides the
		// ClientProxy class which is used to communicate with a microservice.
		// The register method is used to register the USERS_CLIENT with the
		// mocked transport protocol and port.
		const module: TestingModule = await Test.createTestingModule({
			imports: [ClientsModule.register([USERS_CLIENT_CONFIG])],
			controllers: [MerchantController],
			// The providers array specifies the providers that are
			// part of this testing module.
			providers: [MerchantService],
		}).compile();

		// Get an instance of the MerchantController from the compiled module.
		controller = module.get<MerchantController>(MerchantController);
		// Get an instance of the MerchantService from the compiled module.
		merchantService = module.get<MerchantService>(MerchantService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
