import { Test, TestingModule } from '@nestjs/testing';
import { StateService } from './state.service';
import { StateEntity } from '@app/database/entities/state.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateStateDto } from '@app/contract/users/dto/state/update.state.dto';
import { getMockStateResult, getMockStatesResult, getStateDto } from '@app/users/utils/test';
import { CountryEntity } from '@app/database/entities/country.entity';
import { Equal } from 'typeorm';

describe('StateService', () => {
	// Declare a variable 'service' of type 'StateService'
	let service: StateService;
	// Create a mock implementation of the StateRepository
	const mockStateRepository = {
		findOne: jest.fn(),
		save: jest.fn(),
		create: jest.fn(),
		delete: jest.fn(),
		find: jest.fn(),
		update: jest.fn(),
	};

	const mockCountryRepository = {
		findOne: jest.fn(),
		save: jest.fn(),
		create: jest.fn(),
		delete: jest.fn(),
		find: jest.fn(),
		update: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				StateService,
				{ provide: getRepositoryToken(StateEntity), useValue: mockStateRepository },
				{ provide: getRepositoryToken(CountryEntity), useValue: mockCountryRepository },
			],
		}).compile();

		service = module.get<StateService>(StateService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should create a new state', async () => {
			const stateDto = getStateDto();
			const mockCountry = { id: stateDto.country_id };
			const mockStateResult = { id: '1', ...stateDto };

			jest.spyOn(mockCountryRepository, 'findOne').mockResolvedValue(mockCountry);
			jest.spyOn(mockStateRepository, 'findOne').mockResolvedValue(null);
			jest.spyOn(mockStateRepository, 'create').mockReturnValue(mockStateResult);
			jest.spyOn(mockStateRepository, 'save').mockResolvedValue(mockStateResult);

			const createdState = await service.create(stateDto);

			expect(mockCountryRepository.findOne).toHaveBeenCalledWith({ where: { id: Equal(stateDto.country_id) } });
			expect(mockStateRepository.findOne).toHaveBeenCalledWith({ where: { name: stateDto.name } });
			expect(mockStateRepository.create).toHaveBeenCalledWith({
				name: stateDto.name,
				country: mockCountry,
			});
			expect(mockStateRepository.save).toHaveBeenCalledWith(mockStateResult);
			expect(createdState).toEqual(expect.objectContaining(mockStateResult));
		});

		it('should throw NotFoundException if the country is not found', async () => {
			const stateDto = getStateDto();

			jest.spyOn(mockCountryRepository, 'findOne').mockResolvedValue(null);
			jest.spyOn(mockStateRepository, 'create'); // No call expected here

			await expect(service.create(stateDto)).rejects.toThrow(NotFoundException);
			expect(mockCountryRepository.findOne).toHaveBeenCalledWith({ where: { id: Equal(stateDto.country_id) } });
			expect(mockStateRepository.create).not.toHaveBeenCalled();
			expect(mockStateRepository.save).not.toHaveBeenCalled();
		});

		it('should throw NotFoundException if the state already exists', async () => {
			const stateDto = getStateDto();
			const mockCountry = { id: stateDto.country_id };
			const mockExistingState = { id: 'existing-state-id', name: stateDto.name };

			jest.spyOn(mockCountryRepository, 'findOne').mockResolvedValue(mockCountry);
			jest.spyOn(mockStateRepository, 'findOne').mockResolvedValue(mockExistingState);
			jest.spyOn(mockStateRepository, 'create'); // No call expected here

			await expect(service.create(stateDto)).rejects.toThrow(NotFoundException);
			expect(mockCountryRepository.findOne).toHaveBeenCalledWith({ where: { id: Equal(stateDto.country_id) } });
			expect(mockStateRepository.findOne).toHaveBeenCalledWith({ where: { name: stateDto.name } });
			expect(mockStateRepository.create).not.toHaveBeenCalled();
			expect(mockStateRepository.save).not.toHaveBeenCalled();
		});
	});

	describe('findAll', () => {
		it('should return an array of countries', async () => {
			const mockCountries = getMockStatesResult();

			jest.spyOn(mockStateRepository, 'find').mockResolvedValue(mockCountries);

			const result = await service.findAll();

			expect(mockStateRepository.find).toHaveBeenCalled();
			expect(result).toEqual(expect.arrayContaining(mockCountries));
		});
	});

	describe('findOne', () => {
		it('should return a state if found', async () => {
			const mockState = getMockStateResult();

			jest.spyOn(mockStateRepository, 'findOne').mockResolvedValue(mockState);

			const result = await service.findOne(mockState.id);

			expect(mockStateRepository.findOne).toHaveBeenCalledWith({
				where: { id: mockState.id },
				relations: ['country'],
			});
			expect(result).toEqual(expect.objectContaining(mockState));
		});

		it('should throw NotFoundException if state not found', async () => {
			jest.spyOn(mockStateRepository, 'findOne').mockResolvedValue(null);

			await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
			expect(mockStateRepository.findOne).toHaveBeenCalledWith({
				where: { id: '1' },
				relations: ['country'],
			});
		});
	});

	describe('update', () => {
		it('should update a state and return the updated state', async () => {
			const updateStateDto = new UpdateStateDto();
			updateStateDto.name = 'Updated State';

			const existingState = getMockStateResult();
			const updatedState = { ...existingState, ...updateStateDto };

			jest.spyOn(mockStateRepository, 'findOne').mockResolvedValue(existingState);
			jest.spyOn(mockStateRepository, 'update').mockResolvedValue(undefined);
			jest.spyOn(mockStateRepository, 'findOne').mockResolvedValue(updatedState);

			const result = await service.update('1', updateStateDto);

			expect(mockStateRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
			expect(mockStateRepository.update).toHaveBeenCalledWith('1', updateStateDto);
			expect(result).toEqual(expect.objectContaining(updatedState));
		});

		it('should throw NotFoundException if state not found', async () => {
			jest.spyOn(mockStateRepository, 'findOne').mockResolvedValue(null);

			await expect(service.update('1', new UpdateStateDto())).rejects.toThrow(NotFoundException);
			expect(mockStateRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
		});
	});

	describe('remove', () => {
		it('should delete a state if it exists', async () => {
			jest.spyOn(mockStateRepository, 'delete').mockResolvedValue({ affected: 1 } as any);

			await service.remove('1');

			expect(mockStateRepository.delete).toHaveBeenCalledWith('1');
		});

		it('should throw NotFoundException if state not found', async () => {
			jest.spyOn(mockStateRepository, 'delete').mockResolvedValue({ affected: 0 } as any);

			await expect(service.remove('1')).rejects.toThrow(NotFoundException);
			expect(mockStateRepository.delete).toHaveBeenCalledWith('1');
		});
	});
});
