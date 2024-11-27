import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { USERS_PATTERN } from '@app/contract/users/pattern/users.pattern';
import { RegisterAuthDto } from '@app/contract/auth/dto/register.auth.dto';
import { CreateUserDto } from '@app/contract/users/dto/create.user.dto';
import { UpdateUserDto } from '@app/contract/users/dto/update.user.dto';

@Controller()
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@MessagePattern(USERS_PATTERN.REGISTER)
	/**
	 * Handles user registration.
	 * @param {RegisterAuthDto} registerAuthDto - The registration details.
	 * @returns The newly created user.
	 */
	register(@Payload() registerAuthDto: RegisterAuthDto) {
		return this.usersService.register(registerAuthDto);
	}

	@MessagePattern(USERS_PATTERN.CREATE)
	/**
	 * Retrieves a single user by usrname.
	 * @param {string} username - The username of the user.
	 * @returns The details of the user.
	 */
	createUser(@Payload() createUserDto: CreateUserDto) {
		return this.usersService.createUser(createUserDto);
	}

	@MessagePattern(USERS_PATTERN.FIND_ALL)
	/**
	 * Retrieves all users.
	 * @returns An array of all users.
	 */
	findAllUsers() {
		return this.usersService.findAllUsers();
	}

	@MessagePattern(USERS_PATTERN.FIND_ONE)
	/**
	 * Retrieves a single user by ID.
	 * @param {number} id - The ID of the user.
	 * @returns The details of the user with the specified ID.
	 */
	findOne(@Payload() id: string) {
		return this.usersService.findOne(id);
	}

	@MessagePattern(USERS_PATTERN.FIND_USER)
	/*************  ✨ Codeium Command ⭐  *************/
	/**
	 * Find a user by ID.
	 * @param id The ID of the user to find.
	 * @returns The user with the given ID.
	 */
	/******  ce111534-0e8d-4897-a14e-e38ef9b49ae3  *******/
	findUser(@Payload() id: string) {
		return this.usersService.findUser(id);
	}

	@MessagePattern(USERS_PATTERN.UPDATE)
	/**
	 * Updates a user by ID.
	 * @param {string} id - The ID of the user to update.
	 * @param {UpdateUserDto} updateUserDto - The updated user data.
	 * @returns The updated user.
	 */
	updateUser(@Payload() data: { id: string; dto: UpdateUserDto }) {
		return this.usersService.updateUser(data.id, data.dto);
	}

	@MessagePattern(USERS_PATTERN.REMOVE)
	/**
	 * Removes a user by ID.
	 * @param {string} id - The ID of the user to remove.
	 * @returns The deleted user.
	 */
	removeUser(@Payload() id: string) {
		return this.usersService.removeUser(id);
	}

	@MessagePattern(USERS_PATTERN.FIND_BY_USERNAME)
	/**
	 * Retrieves a single user by username.
	 * @param {string} username - The username of the user.
	 * @returns The details of the user with the specified username.
	 */
	findByUserName(@Payload() username: string) {
		return this.usersService.findByUserName(username);
	}
	@MessagePattern(USERS_PATTERN.RESET_PASSWORD)
	/**
	 * Resets the password of a user.
	 * @param {object} dto - An object that contains the user ID and new password.
	 * @returns The user with the updated password.
	 */
	resetPassword(@Payload() dto: any) {
		return this.usersService.resetPassword(dto);
	}
}
