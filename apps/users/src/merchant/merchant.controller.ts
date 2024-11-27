import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MerchantService } from './merchant.service';
import { USERS_PATTERN } from '@app/contract/users/pattern/users.pattern';
import { CreateMerchantDto } from '@app/contract/users/dto/create.merchant.dto';
import { UpdateMerchantDto } from '@app/contract/users/dto/update.merchant.dto';

@Controller()
export class MerchantController {
	constructor(private readonly merchantService: MerchantService) {}

	@MessagePattern(USERS_PATTERN.CREATE_MERCHANT)
	/**
	 * Creates a new merchant.
	 * @param {CreateMerchantDto} createMerchantDto - The data to create the merchant.
	 */
	createMerchant(@Payload() createMerchantDto: CreateMerchantDto) {
		return this.merchantService.createMerchant(createMerchantDto);
	}

	@MessagePattern(USERS_PATTERN.FIND_ALL_MERCHANT)
	/**
	 * Finds all merchants.
	 * @returns An array of all the merchants.
	 */
	findAllMerchants() {
		return this.merchantService.findAllMerchant();
	}

	@MessagePattern(USERS_PATTERN.REMOVE_MERCHANT)
	/**
	 * Removes a merchant by ID.
	 * @param {string} id - The ID of the merchant to remove.
	 * @returns The deleted merchant.
	 */
	removeMerchant(@Payload() id: string) {
		return this.merchantService.removeMerchant(id);
	}

	@MessagePattern(USERS_PATTERN.FIND_ONE_MERCHANT)
	/**
	 * Retrieves a single merchant by ID.
	 * @param {string} id - The ID of the merchant to find.
	 * @returns The details of the merchant with the specified ID.
	 */
	findMerchant(@Payload() id: string) {
		return this.merchantService.findMerchant(id);
	}

	@MessagePattern(USERS_PATTERN.UPDATE_MERCHANT)
	/**
	 * Updates a merchant by ID.
	 * @param {string} id - The ID of the merchant to update.
	 * @param {UpdateMerchantDto} dto - The updated data for the merchant.
	 * @returns The updated merchant.
	 */
	updateMerchant(@Payload() data: { id: string; dto: UpdateMerchantDto }) {
		return this.merchantService.updateMerchant(data.id, data.dto);
	}
}
