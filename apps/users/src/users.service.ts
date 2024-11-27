import { RoleNotFoundException } from '@app/common/expceptions/role.notfound.exception';
import { UserNotFoundException } from '@app/common/expceptions/user.notfound.exception';
import { RegisterAuthDto } from '@app/contract/auth/dto/register.auth.dto';
import { CreateUserDto } from '@app/contract/users/dto/create.user.dto';
import { UpdateUserDto } from '@app/contract/users/dto/update.user.dto';
import { RoleEntity } from '@app/database/entities/role.entity';
import { UserEntity } from '@app/database/entities/user.entity';
import { ROLE } from '@app/database/enums';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Equal, Repository } from 'typeorm';
@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		@InjectRepository(RoleEntity)
		private readonly roleRepository: Repository<RoleEntity>,
	) {}

	/**
	 * Registers a new user.
	 * @param createUserDto The user data to register.
	 * @returns A message indicating the success of the registration.
	 */
	async register(createUserDto: RegisterAuthDto) {
		try {
			const isUserExist = await this.userRepository.findOne({ where: { email: createUserDto.email } });
			if (isUserExist) {
				throw new RpcException('User already exist');
			}
			const role = await this.roleRepository.findOne({ where: { name: createUserDto.role } });
			if (!role) {
				throw new RoleNotFoundException();
			}
			const user = new UserEntity();
			user.password = bcrypt.hashSync(createUserDto.password, 10);
			user.username = createUserDto.username;
			user.email = createUserDto.email;
			user.role = role;
			await this.userRepository.save(user);
			return 'User created successfully';
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Creates a new user.
	 * @param createUserDto The user data to create.
	 * @returns The newly created user without the password.
	 */
	async createUser(createUserDto: CreateUserDto) {
		try {
			const user = await this._createUserWithRole(ROLE.BUYER, createUserDto);
			return user;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Updates a user by ID.
	 * @param {string} id - The unique identifier of the user to update.
	 * @param {UpdateUserDto} updateUserDto - The updated user data.
	 * @returns The updated user entity.
	 */
	async updateUser(id: string, updateUserDto: UpdateUserDto) {
		try {
			// Find the user by ID
			const updateUser = this._updateUser(id, updateUserDto);
			return updateUser;
		} catch (error) {
			throw error;
		}
	}
	/**
	 * Return all users.
	 * @returns An array of all users.
	 */
	async findAllUsers() {
		try {
			return await this._findAllUsersByRole(ROLE.BUYER);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Find a user by their username.
	 * @param emailOrUsername The email or username of the user to find.
	 * @returns The user with the given username, or undefined if no user is found.
	 */
	async findByUserName(emailOrUsername: string) {
		try {
			const user = await this.userRepository.findOne({
				where: [{ email: emailOrUsername }, { username: emailOrUsername }],
			});
			if (!user) {
				throw new UserNotFoundException();
			}
			return user;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Reset the password of a user with the given ID.
	 * @param dto An object with the user ID and new password.
	 * @returns The user with the updated password, or throw an RpcException if the user is not found or the new password is the same as the old password.
	 */
	async resetPassword(dto) {
		try {
			const user = await this.userRepository.findOne({
				where: {
					id: dto.id,
				},
			});
			if (!user) {
				throw new UserNotFoundException();
			}
			// Compare the old password and new password to make sure they are different
			const isSamePassword = bcrypt.compareSync(dto.newPassword, user.password);
			if (isSamePassword) {
				throw new RpcException('New password cannot be the same as the old password');
			}

			user.password = bcrypt.hashSync(dto.newPassword, 10);
			const updatedUser = await this.userRepository.save(user);
			delete updatedUser.password;
			return updatedUser;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Find a user by ID.
	 * @param id The ID of the user to find.
	 * @returns The user with the given ID, or undefined if no user is found.
	 */
	async findOne(id: string) {
		try {
			const user = await this.userRepository.findOne({
				where: { id: Equal(id) },
				relations: ['role'],
			});
			if (!user) {
				throw new UserNotFoundException();
			}
			return user;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Finds a user by ID and returns the user without their password.
	 * @param id The ID of the user to find.
	 * @returns The user with the given ID, or throw an RpcException if the user is not found.
	 */
	async findUser(id: string) {
		try {
			return await this._findOneUser(id);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Removes a user by ID.
	 * @param id The ID of the user to remove.
	 * @returns 'Deleted successfully' if the user is successfully removed, otherwise throws an RpcException with the error message.
	 */
	async removeUser(id: string) {
		try {
			return await this._removeUser(id);
		} catch (error) {
			throw error; // Throw any errors to be handled by the RPC layererror;
		}
	}
	/**
	 * Finds a user by ID and returns the user without their password.
	 * @param id The ID of the user to find.
	 * @returns The user with the given ID, or throw an RpcException if the user is not found.
	 * @throws {UserNotFoundException} If the user is not found.
	 * @private
	 */
	async _findOneUser(id: string) {
		const user = await this.userRepository.findOne({
			where: { id: Equal(id) },
			relations: ['role'],
		});
		if (!user) {
			throw new UserNotFoundException();
		}
		delete user.password;
		return user;
	}
	/**
	 * Creates a new user with the specified role.
	 *
	 * @param roleName The role name for the new user.
	 * @param dto The data transfer object containing user details.
	 * @returns The newly created user without the password.
	 * @throws {RpcException} If the user already exists.
	 * @throws {RoleNotFoundException} If the specified role is not found.
	 */
	async _createUserWithRole<T extends CreateUserDto>(roleName: ROLE, dto: T) {
		const isUserExist = await this.userRepository.findOne({ where: [{ email: dto.email }, { username: dto.username }] });
		if (isUserExist) {
			throw new RpcException('User already exist');
		}
		const role = await this.roleRepository.findOne({ where: { name: roleName } });
		if (!role) {
			throw new RoleNotFoundException();
		}
		const user = new UserEntity();
		user.password = bcrypt.hashSync(dto.password, 10);
		user.username = dto.username;
		user.email = dto.email;
		user.firstName = dto.firstName;
		user.lastName = dto.lastName;
		user.dob = new Date(dto.dob);
		user.mobileNumber = dto.mobileNumber;
		user.role = role;
		const updateUser = await this.userRepository.save(user);
		delete updateUser.password;
		return updateUser;
	}

	/**
	 * Updates a user with the specified ID.
	 *
	 * @param id The ID of the user to update.
	 * @param updateUserDto The data transfer object containing the updated user details.
	 * @returns The updated user entity without the password.
	 * @throws {UserNotFoundException} If the user is not found.
	 * @throws {RoleNotFoundException} If the specified role in the DTO is not found.
	 */
	async _updateUser<T extends UpdateUserDto>(id: string, updateUserDto: T) {
		// Find the user by ID
		const user = await this.userRepository.findOne({ where: { id: id }, relations: ['role'] });
		if (!user) {
			throw new UserNotFoundException();
		}
		// Update user properties

		if (updateUserDto.dob) {
			user.dob = new Date(updateUserDto.dob);
		}
		if (updateUserDto.mobileNumber) {
			user.mobileNumber = updateUserDto.mobileNumber;
		}
		if (updateUserDto.firstName) {
			user.firstName = updateUserDto.firstName;
		}
		if (updateUserDto.lastName) {
			user.lastName = updateUserDto.lastName;
		}
		if (updateUserDto.gender) {
			user.gender = updateUserDto.gender;
		}
		// Save the updated user entity
		const upatedUser = await this.userRepository.save(user);
		delete upatedUser.password;
		return upatedUser; // Return the updated user entity
	}

	/**
	 * Removes a user with the specified ID.
	 *
	 * @param id The ID of the user to remove.
	 * @returns A message indicating the deletion result.
	 * @throws {UserNotFoundException} If the user is not found.
	 */
	async _removeUser(id: string) {
		const user = await this.userRepository.findOne({
			where: {
				id,
			},
		});
		if (!user) {
			throw new UserNotFoundException();
		}
		await this.userRepository.delete(user.id);
		return 'Deleted successfully';
	}
	/**
	 * Finds all users with the given role.
	 *
	 * @param role The role of users to find.
	 * @returns An array of user objects, with the password field removed.
	 */
	async _findAllUsersByRole(role: ROLE) {
		const users = await this.userRepository.find({
			where: {
				role: {
					name: role,
				},
			},
			relations: {
				role: true,
			},
		});
		users.map(user => delete user.password);
		return users;
	}
}
