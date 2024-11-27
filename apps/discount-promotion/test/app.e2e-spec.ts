import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DiscountPromotionModule } from '@app/discount-promotion/discount-promotion.module';

describe('DiscountPromotionController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [DiscountPromotionModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});
});
