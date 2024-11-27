import { Test, TestingModule } from '@nestjs/testing';
import { InfluencerController } from './influencer.controller';
import { InfluencerService } from './influencer.service';
import { ClientsModule } from '@nestjs/microservices';
import { USERS_CLIENT_CONFIG } from '@app/contract/config/config.microservice';

describe('InfluencerController', () => {
	// Create a testing module for the InfluencerController.
	let controller: InfluencerController;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let influencerService: InfluencerService;

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

			controllers: [InfluencerController],
			// The providers array specifies the providers that are
			// part of this testing module.
			providers: [InfluencerService],
		}).compile();

		// Get an instance of the InfluencerController from the compiled module.
		controller = module.get<InfluencerController>(InfluencerController);
		// Get an instance of the InfluencerService from the compiled module.
		influencerService = module.get<InfluencerService>(InfluencerService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
