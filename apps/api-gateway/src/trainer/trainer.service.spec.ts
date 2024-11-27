import { Test, TestingModule } from '@nestjs/testing';
import { TrainerService } from './trainer.service';
import { USERS_CLIENT } from '@app/contract/constant';
describe('TrainerService', () => {
	let service: TrainerService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TrainerService,
				{
					provide: USERS_CLIENT, // Mock the USERS_CLIENT provider
					useValue: {
						send: jest.fn(), // Mocked send method for ClientProxy
					},
				},
			],
		}).compile();

		service = module.get<TrainerService>(TrainerService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
