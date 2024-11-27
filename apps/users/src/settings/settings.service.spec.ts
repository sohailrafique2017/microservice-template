import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingsService } from './settings.service';
import { RoleEntity } from '@app/database/entities/role.entity';
import { PermissionEntity } from '@app/database/entities/permission.entity';
import { RolePermissionEntity } from '@app/database/entities/role.permission.entity';
import { EntityTypeEntity } from '@app/database/entities/entity.type.entity';
import { CreateRoleDto } from '@app/contract/settings/dto/create.role.dto';
import { UpdateRoleDto } from '@app/contract/settings/dto/update.role';
import { RpcException } from '@nestjs/microservices';
import { API_ERRORS } from '@app/common/defs/api.error.constant';

describe('SettingsService', () => {
	let service: SettingsService;
	//eslint-disable-next-line @typescript-eslint/no-unused-vars
	let roleRepository: Repository<RoleEntity>;
	//eslint-disable-next-line @typescript-eslint/no-unused-vars
	let permissionRepository: Repository<PermissionEntity>;
	//eslint-disable-next-line @typescript-eslint/no-unused-vars
	let rolePermissionRepository: Repository<RolePermissionEntity>;
	//eslint-disable-next-line @typescript-eslint/no-unused-vars
	let entityTypeRepository: Repository<EntityTypeEntity>;

	const mockRoleRepository = {
		findOne: jest.fn(),
		save: jest.fn(),
		create: jest.fn(),
		delete: jest.fn(),
		find: jest.fn(),
	};

	const mockPermissionRepository = {
		find: jest.fn(),
	};

	const mockRolePermissionRepository = {
		create: jest.fn(),
		save: jest.fn(),
		delete: jest.fn(),
	};
	const mockEntityTypeRepository = {
		find: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SettingsService,
				{ provide: getRepositoryToken(RoleEntity), useValue: mockRoleRepository },
				{ provide: getRepositoryToken(PermissionEntity), useValue: mockPermissionRepository },
				{ provide: getRepositoryToken(RolePermissionEntity), useValue: mockRolePermissionRepository },
				{ provide: getRepositoryToken(EntityTypeEntity), useValue: mockEntityTypeRepository },
			],
		}).compile();

		service = module.get<SettingsService>(SettingsService);
		roleRepository = module.get<Repository<RoleEntity>>(getRepositoryToken(RoleEntity));
		permissionRepository = module.get<Repository<PermissionEntity>>(getRepositoryToken(PermissionEntity));
		rolePermissionRepository = module.get<Repository<RolePermissionEntity>>(getRepositoryToken(RolePermissionEntity));
		entityTypeRepository = module.get<Repository<EntityTypeEntity>>(getRepositoryToken(EntityTypeEntity));
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('createSubRole', () => {
		it('should throw an error if the sub-role already exists', async () => {
			const roleData: CreateRoleDto = { name: 'Existing Role', permissions: [] };
			mockRoleRepository.findOne.mockResolvedValue(new RoleEntity());

			await expect(service.createSubRole(roleData)).rejects.toThrow(RpcException);
			await expect(service.createSubRole(roleData)).rejects.toThrow(API_ERRORS.SUB_ROLE_ALREADY_EXIST);
		});

		it('should create a new sub-role if it does not already exist', async () => {
			const roleData: CreateRoleDto = {
				name: 'New Role',
				permissions: [{ permission_id: ['1'], entity_type_id: '123' }],
			};
			const savedRole = new RoleEntity();
			savedRole.id = 'roleId';
			mockRoleRepository.findOne.mockResolvedValue(null);
			mockRoleRepository.create.mockReturnValue(savedRole); // Mock `create` method

			mockRoleRepository.save.mockResolvedValue(savedRole);
			mockRolePermissionRepository.save.mockResolvedValue([]);

			const result = await service.createSubRole(roleData);
			expect(result).toBe(savedRole);
		});
	});

	describe('findSubRoles', () => {
		it('should return all custom sub-roles', async () => {
			const roles = [new RoleEntity(), new RoleEntity()];
			mockRoleRepository.find.mockResolvedValue(roles);

			const result = await service.findSubRoles();
			expect(result).toEqual(roles);
		});
	});

	describe('findSubRoleById', () => {
		it('should throw an error if the sub-role is not found', async () => {
			mockRoleRepository.findOne.mockResolvedValue(null);

			await expect(service.findSubRoleById('invalid-id')).rejects.toThrow(RpcException);
			await expect(service.findSubRoleById('invalid-id')).rejects.toThrow(API_ERRORS.SUB_ROLE_NOT_FOUND);
		});

		it('should return the sub-role if found', async () => {
			const role = new RoleEntity();
			mockRoleRepository.findOne.mockResolvedValue(role);

			const result = await service.findSubRoleById('valid-id');
			expect(result).toEqual(role);
		});
	});

	describe('updateSubRole', () => {
		it('should throw an error if the sub-role is not found', async () => {
			mockRoleRepository.findOne.mockResolvedValue(null);

			await expect(
				service.updateSubRole('invalid-id', {
					name: 'Updated Name',
					permissions: [],
				}),
			).rejects.toThrow(RpcException);
			await expect(
				service.updateSubRole('invalid-id', {
					name: 'Updated Name',
					permissions: [],
				}),
			).rejects.toThrow(API_ERRORS.SUB_ROLE_NOT_FOUND);
		});

		it('should update the sub-role name and permissions if valid', async () => {
			const role = new RoleEntity();
			role.id = 'roleId';
			const updatedData: UpdateRoleDto = { name: 'Updated Role', permissions: [{ permission_id: ['1'], entity_type_id: '123' }] };
			mockRoleRepository.findOne.mockResolvedValue(role);
			mockRoleRepository.save.mockResolvedValue(role);
			mockRolePermissionRepository.save.mockResolvedValue([]);
			mockRolePermissionRepository.delete.mockResolvedValue({ affected: 1 });

			const result = await service.updateSubRole('roleId', updatedData);
			expect(result).toBe(role);
		});
	});

	describe('deleteSubRole', () => {
		it('should throw an error if the sub-role is not found', async () => {
			mockRoleRepository.findOne.mockResolvedValue(null);

			await expect(service.deleteSubRole('non-existent-id')).rejects.toThrow(RpcException);
			await expect(service.deleteSubRole('non-existent-id')).rejects.toThrow(API_ERRORS.SUB_ROLE_NOT_FOUND);
		});

		it('should delete the sub-role if it exists', async () => {
			const role = new RoleEntity();
			mockRoleRepository.findOne.mockResolvedValue(role);
			mockRoleRepository.delete.mockResolvedValue({ affected: 1 });

			const result = await service.deleteSubRole('valid-id');
			expect(result.affected).toBe(1);
		});
	});

	describe('findPermissions', () => {
		it('should retrieve all permissions', async () => {
			const permissions = [new PermissionEntity(), new PermissionEntity()];
			mockPermissionRepository.find.mockResolvedValue(permissions);

			const result = await service.findPermissions();
			expect(result).toEqual(permissions);
		});
	});

	describe('findEntityTypes', () => {
		it('should retrieve all entity types', async () => {
			const entityTypes = [new EntityTypeEntity(), new EntityTypeEntity()];
			mockEntityTypeRepository.find.mockResolvedValue(entityTypes); // Mock return value of `find`

			const result = await service.findEntityTypes();
			expect(result).toEqual(entityTypes);
		});
	});
});
