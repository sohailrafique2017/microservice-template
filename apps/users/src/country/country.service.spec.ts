import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from './country.service';
import { CountryEntity } from '@app/database/entities/country.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateCountryDto } from '@app/contract/users/dto/country/update.country.dto';
import { getcountyDto, getMockCountriesResult, getMockCountyResult } from '@app/users/utils/test';

describe('CountryService', () => {
	let service: CountryService;

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
			providers: [CountryService, { provide: getRepositoryToken(CountryEntity), useValue: mockCountryRepository }],
		}).compile();

		service = module.get<CountryService>(CountryService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {
		it('should create a new country', async () => {
			const countryDto = getcountyDto();
			const mockCountryResult = { id: '1', ...countryDto };
			jest.spyOn(mockCountryRepository, 'create').mockReturnValue(mockCountryResult);
			jest.spyOn(mockCountryRepository, 'save').mockResolvedValue(mockCountryResult);

			const createdCountry = await service.create(countryDto);

			expect(mockCountryRepository.create).toHaveBeenCalledWith(countryDto);
			expect(mockCountryRepository.save).toHaveBeenCalledWith(mockCountryResult);
			expect(createdCountry).toEqual(mockCountryResult);
		});
	});

	describe('findAll', () => {
		it('should return an array of countries', async () => {
			const mockCountries = getMockCountriesResult();

			jest.spyOn(mockCountryRepository, 'find').mockResolvedValue(mockCountries);

			const result = await service.findAll();

			expect(mockCountryRepository.find).toHaveBeenCalled();
			expect(result).toEqual(mockCountries);
		});
	});

	describe('findOne', () => {
		it('should return a country if found', async () => {
			const mockCountry = getMockCountyResult();

			jest.spyOn(mockCountryRepository, 'findOne').mockResolvedValue(mockCountry);

			const result = await service.findOne(mockCountry.id);

			expect(mockCountryRepository.findOne).toHaveBeenCalledWith({ where: { id: mockCountry.id } });
			expect(result).toEqual(mockCountry);
		});

		it('should throw NotFoundException if country not found', async () => {
			jest.spyOn(mockCountryRepository, 'findOne').mockResolvedValue(null);

			await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
			expect(mockCountryRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
		});
	});

	describe('update', () => {
		it('should update a country and return the updated country', async () => {
			const updateCountryDto = new UpdateCountryDto();
			updateCountryDto.name = 'Updated Country';

			const existingCountry = getMockCountyResult();
			const updatedCountry = { ...existingCountry, ...updateCountryDto };

			jest.spyOn(mockCountryRepository, 'findOne').mockResolvedValue(existingCountry);
			jest.spyOn(mockCountryRepository, 'update').mockResolvedValue(undefined);
			jest.spyOn(mockCountryRepository, 'findOne').mockResolvedValue(updatedCountry);

			const result = await service.update('1', updateCountryDto);

			expect(mockCountryRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
			expect(mockCountryRepository.update).toHaveBeenCalledWith('1', updateCountryDto);
			expect(result).toEqual(updatedCountry);
		});

		it('should throw NotFoundException if country not found', async () => {
			jest.spyOn(mockCountryRepository, 'findOne').mockResolvedValue(null);

			await expect(service.update('1', new UpdateCountryDto())).rejects.toThrow(NotFoundException);
			expect(mockCountryRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
		});
	});

	describe('remove', () => {
		it('should delete a country if it exists', async () => {
			jest.spyOn(mockCountryRepository, 'delete').mockResolvedValue({ affected: 1 } as any);

			await service.remove('1');

			expect(mockCountryRepository.delete).toHaveBeenCalledWith('1');
		});

		it('should throw NotFoundException if country not found', async () => {
			jest.spyOn(mockCountryRepository, 'delete').mockResolvedValue({ affected: 0 } as any);

			await expect(service.remove('1')).rejects.toThrow(NotFoundException);
			expect(mockCountryRepository.delete).toHaveBeenCalledWith('1');
		});
	});
});
