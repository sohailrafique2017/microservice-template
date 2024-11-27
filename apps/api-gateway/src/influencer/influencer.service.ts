import { Inject, Injectable } from '@nestjs/common';
import { USERS_CLIENT } from '@app/contract/constant';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateInfluencerDto } from '@app/contract/users/dto/update.influencer.dto';
import { CreateInfluencerDto } from '@app/contract/users/dto/create.influencer.dto';
import { USERS_PATTERN } from '@app/contract/users/pattern/users.pattern';

@Injectable()
export class InfluencerService {
	constructor(@Inject(USERS_CLIENT) private readonly authClient: ClientProxy) {}

	/**
	 * Creates a new influencer.
	 * @param createInfluencerDto The influencer data to create.
	 * @returns The newly created influencer.
	 */
	create(createInfluencerDto: CreateInfluencerDto) {
		return this.authClient.send(USERS_PATTERN.CREATE_INFLUENCER, createInfluencerDto);
	}

	/**
	 * Retrieves all influencers.
	 * @returns A list of all influencers.
	 */
	findAll() {
		return this.authClient.send(USERS_PATTERN.FIND_ALL_INFLUENCER, {});
	}

	/**
	 * Finds an influencer by ID.
	 * @param id The unique identifier of the influencer.
	 * @returns A promise that resolves to the influencer with the given ID.
	 */
	findOne(id: string) {
		return this.authClient.send(USERS_PATTERN.FIND_ONE_INFLUENCER, id);
	}

	/**
	 * Updates an influencer.
	 * @param id The unique identifier of the influencer to update.
	 * @param updateInfluencerDto The updated influencer data.
	 * @returns The updated influencer.
	 */
	update(id: string, updateInfluencerDto: UpdateInfluencerDto) {
		return this.authClient.send(USERS_PATTERN.UPDATE_INFLUENCER, {
			id,
			dto: updateInfluencerDto,
		});
	}

	/**
	 * Removes an influencer by ID.
	 * @param id The unique identifier of the influencer to remove.
	 * @returns A promise that resolves to the deletion result.
	 */
	remove(id: string) {
		return this.authClient.send(USERS_PATTERN.REMOVE_INFLUENCER, id);
	}
}
