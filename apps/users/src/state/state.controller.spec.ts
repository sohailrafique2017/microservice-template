import { Test, TestingModule } from '@nestjs/testing';
import { StateController } from './state.controller';
import { StateService } from './state.service';
import { StateEntity } from '@app/database/entities/state.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CountryEntity } from '@app/database/entities/country.entity';

describe('StateController', () => {
	// Declare a variable 'controller' of type 'StateController'
	let controller: StateController;

	// Create a mock implementation of the StateRepository
	const mockStateRepository = {
		findOne: jest.fn(),
		save: jest.fn(),
		create: jest.fn(),
		delete: jest.fn(),
		find: jest.fn(),
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
			controllers: [StateController],
			providers: [
				StateService,
				{ provide: getRepositoryToken(StateEntity), useValue: mockStateRepository },
				{ provide: getRepositoryToken(CountryEntity), useValue: mockCountryRepository },
			],
		}).compile();

		controller = module.get<StateController>(StateController);
	});

	// Verify that the StateController is properly defined
	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
