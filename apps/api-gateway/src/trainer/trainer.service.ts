import { CreateTrainerDto } from '@app/contract/users/dto/create.trainer.dto';
import { UpdateTrainerDto } from '@app/contract/users/dto/update.trainer.dto';
import { Inject, Injectable } from '@nestjs/common';

import { USERS_CLIENT } from '@app/contract/constant';
import { ClientProxy } from '@nestjs/microservices';

import { USERS_PATTERN } from '@app/contract/users/pattern/users.pattern';

@Injectable()
export class TrainerService {
	constructor(@Inject(USERS_CLIENT) private readonly authClient: ClientProxy) {}

	/**
	 * Creates a new trainer.
	 * @param {CreateTrainerDto} createTrainerDto - The trainer data to create a new trainer.
	 * @returns   The newly created trainer.
	 */
	create(createTrainerDto: CreateTrainerDto) {
		return this.authClient.send(USERS_PATTERN.CREATE_TRAINER, createTrainerDto);
	}

	/**
	 * Retrieves all trainers.
	 * @returns A list of all trainers.
	 */
	findAll() {
		return this.authClient.send(USERS_PATTERN.FIND_ALL_TRAINER, {});
	}

	/**
	 * Finds a trainer by ID.
	 * @param {number} id - The ID of the trainer to find.
	 * @returns A promise that resolves to the trainer with the given ID.
	 */
	findOne(id: string) {
		return this.authClient.send(USERS_PATTERN.FIND_ONE_TRAINER, id);
	}

	/**
	 * Updates a trainer by ID.
	 * @param {number} id - The ID of the trainer to update.
	 * @param {UpdateTrainerDto} updateTrainerDto - The updated trainer data.
	 * @returns A promise that resolves to the update result.
	 */
	update(id: string, updateTrainerDto: UpdateTrainerDto) {
		return this.authClient.send(USERS_PATTERN.UPDATE_TRAINER, {
			id,
			dto: updateTrainerDto,
		});
	}

	/**
	 * Deletes a trainer.
	 * @param id The unique identifier of the trainer to delete.
	 * @returns A promise that resolves to the deletion result.
	 */
	remove(id: string) {
		return this.authClient.send(USERS_PATTERN.REMOVE_TRAINER, id);
	}
}
