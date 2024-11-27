import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserEntity } from '@app/database/entities/user.entity';
import { RoleEntity } from '@app/database/entities/role.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { RpcException } from '@nestjs/microservices';
import { RoleNotFoundException } from '@app/common/expceptions/role.notfound.exception';
import { Repository } from 'typeorm';
import { ROLE } from '@app/database/enums';
import { getCreateUserDto, getfindByUserNameDto, getMockUserDto, getRegisterUserDto, getResetPasswordMockUser, getResetPasswordUserDto, getUpdateUserDto } from './utils/test';
import { UserNotFoundException } from '@app/common/expceptions/user.notfound.exception';
describe('UsersService', () => {
	// Declare a variable to hold an instance of the UsersService
	let service: UsersService;

	// Declare a variable for the user repository, which is responsible for database operations related to UserEntity
	let userRepository: Repository<UserEntity>;

	// Declare a variable for the role repository, which is responsible for database operations related to RoleEntity
	let roleRepository: Repository<RoleEntity>;
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: getRepositoryToken(UserEntity),
					useClass: Repository,
				},
				{
					provide: getRepositoryToken(RoleEntity),
					useClass: Repository,
				},
			],
		}).compile();

		// Obtain an instance of the UsersService from the testing module
		service = module.get<UsersService>(UsersService);

		// Obtain the user repository instance for database operations related to UserEntity
		userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));

		// Obtain the role repository instance for database operations related to RoleEntity
		roleRepository = module.get<Repository<RoleEntity>>(getRepositoryToken(RoleEntity));
	});
	describe('register', () => {
		it('should register a new user successfully', async () => {
			const registerDto = getRegisterUserDto(ROLE.BUYER);

			jest.spyOn(userRepository, 'findOne').mockResolvedValue(null); // No existing user
			jest.spyOn(roleRepository, 'findOne').mockResolvedValue({ id: 1, name: ROLE.BUYER } as unknown as RoleEntity); // Role found
			jest.spyOn(bcrypt, 'hashSync').mockReturnValue('hashedPassword'); // Mock password hashing
			jest.spyOn(userRepository, 'save').mockResolvedValue({ id: '1', ...registerDto, password: 'hashedPassword' } as UserEntity);

			const result = await service.register(registerDto);

			expect(result).toEqual('User created successfully');
			expect(userRepository.save).toHaveBeenCalledWith(
				expect.objectContaining({
					username: registerDto.username,
					email: registerDto.email,
					password: 'hashedPassword', // Expect the hashed password
					role: expect.objectContaining({
						name: ROLE.BUYER,
					}),
				}),
			);
		});

		it('should throw an error if the user already exists', async () => {
			const registerDto = getRegisterUserDto(ROLE.BUYER);

			jest.spyOn(userRepository, 'findOne').mockResolvedValue({ id: '1', email: registerDto.email } as UserEntity);

			await expect(service.register(registerDto)).rejects.toThrow(RpcException);
		});

		it('should throw an error if the role does not exist', async () => {
			const registerDto = getRegisterUserDto('none');

			jest.spyOn(userRepository, 'findOne').mockResolvedValue(null); // No existing user
			jest.spyOn(roleRepository, 'findOne').mockResolvedValue(null); // Role not found

			await expect(service.register(registerDto)).rejects.toThrow(RoleNotFoundException);
		});
	});

	describe('findByUserName', () => {
		it('should return the user by email or username', async () => {
			const mockUser = getfindByUserNameDto();
			jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser as UserEntity);

			const result = await service.findByUserName(mockUser.username);
			expect(result).toEqual(mockUser);
		});

		it('should throw an error if the user is not found', async () => {
			jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

			await expect(service.findByUserName('nonexistent')).rejects.toThrow(UserNotFoundException);
		});
	});

	describe('resetPassword', () => {
		it('should reset the user password successfully', async () => {
			const dto = getResetPasswordUserDto();
			const mockUser = getResetPasswordMockUser();

			jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser as UserEntity);
			jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false); // Passwords are different
			jest.spyOn(bcrypt, 'hashSync').mockReturnValue('hashedNewPassword');
			jest.spyOn(userRepository, 'save').mockResolvedValue({ ...mockUser, password: 'hashedNewPassword' } as UserEntity);

			const result = await service.resetPassword(dto);
			expect(result).toEqual(
				expect.objectContaining({
					id: dto.id,
				}),
			);
			expect(userRepository.save).toHaveBeenCalled();
		});

		it('should throw an error if the user is not found', async () => {
			const dto = { id: 999, newPassword: 'newpassword123' };

			jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

			await expect(service.resetPassword(dto)).rejects.toThrow(UserNotFoundException);
		});

		it('should throw an error if the new password is the same as the old password', async () => {
			const dto = { id: '1', newPassword: 'samepassword' };
			const mockUser = { id: '1', password: 'hashedSamePassword' };

			jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser as UserEntity);
			jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true); // Passwords are the same

			await expect(service.resetPassword(dto)).rejects.toThrow(RpcException);
		});
	});

	describe('findOne', () => {
		it('should return the user by ID', async () => {
			const mockUser = getfindByUserNameDto();

			jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser as UserEntity);

			const result = await service.findOne('1');
			expect(result).toEqual(mockUser);
		});

		it('should throw an error if the user is not found', async () => {
			jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

			await expect(service.findOne('999')).rejects.toThrow(UserNotFoundException);
		});
	});
	describe('createUser', () => {
		it('should create a new user successfully', async () => {
			const createUserDto = getCreateUserDto();
			jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
			jest.spyOn(roleRepository, 'findOne').mockResolvedValue({ id: 1, name: ROLE.BUYER } as unknown as RoleEntity);
			jest.spyOn(bcrypt, 'hashSync').mockReturnValue('hashedPassword');
			jest.spyOn(userRepository, 'save').mockResolvedValue({ id: '1', ...createUserDto, password: 'hashedPassword' } as unknown as UserEntity);

			const result = await service.createUser(createUserDto);

			expect(result).toEqual(expect.objectContaining({ id: '1', email: createUserDto.email }));
			expect(userRepository.save).toHaveBeenCalled();
		});

		it('should throw an error if the user already exists', async () => {
			const createUserDto = getCreateUserDto();
			jest.spyOn(userRepository, 'findOne').mockResolvedValue({ id: '1', email: createUserDto.email } as UserEntity);

			await expect(service.createUser(createUserDto)).rejects.toThrow(RpcException);
		});
	});

	describe('updateUser', () => {
		it('should update user details successfully', async () => {
			const updateUserDto = getUpdateUserDto();
			const mockUser = getMockUserDto();
			jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser as UserEntity);
			jest.spyOn(userRepository, 'save').mockResolvedValue({ ...mockUser, ...updateUserDto } as unknown as UserEntity);

			const result = await service.updateUser('1', updateUserDto);

			expect(result).toEqual(expect.objectContaining({ firstName: 'UpdatedName' }));
		});

		it('should throw an error if the user is not found', async () => {
			const updateUserDto = getUpdateUserDto();
			jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

			await expect(service.updateUser('999', updateUserDto)).rejects.toThrow(UserNotFoundException);
		});
	});

	describe('findAll', () => {
		it('should return an array of users', async () => {
			const mockUsers = [getfindByUserNameDto()];
			jest.spyOn(userRepository, 'find').mockResolvedValue(mockUsers as UserEntity[]);

			const result = await service.findAllUsers();

			expect(result).toEqual(expect.arrayContaining(mockUsers));
		});

		it('should return an empty array if no users are found', async () => {
			jest.spyOn(userRepository, 'find').mockResolvedValue([]);

			const result = await service.findAllUsers();

			expect(result).toEqual([]);
		});
	});

	describe('findUser', () => {
		it('should return the user by ID without password', async () => {
			const mockUser = getfindByUserNameDto();
			jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser as UserEntity);

			const result = await service.findUser('1');

			expect(result).toEqual(expect.objectContaining({ id: '1', email: mockUser.email }));
			expect(result.password).toBeUndefined();
		});

		it('should throw an error if the user is not found', async () => {
			jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

			await expect(service.findUser('999')).rejects.toThrow(UserNotFoundException);
		});
	});

	describe('removeUser', () => {
		it('should remove the user successfully', async () => {
			const mockUser = getfindByUserNameDto();
			jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser as UserEntity);
			jest.spyOn(userRepository, 'delete').mockResolvedValue({ affected: 1 } as any);

			const result = await service.removeUser('1');

			expect(result).toEqual('Deleted successfully');
			expect(userRepository.delete).toHaveBeenCalledWith('1');
		});

		it('should throw an error if the user is not found', async () => {
			jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

			await expect(service.removeUser('999')).rejects.toThrow(UserNotFoundException);
		});
	});
});
