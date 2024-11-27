import { Test, TestingModule } from '@nestjs/testing';
import { ROLE } from '@app/database/enums';
import { UserNotFoundException } from '@app/common/expceptions/user.notfound.exception';
import { MerchantService } from './merchant.service';
import { UsersService } from '@app/users/users.service';
import { getCreateMerchantDto, getUpdateMerchantDto } from '@app/users/utils/test';
describe('MerchantService', () => {
	// Declare a variable to hold an instance of the MerchantService
	let merchantService: MerchantService;
	let usersService: UsersService;

	const mockUsersService = {
		_createUserWithRole: jest.fn(),
		_updateUser: jest.fn(),
		_findOneUser: jest.fn(),
		_findAllUsersByRole: jest.fn(),
		_removeUser: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [MerchantService, { provide: UsersService, useValue: mockUsersService }],
		}).compile();

		merchantService = module.get<MerchantService>(MerchantService);
		usersService = module.get<UsersService>(UsersService);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});
	describe('createMerchant', () => {
		it('should create a merchant successfully', async () => {
			const createMerchantDto = getCreateMerchantDto();
			mockUsersService._createUserWithRole.mockResolvedValue('merchant');

			const result = await merchantService.createMerchant(createMerchantDto);
			expect(usersService._createUserWithRole).toHaveBeenCalledWith(ROLE.MERCHANT, createMerchantDto);
			expect(result).toEqual('merchant');
		});

		it('should throw an error if user creation fails', async () => {
			const createMerchantDto = getCreateMerchantDto();

			mockUsersService._createUserWithRole.mockRejectedValue(new Error('User creation failed'));

			await expect(merchantService.createMerchant(createMerchantDto)).rejects.toThrow('User creation failed');
		});
	});

	describe('updateMerchant', () => {
		it('should update a merchant successfully', async () => {
			const updateMerchantDto = getUpdateMerchantDto();

			mockUsersService._updateUser.mockResolvedValue('updatedMerchant');

			const result = await merchantService.updateMerchant('merchantId', updateMerchantDto);
			expect(usersService._updateUser).toHaveBeenCalledWith('merchantId', updateMerchantDto);
			expect(result).toEqual('updatedMerchant');
		});

		it('should throw an error if user update fails', async () => {
			const updateMerchantDto = getUpdateMerchantDto();

			mockUsersService._updateUser.mockRejectedValue(new Error('User update failed'));

			await expect(merchantService.updateMerchant('merchantId', updateMerchantDto)).rejects.toThrow('User update failed');
		});
	});

	describe('findMerchant', () => {
		it('should return a merchant by id', async () => {
			mockUsersService._findOneUser.mockResolvedValue('merchant');

			const result = await merchantService.findMerchant('merchantId');
			expect(usersService._findOneUser).toHaveBeenCalledWith('merchantId');
			expect(result).toEqual('merchant');
		});

		it('should throw an error if user is not found', async () => {
			mockUsersService._findOneUser.mockRejectedValue(new UserNotFoundException());

			await expect(merchantService.findMerchant('merchantId')).rejects.toThrow(UserNotFoundException);
		});
	});

	describe('findAllMerchant', () => {
		it('should return all merchants', async () => {
			mockUsersService._findAllUsersByRole.mockResolvedValue(['merchant1', 'merchant2']);

			const result = await merchantService.findAllMerchant();
			expect(usersService._findAllUsersByRole).toHaveBeenCalledWith(ROLE.MERCHANT);
			expect(result).toEqual(['merchant1', 'merchant2']);
		});
	});

	describe('removeMerchant', () => {
		it('should remove a merchant by id', async () => {
			mockUsersService._removeUser.mockResolvedValue('Deleted successfully');

			const result = await merchantService.removeMerchant('merchantId');
			expect(usersService._removeUser).toHaveBeenCalledWith('merchantId');
			expect(result).toEqual('Deleted successfully');
		});

		it('should throw an error if removal fails', async () => {
			mockUsersService._removeUser.mockRejectedValue(new Error('User removal failed'));

			await expect(merchantService.removeMerchant('merchantId')).rejects.toThrow('User removal failed');
		});
	});
});
