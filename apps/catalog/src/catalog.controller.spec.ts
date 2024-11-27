import { Test, TestingModule } from '@nestjs/testing';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';

describe('CatalogController', () => {
	let catalogController: CatalogController;

	/**
	 * Setup the testing module for the CatalogController.
	 * Mock the CatalogService provider.
	 */
	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [CatalogController],
			providers: [CatalogService],
		}).compile();

		/**
		 * Get the instance of the CatalogController.
		 */
		catalogController = app.get<CatalogController>(CatalogController);
	});

	/**
	 * Test suite for the root action.
	 */
	describe('root', () => {
		/**
		 * Test that the CatalogController is defined.
		 */
		it('should  be defined', () => {
			/**
			 * Expect the CatalogController to be defined.
			 */
			expect(catalogController).toBeDefined();
		});
	});
});
