import { Test, TestingModule } from '@nestjs/testing';
import { DiscountPromotionController } from './discount-promotion.controller';
import { DiscountPromotionService } from './discount-promotion.service';

/**
 * Unit tests for the DiscountPromotionController.
 */
describe('DiscountPromotionController', () => {
	/**
	 * The instance of the DiscountPromotionController.
	 */
	let discountPromotionController: DiscountPromotionController;

	/**
	 * Initialization method for the test suite.
	 */
	beforeEach(async () => {
		/**
		 * Create a testing module for the DiscountPromotionController.
		 * Mock the DiscountPromotionService provider.
		 */
		const app: TestingModule = await Test.createTestingModule({
			controllers: [DiscountPromotionController],
			providers: [DiscountPromotionService],
		}).compile();

		/**
		 * Get the instance of the DiscountPromotionController.
		 */
		discountPromotionController = app.get<DiscountPromotionController>(DiscountPromotionController);
	});

	/**
	 * Test suite for the root action.
	 */
	describe('root', () => {
		/**
		 * Test that the DiscountPromotionController is defined.
		 */
		it('should be  defined', () => {
			/**
			 * Expect the DiscountPromotionController to be defined.
			 */
			expect(discountPromotionController).toBeDefined();
		});
	});
});
