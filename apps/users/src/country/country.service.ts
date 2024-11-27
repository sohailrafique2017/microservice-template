import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryEntity } from '@app/database/entities/country.entity';
import { CreateCountryDto } from '@app/contract/users/dto/country/create.country.dto';
import { UpdateCountryDto } from '@app/contract/users/dto/country/update.country.dto';

@Injectable()
export class CountryService {
	/**
	 * Constructs a new instance of the CountryService class.
	 * @param countryRepository The CountryEntity repository.
	 */
	constructor(
		@InjectRepository(CountryEntity)
		private readonly countryRepository: Repository<CountryEntity>,
	) {}

	/**
	 * Creates a new country.
	 * @param createCountryDto The data transfer object containing the details of the country to create.
	 * @returns The created country.
	 * @throws RpcException When the country could not be created.
	 */
	async create(createCountryDto: CreateCountryDto) {
		try {
			const country = this.countryRepository.create(createCountryDto);
			return await this.countryRepository.save(country);
		} catch (error) {
			console.log(error.message);
			throw error;
		}
	}

	/**
	 * Finds all countries.
	 * @returns All countries.
	 */
	async findAll() {
		try {
			return await this.countryRepository.find();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Finds a country by ID.
	 * @param id The ID of the country to find.
	 * @returns The country with the given ID.
	 * @throws NotFoundException If the country with the given ID is not found.
	 */
	async findOne(id: string) {
		try {
			const country = await this.countryRepository.findOne({ where: { id } });
			if (!country) {
				throw new NotFoundException(`Country with ID ${id} not found`);
			}
			return country;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Updates a country by ID.
	 * @param id The ID of the country to update.
	 * @param updateCountryDto The data transfer object containing the updated country details.
	 * @returns The updated country.
	 * @throws NotFoundException If the country with the given ID is not found.
	 */
	async update(id: string, updateCountryDto: UpdateCountryDto) {
		try {
			const country = await this.countryRepository.findOne({ where: { id } });
			if (!country) {
				throw new NotFoundException(`Country with ID ${id} not found`);
			}
			await this.countryRepository.update(id, updateCountryDto);
			return this.countryRepository.findOne({ where: { id } });
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Removes a country by ID.
	 * @param id The ID of the country to remove.
	 * @returns A promise that resolves to void if the country was deleted successfully.
	 * @throws NotFoundException If the country with the given ID is not found.
	 */
	async remove(id: string): Promise<void> {
		try {
			const result = await this.countryRepository.delete(id);
			if (result.affected === 0) {
				throw new NotFoundException(`Country with ID ${id} not found`);
			}
		} catch (error) {
			throw error;
		}
	}
}
