import { Test, TestingModule } from '@nestjs/testing';
import { InfluencerController } from './influencer.controller';
import { InfluencerService } from './influencer.service';
import { UsersService } from '@app/users/users.service';

describe('InfluencerController', () => {
	let controller: InfluencerController;
	beforeEach(async () => {
		const mockUsersService = {
			// Define methods that should be mocked here, e.g., findUser, createUser, etc.
			findAll: jest.fn().mockResolvedValue([]),
		};
		const module: TestingModule = await Test.createTestingModule({
			controllers: [InfluencerController],
			providers: [
				InfluencerService,
				{
					provide: UsersService,
					useValue: mockUsersService,
				},
			],
		}).compile();

		controller = module.get<InfluencerController>(InfluencerController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
