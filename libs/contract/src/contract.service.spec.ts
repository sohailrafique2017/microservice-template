import { Test, TestingModule } from '@nestjs/testing';
import { ContractService } from './contract.service';

//Unit tests for the ContractService.
describe('ContractService', () => {
	// The instance of the ContractService.
	let service: ContractService;
	// Initialization method for the test suite.
	beforeEach(async () => {
		/**
		 * Create a testing module for the ContractService.
		 * Mock the ContractService provider.
		 */
		const module: TestingModule = await Test.createTestingModule({
			providers: [ContractService],
		}).compile();

		/**
		 * Get the instance of the ContractService.
		 */
		service = module.get<ContractService>(ContractService);
	});

	/**
	 * Test that the ContractService is defined.
	 */
	it('should be defined', () => {
		/**
		 * Expect the ContractService to be defined.
		 */
		expect(service).toBeDefined();
	});
});
