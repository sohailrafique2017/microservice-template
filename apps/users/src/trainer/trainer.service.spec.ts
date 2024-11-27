import { Test, TestingModule } from '@nestjs/testing';
import { ROLE } from '@app/database/enums';
import { UserNotFoundException } from '@app/common/expceptions/user.notfound.exception';
import { TrainerService } from './trainer.service';
import { UsersService } from '@app/users/users.service';
import { getCreateTrainerDto, getUpdateTrainerDto } from '@app/users/utils/test';
describe('TrainerService', () => {
	// Declare a variable to hold an instance of the TrainerService
	let trainerService: TrainerService;
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
			providers: [TrainerService, { provide: UsersService, useValue: mockUsersService }],
		}).compile();

		trainerService = module.get<TrainerService>(TrainerService);
		usersService = module.get<UsersService>(UsersService);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});
	describe('createTrainer', () => {
		it('should create a trainer successfully', async () => {
			const createTrainerDto = getCreateTrainerDto();
			mockUsersService._createUserWithRole.mockResolvedValue('trainer');

			const result = await trainerService.createTrainer(createTrainerDto);
			expect(usersService._createUserWithRole).toHaveBeenCalledWith(ROLE.TRAINER, createTrainerDto);
			expect(result).toEqual('trainer');
		});

		it('should throw an error if user creation fails', async () => {
			const createTrainerDto = getCreateTrainerDto();

			mockUsersService._createUserWithRole.mockRejectedValue(new Error('User creation failed'));

			await expect(trainerService.createTrainer(createTrainerDto)).rejects.toThrow('User creation failed');
		});
	});

	describe('updateTrainer', () => {
		it('should update a trainer successfully', async () => {
			const updateTrainerDto = getUpdateTrainerDto();

			mockUsersService._updateUser.mockResolvedValue('updatedTrainer');

			const result = await trainerService.updateTrainer('trainerId', updateTrainerDto);
			expect(usersService._updateUser).toHaveBeenCalledWith('trainerId', updateTrainerDto);
			expect(result).toEqual('updatedTrainer');
		});

		it('should throw an error if user update fails', async () => {
			const updateTrainerDto = getUpdateTrainerDto();

			mockUsersService._updateUser.mockRejectedValue(new Error('User update failed'));

			await expect(trainerService.updateTrainer('trainerId', updateTrainerDto)).rejects.toThrow('User update failed');
		});
	});

	describe('findTrainer', () => {
		it('should return a trainer by id', async () => {
			mockUsersService._findOneUser.mockResolvedValue('trainer');

			const result = await trainerService.findTrainer('trainerId');
			expect(usersService._findOneUser).toHaveBeenCalledWith('trainerId');
			expect(result).toEqual('trainer');
		});

		it('should throw an error if user is not found', async () => {
			mockUsersService._findOneUser.mockRejectedValue(new UserNotFoundException());

			await expect(trainerService.findTrainer('trainerId')).rejects.toThrow(UserNotFoundException);
		});
	});

	describe('findAllTrainer', () => {
		it('should return all trainers', async () => {
			mockUsersService._findAllUsersByRole.mockResolvedValue(['trainer1', 'trainer2']);

			const result = await trainerService.findAllTrainer();
			expect(usersService._findAllUsersByRole).toHaveBeenCalledWith(ROLE.TRAINER);
			expect(result).toEqual(['trainer1', 'trainer2']);
		});
	});

	describe('removeTrainer', () => {
		it('should remove a trainer by id', async () => {
			mockUsersService._removeUser.mockResolvedValue('Deleted successfully');

			const result = await trainerService.removeTrainer('trainerId');
			expect(usersService._removeUser).toHaveBeenCalledWith('trainerId');
			expect(result).toEqual('Deleted successfully');
		});

		it('should throw an error if removal fails', async () => {
			mockUsersService._removeUser.mockRejectedValue(new Error('User removal failed'));

			await expect(trainerService.removeTrainer('trainerId')).rejects.toThrow('User removal failed');
		});
	});
});
