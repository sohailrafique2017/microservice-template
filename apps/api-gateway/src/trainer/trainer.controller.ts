import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { CreateTrainerDto } from '@app/contract/users/dto/create.trainer.dto';
import { UpdateTrainerDto } from '@app/contract/users/dto/update.trainer.dto';
import { CONSTANTS } from '@app/api-gateway/utils/constant';
import { API_VERSION } from '@app/common/enums';
import { ROLE } from '@app/database/enums';
import { RequirePermisison } from '@app/api-gateway/auth/decorators/role.decorator';
import { JwtAuthGuard } from '@app/api-gateway/auth/guards/jwt.guard';
import { RolesGuard } from '@app/api-gateway/auth/guards/role.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags(CONSTANTS.TRAINER_CONTROLLER)
@Controller({ path: CONSTANTS.TRAINER_CONTROLLER, version: API_VERSION.V1 })
export class TrainerController {
	constructor(private readonly trainerService: TrainerService) {}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Post()
	/**
	 * Creates a new trainer.
	 * @param {CreateTrainerDto} createTrainerDto - The trainer data to create a new trainer.
	 * @returns {Promise<TrainerEntity>} - The created trainer.
	 */
	create(@Body() createTrainerDto: CreateTrainerDto) {
		return this.trainerService.create(createTrainerDto);
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Get()
	/**
	 * Retrieves all trainers.
	 * @returns A list of all trainers.
	 */
	findAll() {
		return this.trainerService.findAll();
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Get(':id')
	/**
	 * Finds a trainer by ID.
	 * @param {string} id - The ID of the trainer to find.
	 * @returns {Promise<TrainerEntity>} - The trainer with the given ID.
	 */
	findOne(@Param('id') id: string) {
		return this.trainerService.findOne(id);
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Patch(':id')
	/**
	 * Updates a trainer by ID.
	 * @param {string} id - The ID of the trainer to update.
	 * @param {UpdateTrainerDto} updateTrainerDto - The updated trainer data.
	 * @returns {Promise<void>} - A promise that resolves when the trainer is updated.
	 */
	update(@Param('id') id: string, @Body() updateTrainerDto: UpdateTrainerDto) {
		return this.trainerService.update(id, updateTrainerDto);
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Delete(':id')
	/**
	 * Deletes a trainer by ID.
	 * @param {string} id - The ID of the trainer to delete.
	 * @returns {Promise<void>} - A promise that resolves when the trainer is deleted.
	 */
	remove(@Param('id') id: string) {
		return this.trainerService.remove(id);
	}
}
