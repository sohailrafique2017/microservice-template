import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CONSTANTS } from '@app/api-gateway/utils/constant';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { API_VERSION } from '@app/common/enums';
import { RolesGuard } from '@app/api-gateway/auth/guards/role.guard';
import { ROLE } from '@app/database/enums';
import { RequirePermisison } from '@app/api-gateway/auth/decorators/role.decorator';
import { JwtAuthGuard } from '@app/api-gateway/auth/guards/jwt.guard';
import { CreateMerchantDto } from '@app/contract/users/dto/create.merchant.dto';
import { UpdateMerchantDto } from '@app/contract/users/dto/update.merchant.dto';

@ApiTags(CONSTANTS.MERCHANT_CONTROLLER)
@Controller({ path: CONSTANTS.MERCHANT_CONTROLLER, version: API_VERSION.V1 })
export class MerchantController {
	constructor(private readonly merchantService: MerchantService) {}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Post()
	/**
	 * Creates a new merchant.
	 * @param {CreateMerchantDto} createMerchantDto - The data to create the merchant.
	 * @returns {Promise<UserEntity>} - The created merchant.
	 */
	create(@Body() createMerchantDto: CreateMerchantDto) {
		return this.merchantService.create(createMerchantDto);
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Get()
	/**
	 * Retrieves all merchants.
	 * @returns {Promise<UserEntity[]>} - An array of all merchant.
	 */
	findAll() {
		return this.merchantService.findAll();
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Get(':id')
	/**
	 * Finds a merchant by ID.
	 * @param {string} id - The ID of the merchant to find.
	 * @returns {Promise<UserEntity>} - The merchant with the given ID.
	 */
	findOne(@Param('id') id: string) {
		return this.merchantService.findOne(id);
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Patch(':id')
	/**
	 * Updates a merchant by ID.
	 * @param {string} id - The ID of the merchant to update.
	 * @param {UpdateMerchantDto} updateMerchantDto - The updated data for the merchant.
	 * @returns {Promise<UserEntity>} - The updated merchant.
	 */
	update(@Param('id') id: string, @Body() updateMerchantDto: UpdateMerchantDto) {
		return this.merchantService.update(id, updateMerchantDto);
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Delete(':id')
	/**
	 * Deletes a merchant by ID.
	 * @param {string} id - The ID of the merchant to delete.
	 * @returns {Promise<void>} - A promise that resolves when the merchant is deleted.
	 */
	remove(@Param('id') id: string) {
		return this.merchantService.remove(id);
	}
}
