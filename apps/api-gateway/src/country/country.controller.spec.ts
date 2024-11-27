import { Test, TestingModule } from '@nestjs/testing';
import { CountryController } from './country.controller';
import { USERS_CLIENT } from '@app/contract/constant';
import { ClientsModule, Transport } from '@nestjs/microservices';

describe('CountryController', () => {
	let controller: CountryController;

	beforeEach(async () => {
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
			controllers: [CountryController],
			providers: [],
		}).compile();

		controller = module.get<CountryController>(CountryController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
