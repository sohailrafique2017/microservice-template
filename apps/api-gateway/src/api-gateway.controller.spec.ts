import { Test, TestingModule } from '@nestjs/testing';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
/**
 * Test suite for the ApiGatewayController.
 */
describe('ApiGatewayController', () => {
	/**
	 * The instance of the ApiGatewayController.
	 */
	let apiGatewayController: ApiGatewayController;

	/**
	 * Initialization method for the test suite.
	 */
	beforeEach(async () => {
		/**
		 * The NestJS application module.
		 */
		const app: TestingModule = await Test.createTestingModule({
			controllers: [ApiGatewayController],
			providers: [ApiGatewayService],
		}).compile();

		/**
		 * Get the instance of the ApiGatewayController.
		 */
		apiGatewayController = app.get<ApiGatewayController>(ApiGatewayController);
	});

	/**
	 * Test suite for the root action.
	 */
	describe('root', () => {
		/**
		 * Test that the ApiGatewayController is defined.
		 */
		it('should be defined', () => {
			/**
			 * Expect the ApiGatewayController to be defined.
			 */
			expect(apiGatewayController).toBeDefined();
		});
	});
});
