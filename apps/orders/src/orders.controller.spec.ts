import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
	let ordersController: OrdersController;

	/**
	 * Create a testing module for the OrdersController.
	 */
	beforeEach(async () => {
		/**
		 * Create a testing module for the OrdersController.
		 * Mock the OrdersService provider.
		 */
		const app: TestingModule = await Test.createTestingModule({
			controllers: [OrdersController],
			providers: [OrdersService],
		}).compile();

		/**
		 * Get the instance of the OrdersController.
		 */
		ordersController = app.get<OrdersController>(OrdersController);
	});

	/**
	 * Test suite for the root action.
	 */
	describe('root', () => {
		/**
		 * Test that the OrdersController is defined.
		 */
		it('should be defined', () => {
			/**
			 * Expect the OrdersController to be defined.
			 */
			expect(ordersController).toBeDefined();
		});
	});
});
