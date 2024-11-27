import { CreateInfluencerDto } from '@app/contract/users/dto/create.influencer.dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from '@app/users/users.service';
import { UpdateInfluencerDto } from '@app/contract/users/dto/update.influencer.dto';
import { ROLE } from '@app/database/enums';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class InfluencerService {
	constructor(private readonly usersService: UsersService) {}

	/**
	 * Creates a new influencer.
	 * @param {CreateInfluencerDto} createInfluencerDto - The data to create the influencer.
	 * @returns {Promise<UserEntity>} - The created influencer.
	 */
	async createInfluencer(createInfluencerDto: CreateInfluencerDto) {
		try {
			const influencer = await this.usersService._createUserWithRole(ROLE.INFLUENCER, createInfluencerDto);
			return influencer;
		} catch (error) {
			throw new RpcException(error.message);
		}
	}
	/**
	 * Updates a influencer by ID.
	 * @param {string} id - The ID of the influencer to update.
	 * @param {UpdateInfluencerDto} updateInfluencerDto - The updated data for the influencer.
	 * @returns {Promise<UserEntity>} - The updated influencer.
	 */
	async updateInfluencer(id: string, updateInfluencerDto: UpdateInfluencerDto) {
		try {
			// Find the user by ID
			const updateUser = this.usersService._updateUser(id, updateInfluencerDto);
			return updateUser;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Finds a influencer by ID.
	 * @param {string} id - The ID of the influencer to find.
	 * @returns {Promise<UserEntity>} - The influencer with the given ID.
	 * @throws {UserNotFoundException} If the influencer is not found.
	 */
	async findInfluencer(id: string) {
		try {
			return await this.usersService._findOneUser(id);
		} catch (error) {
			throw error;
		}
	}
	async findAllInfluencer() {
		try {
			const influencers = await this.usersService._findAllUsersByRole(ROLE.INFLUENCER);
			return influencers;
		} catch (error) {
			throw error;
		}
	}
	/**
	 * Removes a influencer by ID.
	 * @param {string} id - The ID of the influencer to remove.
	 * @returns {Promise<void>} - A promise that resolves when the influencer is removed.
	 * @throws {RpcException} If the influencer is not found or if the removal fails.
	 */
	async removeInfluencer(id: string) {
		try {
			return await this.usersService._removeUser(id);
		} catch (error) {
			throw error; // Throw any errors to be handled by the RPC layererror;
		}
	}
}
