import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';

//Unit tests for the DatabaseService.

describe('DatabaseService', () => {
	// The instance of the DatabaseService.
	let service: DatabaseService;

	//Initialization method for the test suite.

	beforeEach(async () => {
		// Create a testing module for the DatabaseService.
		// Mock the DatabaseService provider.

		const module: TestingModule = await Test.createTestingModule({
			providers: [DatabaseService],
		}).compile();

		/**
		 * Get the instance of the DatabaseService.
		 */
		service = module.get<DatabaseService>(DatabaseService);
	});

	/**
	 * Test suite for the root action.
	 */
	it('should be defined', () => {
		/**
		 * Expect the DatabaseService to be defined.
		 */
		expect(service).toBeDefined();
	});
});
