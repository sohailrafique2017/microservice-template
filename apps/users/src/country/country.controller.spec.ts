import { Test, TestingModule } from '@nestjs/testing';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { CountryEntity } from '@app/database/entities/country.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CountryController', () => {
	// Create a variable to hold the instance of the CountryController
	let controller: CountryController;

	// Create a mock CountryRepository
	const mockCountryRepository = {
		findOne: jest.fn(),
		save: jest.fn(),
		create: jest.fn(),
		delete: jest.fn(),
		find: jest.fn(),
	};
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CountryController],
			providers: [CountryService, { provide: getRepositoryToken(CountryEntity), useValue: mockCountryRepository }],
		}).compile();

		controller = module.get<CountryController>(CountryController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
