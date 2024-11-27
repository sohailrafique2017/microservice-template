import { CreateRoleDto } from '@app/contract/settings/dto/create.role.dto';
import { EntityTypeEntity } from '@app/database/entities/entity.type.entity';
import { PermissionEntity } from '@app/database/entities/permission.entity';
import { RoleEntity } from '@app/database/entities/role.entity';
import { RolePermissionEntity } from '@app/database/entities/role.permission.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { API_ERRORS } from '@app/common/defs/api.error.constant';
import { UpdateRoleDto } from '@app/contract/settings/dto/update.role';
@Injectable()
export class SettingsService {
	constructor(
		@InjectRepository(RoleEntity)
		private readonly roleRepository: Repository<RoleEntity>,

		@InjectRepository(PermissionEntity)
		private readonly permissionRepository: Repository<PermissionEntity>,

		@InjectRepository(EntityTypeEntity)
		private readonly entityTypeRepository: Repository<EntityTypeEntity>,

		@InjectRepository(RolePermissionEntity)
		private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
	) {}

	/**
	 * Creates a new sub-role.
	 * @param roleData The create role DTO containing the sub-role name and permissions.
	 * @returns The newly created sub-role.
	 * @throws {RpcException} If a sub-role with the same name already exists.
	 */
	async createSubRole(roleData: CreateRoleDto) {
		try {
			const roleExist = await this.roleRepository.findOne({
				where: { name: roleData.name },
			});
			if (roleExist) {
				throw new RpcException(API_ERRORS.SUB_ROLE_ALREADY_EXIST);
			}
			const role = this.roleRepository.create({
				name: roleData.name,
				isActive: true,
				isCustom: true,
			});
			const savedRole = await this.roleRepository.save(role);

			// Map the permissions array to an array of arrays, where each inner array contains
			// objects that represent the RolePermissionEntity to be saved.
			// The objects are created by taking each permission ID and entity type ID from the
			// permission DTO, and linking them to the newly created role and permission entities.
			// The role is linked by its ID, and the permission and entity type are linked by their IDs.
			const rolePermissions = roleData.permissions
				.map(permissionDto => {
					return permissionDto.permission_id.map(permissionId => {
						return this.rolePermissionRepository.create({
							role: {
								id: savedRole.id,
							},
							permission: { id: permissionId },
							entityType: { id: permissionDto.entity_type_id },
						});
					});
				})
				// Flatten the array of arrays into a single array of objects to be saved
				.flat();

			// Save all role permissions
			await this.rolePermissionRepository.save(rolePermissions);
			return savedRole;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Finds all custom sub-roles.
	 *
	 * @returns An array of sub role objects with their respective permissions and entity types.
	 */
	findSubRoles() {
		try {
			return this.roleRepository.find({
				where: {
					isCustom: true,
				},
				relations: ['permissions', 'permissions.permission', 'permissions.entityType'],
			});
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Finds a custom sub-role by its ID.
	 *
	 * @param id The ID of the sub-role to be retrieved.
	 * @returns The sub-role with the given ID, or throw an RpcException if the sub-role is not found.
	 */
	async findSubRoleById(id: string) {
		try {
			const role = await this.roleRepository.findOne({
				where: { id },
				relations: ['permissions', 'permissions.permission', 'permissions.entityType'],
			});
			if (!role) {
				throw new RpcException(API_ERRORS.SUB_ROLE_NOT_FOUND);
			}
			return role;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Updates an existing custom sub-role by its ID with new data.
	 *
	 * @param id The ID of the sub-role to be updated.
	 * @param updateRoleDto The DTO containing updated sub-role data such as name and permissions.
	 * @returns The updated sub-role.
	 */
	async updateSubRole(id: string, updateRoleDto: UpdateRoleDto) {
		try {
			const role = await this.roleRepository.findOne({ where: { id } });
			if (!role) {
				throw new RpcException(API_ERRORS.SUB_ROLE_NOT_FOUND);
			}

			if (updateRoleDto.name) {
				role.name = updateRoleDto.name;
			}

			// Update permissions if provided
			if (updateRoleDto.permissions) {
				// Remove existing permissions for this role
				await this.rolePermissionRepository.delete({ role: { id } });

				// Map and create new role permissions
				const newRolePermissions = updateRoleDto.permissions.flatMap(permissionDto =>
					permissionDto.permission_id.map(permissionId =>
						this.rolePermissionRepository.create({
							role,
							permission: { id: permissionId },
							entityType: { id: permissionDto.entity_type_id },
						}),
					),
				);

				// Save new permissions
				await this.rolePermissionRepository.save(newRolePermissions);
				role.permissions = newRolePermissions;
			}
			await this.roleRepository.save(role);
			return this.roleRepository.findOne({ where: { id }, relations: ['permissions', 'permissions.permission', 'permissions.entityType'] });
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Deletes a sub-role by its ID.
	 * @param id The ID of the sub-role to be deleted.
	 * @returns A promise that resolves to the result of the deletion operation.
	 * @throws {RpcException} If the sub-role is not found.
	 */
	async deleteSubRole(id: string) {
		try {
			const role = await this.roleRepository.findOne({ where: { id } });
			if (!role) {
				throw new RpcException(API_ERRORS.SUB_ROLE_NOT_FOUND);
			}
			return this.roleRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}

	// Permission CRUD

	/**
	 * Retrieves all permissions from the repository.
	 *
	 * @returns A promise that resolves to an array of permission entities.
	 * @throws {Error} Propagates any errors encountered during the retrieval process.
	 */
	findPermissions() {
		try {
			return this.permissionRepository.find();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Retrieves all entity types from the repository.
	 *
	 * @returns A promise that resolves to an array of entity type entities.
	 * @throws {Error} Propagates any errors encountered during the retrieval process.
	 */
	findEntityTypes() {
		try {
			return this.entityTypeRepository.find();
		} catch (error) {
			throw error;
		}
	}
}
