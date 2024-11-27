import { CreateTrainerDto } from '@app/contract/users/dto/create.trainer.dto';
import { Injectable } from '@nestjs/common';
import { UpdateTrainerDto } from '@app/contract/users/dto/update.trainer.dto';
import { ROLE } from '@app/database/enums';
import { RpcException } from '@nestjs/microservices';
import { UsersService } from '@app/users/users.service';

@Injectable()
export class TrainerService {
	constructor(private readonly usersService: UsersService) {}

	/**
	 * Creates a new trainer.
	 * @param {CreateTrainerDto} createTrainerDto - The data to create the trainer.
	 * @returns {Promise<UserEntity>} - The created trainer.
	 */
	async createTrainer(createTrainerDto: CreateTrainerDto) {
		try {
			const trainer = await this.usersService._createUserWithRole(ROLE.TRAINER, createTrainerDto);
			return trainer;
		} catch (error) {
			throw new RpcException(error.message);
		}
	}
	/**
	 * Updates a trainer by ID.
	 * @param {string} id - The ID of the trainer to update.
	 * @param {UpdateTrainerDto} updateTrainerDto - The updated data for the trainer.
	 * @returns {Promise<UserEntity>} - The updated trainer.
	 */
	async updateTrainer(id: string, updateTrainerDto: UpdateTrainerDto) {
		try {
			// Find the user by ID
			const updateUser = this.usersService._updateUser(id, updateTrainerDto);
			return updateUser;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Finds a trainer by ID.
	 * @param {string} id - The ID of the trainer to find.
	 * @returns {Promise<UserEntity>} - The trainer with the given ID.
	 * @throws {UserNotFoundException} If the trainer is not found.
	 */
	async findTrainer(id: string) {
		try {
			return await this.usersService._findOneUser(id);
		} catch (error) {
			throw error;
		}
	}
	async findAllTrainer() {
		try {
			const trainers = await this.usersService._findAllUsersByRole(ROLE.TRAINER);
			return trainers;
		} catch (error) {
			throw error;
		}
	}
	/**
	 * Removes a trainer by ID.
	 * @param {string} id - The ID of the trainer to remove.
	 * @returns {Promise<void>} - A promise that resolves when the trainer is removed.
	 * @throws {RpcException} If the trainer is not found or if the removal fails.
	 */
	async removeTrainer(id: string) {
		try {
			return await this.usersService._removeUser(id);
		} catch (error) {
			throw error; // Throw any errors to be handled by the RPC layererror;
		}
	}
}
