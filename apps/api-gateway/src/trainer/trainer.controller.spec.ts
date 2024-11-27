import { Test, TestingModule } from '@nestjs/testing';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_CLIENT } from '@app/contract/constant';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';

describe('TrainerController', () => {
	// Create a testing module for the TrainerController.
	let controller: TrainerController;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let influencerService: TrainerService;

	beforeEach(async () => {
		// Create a testing module that imports the ClientsModule and
		// registers the USERS_CLIENT with a mocked transport protocol (TCP)
		// and a mocked microservice port (3001).
		// The ClientsModule is a NestJS module that provides the
		// ClientProxy class which is used to communicate with a microservice.
		// The register method is used to register the USERS_CLIENT with the
		// mocked transport protocol and port.
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				ClientsModule.register([
					{
						name: USERS_CLIENT,
						transport: Transport.TCP, // Mocked transport protocol
						options: { port: 3001 }, // Mocked microservice port
					},
				]),
			],

			controllers: [TrainerController],
			// The providers array specifies the providers that are
			// part of this testing module.
			providers: [TrainerService],
		}).compile();

		// Get an instance of the TrainerController from the compiled module.
		controller = module.get<TrainerController>(TrainerController);
		// Get an instance of the TrainerService from the compiled module.
		influencerService = module.get<TrainerService>(TrainerService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
