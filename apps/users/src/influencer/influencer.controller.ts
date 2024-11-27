import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InfluencerService } from './influencer.service';
import { CreateInfluencerDto } from '@app/contract/users/dto/create.influencer.dto';
import { UpdateInfluencerDto } from '@app/contract/users/dto/update.influencer.dto';
import { USERS_PATTERN } from '@app/contract/users/pattern/users.pattern';

@Controller()
export class InfluencerController {
	constructor(private readonly influencerService: InfluencerService) {}

	@MessagePattern(USERS_PATTERN.CREATE_INFLUENCER)
	/**
	 * Creates a new influencer.
	 * @param {CreateInfluencerDto} createInfluencerDto - The data to create the influencer.
	 * @returns {Promise<UserEntity>} - The created influencer.
	 */
	createInfluencer(@Payload() createInfluencerDto: CreateInfluencerDto) {
		return this.influencerService.createInfluencer(createInfluencerDto);
	}

	@MessagePattern(USERS_PATTERN.FIND_ALL_INFLUENCER)
	/**
	 * Retrieves all influencers.
	 * @returns A list of all influencers.
	 */
	findAllInfluencer() {
		return this.influencerService.findAllInfluencer();
	}

	@MessagePattern(USERS_PATTERN.REMOVE_INFLUENCER)
	/**
	 * Removes an influencer by ID.
	 * @param {string} id - The ID of the influencer to remove.
	 * @returns A promise that resolves when the influencer is removed.
	 */
	removeInfluencer(@Payload() id: string) {
		return this.influencerService.removeInfluencer(id);
	}

	@MessagePattern(USERS_PATTERN.FIND_ONE_INFLUENCER)
	/**
	 * Retrieves a single influencer by ID.
	 * @param {string} id - The ID of the influencer to find.
	 * @returns The influencer with the specified ID.
	 */
	findInfluencer(@Payload() id: string) {
		return this.influencerService.findInfluencer(id);
	}

	@MessagePattern(USERS_PATTERN.UPDATE_INFLUENCER)
	/**
	 * Updates an influencer by ID.
	 * @param {string} id - The ID of the influencer to update.
	 * @param {UpdateInfluencerDto} dto - The updated data for the influencer.
	 * @returns The updated influencer.
	 */
	updateInfluencer(@Payload() data: { id: string; dto: UpdateInfluencerDto }) {
		return this.influencerService.updateInfluencer(data.id, data.dto);
	}
}
