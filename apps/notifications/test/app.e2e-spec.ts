import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { NotificationsModule } from '@app/notifications/notifications.module';

describe('NotificationsController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [NotificationsModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});
});
