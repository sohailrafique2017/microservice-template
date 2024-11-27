import { Test, TestingModule } from '@nestjs/testing';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { UsersService } from '@app/users/users.service';

describe('MerchantController', () => {
	let controller: MerchantController;
	//eslint-disable-next-line @typescript-eslint/no-unused-vars
	let usersService: UsersService;
	beforeEach(async () => {
		const mockUsersService = {
			// Define methods that should be mocked here, e.g., findUser, createUser, etc.
			findAll: jest.fn().mockResolvedValue([]),
		};
		const module: TestingModule = await Test.createTestingModule({
			controllers: [MerchantController],
			providers: [
				MerchantService,
				{
					provide: UsersService,
					useValue: mockUsersService,
				},
			],
		}).compile();

		controller = module.get<MerchantController>(MerchantController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
