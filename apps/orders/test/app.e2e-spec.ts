import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { OrdersModule } from '@app/orders/orders.module';

describe('OrdersController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [OrdersModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});
});
