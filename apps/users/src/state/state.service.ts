import { CreateStateDto } from '@app/contract/users/dto/state/create.state.dto';
import { UpdateStateDto } from '@app/contract/users/dto/state/update.state.dto';
import { CountryEntity } from '@app/database/entities/country.entity';
import { StateEntity } from '@app/database/entities/state.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class StateService {
	/**
	 * Constructs a new instance of the StateService class.
	 * @param stateRepository The repository used to manage state entities.
	 */
	constructor(
		@InjectRepository(StateEntity)
		private readonly stateRepository: Repository<StateEntity>,
		@InjectRepository(CountryEntity)
		private readonly countryRepository: Repository<CountryEntity>,
	) {}
	/**
	 * Creates a new state.
	 *
	 * @param createStateDto The data transfer object containing the details of the state to create.
	 * @returns The created state.
	 * @throws RpcException When the state could not be created.
	 */
	async create(createStateDto: CreateStateDto) {
		try {
			const country = await this.countryRepository.findOne({ where: { id: Equal(createStateDto.country_id) } });
			if (!country) {
				throw new NotFoundException(`Country with ID ${createStateDto.country_id} not found`);
			}

			const findState = await this.stateRepository.findOne({ where: { name: createStateDto.name } });
			if (findState) {
				throw new NotFoundException(`State with name ${createStateDto.name} already exists`);
			}
			const state = this.stateRepository.create({
				name: createStateDto.name,
				country: country,
			});
			return await this.stateRepository.save(state);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Retrieves all states.
	 *
	 * @returns An array of state entities.
	 * @throws RpcException When the states could not be retrieved.
	 */
	async findAll() {
		try {
			return await this.stateRepository.find({
				relations: ['country'],
			});
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Retrieves a state by its ID.
	 * @param id The ID of the state to find.
	 * @returns The found state.
	 * @throws NotFoundException If the state with the given ID is not found.
	 */
	async findOne(id: string) {
		try {
			const state = await this.stateRepository.findOne({ where: { id }, relations: ['country'] });
			if (!state) {
				throw new NotFoundException(`State with ID ${id} not found`);
			}
			return state;
		} catch (error) {
			throw error;
		}
	}
	async findStateByCountry(id: string) {
		try {
			const states = await this.stateRepository.find({ where: { country: { id } } });
			if (!states && states.length === 0) {
				throw new NotFoundException(`States with ID country ${id} not found`);
			}
			return states;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Updates a state by its ID.
	 * @param id The ID of the state to update.
	 * @param updateStateDto The data transfer object containing the updated state details.
	 * @returns The updated state.
	 * @throws NotFoundException If the state with the given ID is not found.
	 */
	async update(id: string, updateStateDto: UpdateStateDto) {
		try {
			const state = await this.stateRepository.findOne({ where: { id } });
			if (!state) {
				throw new NotFoundException(`State with ID ${id} not found`);
			}
			await this.stateRepository.update(id, updateStateDto);
			return this.stateRepository.findOne({ where: { id } });
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Deletes a state by its ID.
	 *
	 * @param id The ID of the state to delete.
	 * @throws NotFoundException If the state with the given ID is not found.
	 */
	async remove(id: string) {
		try {
			const result = await this.stateRepository.delete(id);
			if (result.affected === 0) {
				throw new NotFoundException(`State with ID ${id} not found`);
			}
		} catch (error) {
			throw error;
		}
	}
}
