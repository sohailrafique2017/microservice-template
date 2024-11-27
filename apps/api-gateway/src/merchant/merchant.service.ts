import { Inject, Injectable } from '@nestjs/common';
import { USERS_CLIENT } from '@app/contract/constant';
import { ClientProxy } from '@nestjs/microservices';
import { USERS_PATTERN } from '@app/contract/users/pattern/users.pattern';
import { CreateMerchantDto } from '@app/contract/users/dto/create.merchant.dto';
import { UpdateMerchantDto } from '@app/contract/users/dto/update.merchant.dto';

@Injectable()
export class MerchantService {
	/**
	 * The constructor is called when the service is instantiated.
	 * It's passed the Users microservice client proxy, which is used to communicate with the Users microservice.
	 * @param {ClientProxy} authClient - The Users microservice client proxy.
	 */
	constructor(@Inject(USERS_CLIENT) private readonly authClient: ClientProxy) {}

	/**
	 * Creates a new merchant.
	 * @param {CreateMerchantDto} createMerchantDto - The data to create the merchant.
	 * @returns {Promise<UserEntity>} - The created merchant.
	 */
	create(createMerchantDto: CreateMerchantDto) {
		return this.authClient.send(USERS_PATTERN.CREATE_MERCHANT, createMerchantDto);
	}
	/**
	 * Retrieves all merchants.
	 * @returns {Promise<UserEntity[]>} - An array of all merchant.
	 */
	findAll() {
		return this.authClient.send(USERS_PATTERN.FIND_ALL_MERCHANT, {});
	}
	/**
	 * Finds a merchant by ID.
	 * @param {string} id - The ID of the merchant to find.
	 * @returns {Promise<UserEntity>} - The merchant with the given ID.
	 */
	findOne(id: string) {
		return this.authClient.send(USERS_PATTERN.FIND_ONE_MERCHANT, id);
	}
	/**
	 * Updates a merchant by ID.
	 * @param {string} id - The ID of the merchant to update.
	 * @param {UpdateMerchantDto} updateMerchantDto - The updated data for the merchant.
	 * @returns {Promise<UserEntity>} - The updated merchant.
	 */
	update(id: string, updateMerchantDto: UpdateMerchantDto) {
		return this.authClient.send(USERS_PATTERN.UPDATE_MERCHANT, {
			id,
			dto: updateMerchantDto,
		});
	}
	/**
	 * Removes a merchant by ID.
	 * @param {string} id - The ID of the merchant to remove.
	 */
	remove(id: string) {
		return this.authClient.send(USERS_PATTERN.REMOVE_MERCHANT, id);
	}
}
