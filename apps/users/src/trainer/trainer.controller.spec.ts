import { Test, TestingModule } from '@nestjs/testing';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';
import { UsersService } from '@app/users/users.service';

describe('TrainerController', () => {
	let controller: TrainerController;
	//eslint-disable-next-line @typescript-eslint/no-unused-vars
	let usersService: UsersService;
	beforeEach(async () => {
		const mockUsersService = {
			// Define methods that should be mocked here, e.g., findUser, createUser, etc.
			findAll: jest.fn().mockResolvedValue([]),
		};
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TrainerController],
			providers: [
				TrainerService,
				{
					provide: UsersService,
					useValue: mockUsersService,
				},
			],
		}).compile();

		controller = module.get<TrainerController>(TrainerController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
