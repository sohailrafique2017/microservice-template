import { Test, TestingModule } from '@nestjs/testing';
import { StateController } from './state.controller';
import { USERS_CLIENT } from '@app/contract/constant';
import { ClientsModule, Transport } from '@nestjs/microservices';

describe('StateController', () => {
	// Declare a variable 'controller' of type 'StateController'
	let controller: StateController;

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
			controllers: [StateController],
			providers: [],
		}).compile();
		// Get an instance of the StateController from the compiled module.

		controller = module.get<StateController>(StateController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
