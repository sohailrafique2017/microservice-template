import { USERS_CLIENT } from '@app/contract/constant';
import { CreateUserDto } from '@app/contract/users/dto/create.user.dto';
import { UpdateUserDto } from '@app/contract/users/dto/update.user.dto';
import { USERS_PATTERN } from '@app/contract/users/pattern/users.pattern';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
	constructor(@Inject(USERS_CLIENT) private readonly authClient: ClientProxy) {}
	/**
	 * Creates a new user.
	 * @param createUserDto The user data to create.
	 * @returns The newly created user.
	 */
	create(createUserDto: CreateUserDto) {
		return this.authClient.send(USERS_PATTERN.CREATE, createUserDto);
	}

	/**
	 * Finds all users.
	 * @returns All users.
	 */
	findAll() {
		return this.authClient.send(USERS_PATTERN.FIND_ALL, {});
	}

	/**
	 * Finds a user by ID.
	 * @param id The unique identifier of the user.
	 * @returns An observable of the user data.
	 */
	findOne(id: string) {
		return this.authClient.send(USERS_PATTERN.FIND_USER, id);
	}

	/**
	 * Updates a user.
	 * @param id The unique identifier of the user to update.
	 * @param updateUserDto The user data to update the user.
	 * @returns The updated user.
	 */
	update(id: string, updateUserDto: UpdateUserDto) {
		return this.authClient.send(USERS_PATTERN.UPDATE, {
			id,
			dto: updateUserDto,
		});
	}

	/**
	 * Deletes a user.
	 * @param id The unique identifier of the user to delete.
	 * @returns An observable of the deletion result.
	 */
	remove(id: string) {
		return this.authClient.send(USERS_PATTERN.REMOVE, id);
	}
}
