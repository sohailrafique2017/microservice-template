import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TrainerService } from './trainer.service';
import { CreateTrainerDto } from '@app/contract/users/dto/create.trainer.dto';
import { UpdateTrainerDto } from '@app/contract/users/dto/update.trainer.dto';
import { USERS_PATTERN } from '@app/contract/users/pattern/users.pattern';

@Controller()
export class TrainerController {
	constructor(private readonly trainerService: TrainerService) {}

	@MessagePattern(USERS_PATTERN.CREATE_TRAINER)
	/**
	 * Creates a new trainer.
	 * @param {CreateTrainerDto} createTrainerDto - The data to create the trainer.
	 * @returns {Promise<UserEntity>} - The created trainer.
	 */
	createTrainer(@Payload() createTrainerDto: CreateTrainerDto) {
		return this.trainerService.createTrainer(createTrainerDto);
	}

	@MessagePattern(USERS_PATTERN.FIND_ALL_TRAINER)
	/**
	 * Retrieves all trainers.
	 * @returns A list of all trainers.
	 */
	findAllTrainer() {
		return this.trainerService.findAllTrainer();
	}

	@MessagePattern(USERS_PATTERN.REMOVE_TRAINER)
	/**
	 * Removes an trainer by ID.
	 * @param {string} id - The ID of the trainer to remove.
	 * @returns A promise that resolves when the trainer is removed.
	 */
	removeTrainer(@Payload() id: string) {
		return this.trainerService.removeTrainer(id);
	}

	@MessagePattern(USERS_PATTERN.FIND_ONE_TRAINER)
	/**
	 * Retrieves a single trainer by ID.
	 * @param {string} id - The ID of the trainer to find.
	 * @returns The trainer with the specified ID.
	 */
	findTrainer(@Payload() id: string) {
		return this.trainerService.findTrainer(id);
	}

	@MessagePattern(USERS_PATTERN.UPDATE_TRAINER)
	/**
	 * Updates an trainer by ID.
	 * @param {string} id - The ID of the trainer to update.
	 * @param {UpdateTrainerDto} dto - The updated data for the trainer.
	 * @returns The updated trainer.
	 */
	updateTrainer(@Payload() data: { id: string; dto: UpdateTrainerDto }) {
		return this.trainerService.updateTrainer(data.id, data.dto);
	}
}
