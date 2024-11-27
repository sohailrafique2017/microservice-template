import { Test, TestingModule } from '@nestjs/testing';
import { ROLE } from '@app/database/enums';
import { getCreateInfluencerDto, getUpdateInfluencerDto } from '@app/users/utils/test';
import { UserNotFoundException } from '@app/common/expceptions/user.notfound.exception';
import { InfluencerService } from './influencer.service';
import { UsersService } from '@app/users/users.service';
describe('InfluencerService', () => {
	// Declare a variable to hold an instance of the InfluencerService
	let influencerService: InfluencerService;
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
			providers: [InfluencerService, { provide: UsersService, useValue: mockUsersService }],
		}).compile();

		influencerService = module.get<InfluencerService>(InfluencerService);
		usersService = module.get<UsersService>(UsersService);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});
	describe('createInfluencer', () => {
		it('should create a influencer successfully', async () => {
			const createInfluencerDto = getCreateInfluencerDto();
			mockUsersService._createUserWithRole.mockResolvedValue('influencer');

			const result = await influencerService.createInfluencer(createInfluencerDto);
			expect(usersService._createUserWithRole).toHaveBeenCalledWith(ROLE.INFLUENCER, createInfluencerDto);
			expect(result).toEqual('influencer');
		});

		it('should throw an error if user creation fails', async () => {
			const createInfluencerDto = getCreateInfluencerDto();

			mockUsersService._createUserWithRole.mockRejectedValue(new Error('User creation failed'));

			await expect(influencerService.createInfluencer(createInfluencerDto)).rejects.toThrow('User creation failed');
		});
	});

	describe('updateInfluencer', () => {
		it('should update a influencer successfully', async () => {
			const updateInfluencerDto = getUpdateInfluencerDto();

			mockUsersService._updateUser.mockResolvedValue('updatedInfluencer');

			const result = await influencerService.updateInfluencer('influencerId', updateInfluencerDto);
			expect(usersService._updateUser).toHaveBeenCalledWith('influencerId', updateInfluencerDto);
			expect(result).toEqual('updatedInfluencer');
		});

		it('should throw an error if user update fails', async () => {
			const updateInfluencerDto = getUpdateInfluencerDto();

			mockUsersService._updateUser.mockRejectedValue(new Error('User update failed'));

			await expect(influencerService.updateInfluencer('influencerId', updateInfluencerDto)).rejects.toThrow('User update failed');
		});
	});

	describe('findInfluencer', () => {
		it('should return a influencer by id', async () => {
			mockUsersService._findOneUser.mockResolvedValue('influencer');

			const result = await influencerService.findInfluencer('influencerId');
			expect(usersService._findOneUser).toHaveBeenCalledWith('influencerId');
			expect(result).toEqual('influencer');
		});

		it('should throw an error if user is not found', async () => {
			mockUsersService._findOneUser.mockRejectedValue(new UserNotFoundException());

			await expect(influencerService.findInfluencer('influencerId')).rejects.toThrow(UserNotFoundException);
		});
	});

	describe('findAllInfluencer', () => {
		it('should return all influencers', async () => {
			mockUsersService._findAllUsersByRole.mockResolvedValue(['influencer1', 'influencer2']);

			const result = await influencerService.findAllInfluencer();
			expect(usersService._findAllUsersByRole).toHaveBeenCalledWith(ROLE.INFLUENCER);
			expect(result).toEqual(['influencer1', 'influencer2']);
		});
	});

	describe('removeInfluencer', () => {
		it('should remove a influencer by id', async () => {
			mockUsersService._removeUser.mockResolvedValue('Deleted successfully');

			const result = await influencerService.removeInfluencer('influencerId');
			expect(usersService._removeUser).toHaveBeenCalledWith('influencerId');
			expect(result).toEqual('Deleted successfully');
		});

		it('should throw an error if removal fails', async () => {
			mockUsersService._removeUser.mockRejectedValue(new Error('User removal failed'));

			await expect(influencerService.removeInfluencer('influencerId')).rejects.toThrow('User removal failed');
		});
	});
});
