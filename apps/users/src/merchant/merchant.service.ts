import { CreateMerchantDto } from '@app/contract/users/dto/create.merchant.dto';
import { Injectable } from '@nestjs/common';
import { UpdateMerchantDto } from '@app/contract/users/dto/update.merchant.dto';
import { ROLE } from '@app/database/enums';
import { UsersService } from '@app/users/users.service';

@Injectable()
export class MerchantService {
	constructor(private readonly usersService: UsersService) {}

	/**
	 * Creates a new merchant.
	 * @param {CreateMerchantDto} createMerchantDto - The data to create the merchant.
	 * @returns {Promise<UserEntity>} - The created merchant.
	 */
	async createMerchant(createMerchantDto: CreateMerchantDto) {
		try {
			const merchant = await this.usersService._createUserWithRole(ROLE.MERCHANT, createMerchantDto);
			return merchant;
		} catch (error) {
			throw error;
		}
	}
	/**
	 * Updates a merchant by ID.
	 * @param {string} id - The ID of the merchant to update.
	 * @param {UpdateMerchantDto} updateMerchantDto - The updated data for the merchant.
	 * @returns {Promise<UserEntity>} - The updated merchant.
	 */
	async updateMerchant(id: string, updateMerchantDto: UpdateMerchantDto) {
		try {
			// Find the user by ID
			const updateUser = this.usersService._updateUser(id, updateMerchantDto);
			return updateUser;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Finds a merchant by ID.
	 * @param {string} id - The ID of the merchant to find.
	 * @returns {Promise<UserEntity>} - The merchant with the given ID.
	 * @throws {UserNotFoundException} If the merchant is not found.
	 */
	async findMerchant(id: string) {
		try {
			return await this.usersService._findOneUser(id);
		} catch (error) {
			throw error;
		}
	}
	async findAllMerchant() {
		try {
			const merchants = await this.usersService._findAllUsersByRole(ROLE.MERCHANT);
			return merchants;
		} catch (error) {
			throw error;
		}
	}
	/**
	 * Removes a merchant by ID.
	 * @param {string} id - The ID of the merchant to remove.
	 * @returns {Promise<void>} - A promise that resolves when the merchant is removed.
	 * @throws {RpcException} If the merchant is not found or if the removal fails.
	 */
	async removeMerchant(id: string) {
		try {
			return await this.usersService._removeUser(id);
		} catch (error) {
			throw error; // Throw any errors to be handled by the RPC layererror;
		}
	}
}
