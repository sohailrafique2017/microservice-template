import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UsersModule } from '@app/users/src/users.module';

describe('UsersController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [UsersModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});
});
