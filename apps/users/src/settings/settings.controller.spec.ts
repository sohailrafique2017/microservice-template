import { Test, TestingModule } from '@nestjs/testing';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RoleEntity } from '@app/database/entities/role.entity';
import { RolePermissionEntity } from '@app/database/entities/role.permission.entity';
import { PermissionEntity } from '@app/database/entities/permission.entity';
import { EntityTypeEntity } from '@app/database/entities/entity.type.entity';

describe('SettingsController', () => {
	let controller: SettingsController;
	// Create a mock CountryRepository
	const mockRoleRepository = {
		findOne: jest.fn(),
		save: jest.fn(),
		create: jest.fn(),
		delete: jest.fn(),
		find: jest.fn(),
	};
	const mockPermissionRepository = {
		findOne: jest.fn(),
		save: jest.fn(),
		create: jest.fn(),
		delete: jest.fn(),
		find: jest.fn(),
	};
	const mockEntityTypeRepository = {
		findOne: jest.fn(),
		save: jest.fn(),
		create: jest.fn(),
		delete: jest.fn(),
		find: jest.fn(),
	};
	const mockRolePermissionRepository = {
		findOne: jest.fn(),
		save: jest.fn(),
		create: jest.fn(),
		delete: jest.fn(),
		find: jest.fn(),
	};
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SettingsController],
			providers: [
				SettingsService,
				{ provide: getRepositoryToken(RoleEntity), useValue: mockRoleRepository },
				{ provide: getRepositoryToken(RolePermissionEntity), useValue: mockRolePermissionRepository },
				{ provide: getRepositoryToken(PermissionEntity), useValue: mockPermissionRepository },
				{ provide: getRepositoryToken(EntityTypeEntity), useValue: mockEntityTypeRepository },
			],
		}).compile();

		controller = module.get<SettingsController>(SettingsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
