import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

describe('NotificationsController', () => {
	let notificationsController: NotificationsController;

	/**
	 * Set up the testing module for the NotificationsController.
	 */
	beforeEach(async () => {
		/**
		 * Create a testing module for the NotificationsController.
		 * Mock the NotificationsService provider.
		 */
		const app: TestingModule = await Test.createTestingModule({
			controllers: [NotificationsController],
			providers: [NotificationsService],
		}).compile();

		/**
		 * Get the instance of the NotificationsController.
		 */
		notificationsController = app.get<NotificationsController>(NotificationsController);
	});

	/**
	 * Test suite for the root action.
	 */
	describe('root', () => {
		/**
		 * Test that the NotificationsController is defined.
		 */
		it('should be defined', () => {
			/**
			 * Expect the NotificationsController to be defined.
			 */
			expect(notificationsController).toBeDefined();
		});
	});
});
