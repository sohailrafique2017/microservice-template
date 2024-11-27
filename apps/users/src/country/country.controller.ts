import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CountryService } from './country.service';
import { CreateCountryDto } from '@app/contract/users/dto/country/create.country.dto';
import { UpdateCountryDto } from '@app/contract/users/dto/country/update.country.dto';
import { USERS_PATTERN } from '@app/contract/users/pattern/users.pattern';

@Controller()
export class CountryController {
	constructor(private readonly countryService: CountryService) {}

	@MessagePattern(USERS_PATTERN.CREATE_COUNTRY)
	/**
	 * Creates a new country.
	 * @param createCountryDto The data transfer object containing the details of the country to create.
	 * @returns The created country.
	 */
	async create(@Payload() createCountryDto: CreateCountryDto) {
		return this.countryService.create(createCountryDto);
	}

	@MessagePattern(USERS_PATTERN.FIND_ALL_COUNTRY)
	/**
	 * Finds all countries.
	 * @returns All countries.
	 */
	findAll() {
		return this.countryService.findAll();
	}

	@MessagePattern(USERS_PATTERN.FIND_ONE_COUNTRY)
	/**
	 * Finds a country by ID.
	 * @param id The ID of the country to find.
	 * @returns The country with the given ID.
	 */
	findOne(@Payload() id: string) {
		return this.countryService.findOne(id);
	}

	@MessagePattern(USERS_PATTERN.UPDATE_COUNTRY)
	/**
	 * Updates a country by ID.
	 * @param data The object containing the ID of the country to update and the updated country data.
	 * @returns The updated country.
	 */
	update(@Payload() data: { id: string; dto: UpdateCountryDto }) {
		return this.countryService.update(data.id, data.dto);
	}

	@MessagePattern(USERS_PATTERN.REMOVE_COUNTRY)
	/**
	 * Removes a country by ID.
	 * @param id The ID of the country to remove.
	 * @returns The deleted country.
	 */
	remove(@Payload() id: string) {
		return this.countryService.remove(id);
	}
}
