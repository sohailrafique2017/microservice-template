import { Test, TestingModule } from '@nestjs/testing';
import { InfluencerService } from './influencer.service';
import { USERS_CLIENT } from '@app/contract/constant';

describe('InfluencerService', () => {
	let service: InfluencerService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				InfluencerService,
				{
					provide: USERS_CLIENT, // Mock the USERS_CLIENT provider
					useValue: {
						send: jest.fn(), // Mocked send method for ClientProxy
					},
				},
			],
		}).compile();

		service = module.get<InfluencerService>(InfluencerService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
