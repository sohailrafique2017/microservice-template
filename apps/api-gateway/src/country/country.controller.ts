import { API_VERSION } from '@app/common/enums';
import { USERS_CLIENT } from '@app/contract/constant';
import { CreateCountryDto } from '@app/contract/users/dto/country/create.country.dto';
import { UpdateCountryDto } from '@app/contract/users/dto/country/update.country.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CONSTANTS } from '@app/api-gateway/utils/constant';
import { ROLE } from '@app/database/enums';
import { RequirePermisison } from '@app/api-gateway/auth/decorators/role.decorator';
import { JwtAuthGuard } from '@app/api-gateway/auth/guards/jwt.guard';
import { RolesGuard } from '@app/api-gateway/auth/guards/role.guard';
import { USERS_PATTERN } from '@app/contract/users/pattern/users.pattern';

@ApiTags(CONSTANTS.COUNTRY_CONTROLLER)
@Controller({ path: CONSTANTS.COUNTRY_CONTROLLER, version: API_VERSION.V1 })
export class CountryController {
	constructor(@Inject(USERS_CLIENT) private readonly authClient: ClientProxy) {}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Post()
	/**
	 * Creates a new country.
	 * @param createCountryDto The data transfer object containing the details of the country to create.
	 * @returns A promise that resolves to the creation result.
	 */
	async create(@Body() createCountryDto: CreateCountryDto) {
		try {
			return this.authClient.send(USERS_PATTERN.CREATE_COUNTRY, createCountryDto);
		} catch (error) {
			throw error;
		}
	}

	@Get()
	/**
	 * Finds all countries.
	 * @returns All countries.
	 */
	findAll() {
		return this.authClient.send(USERS_PATTERN.FIND_ALL_COUNTRY, {});
	}

	@Get(':id')
	/**
	 * Finds a country by ID.
	 * @param id The ID of the country to find.
	 * @returns The country with the given ID.
	 */
	findOne(@Param('id') id: string) {
		return this.authClient.send(USERS_PATTERN.FIND_ONE_COUNTRY, id);
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Patch(':id')
	/**
	 * Updates a country by ID.
	 * @param id The unique identifier of the country to update.
	 * @param updateCountryDto The updated country data.
	 * @returns The updated country.
	 */
	update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
		return this.authClient.send(USERS_PATTERN.UPDATE_COUNTRY, { id, dto: updateCountryDto });
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Delete(':id')
	/**
	 * Removes a country by ID.
	 * @param {string} id - The ID of the country to remove.
	 * @returns A promise that resolves to the deletion result.
	 */
	remove(@Param('id') id: string) {
		return this.authClient.send(USERS_PATTERN.REMOVE_COUNTRY, id);
	}
}
