import { USERS_CLIENT } from '@app/contract/constant';
import { CreateRoleDto } from '@app/contract/settings/dto/create.role.dto';
import { UpdateRoleDto } from '@app/contract/settings/dto/update.role';
import { USERS_PATTERN } from '@app/contract/users/pattern/users.pattern';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class SettingsService {
	constructor(@Inject(USERS_CLIENT) private readonly authClient: ClientProxy) {}

	/**
	 * Creates a new sub-role.
	 *
	 * @param roleData The create role DTO containing the sub-role name and permissions.
	 * @returns The newly created sub-role.
	 */
	createSubRole(roleData: CreateRoleDto) {
		return this.authClient.send(USERS_PATTERN.CREATE_SETTINGS_SUB_ROLE, roleData);
	}

	/**
	 * Finds all sub roles.
	 *
	 * @returns An array of sub role objects.
	 */
	findSubRoles() {
		return this.authClient.send(USERS_PATTERN.FIND_ALL_SETTINGS_SUB_ROLE, {});
	}

	/**
	 * Finds a sub-role by its ID.
	 *
	 * @param id The ID of the sub-role to be retrieved.
	 * @returns The sub-role with the given ID.
	 */
	findSubRoleById(id: string) {
		return this.authClient.send(USERS_PATTERN.FIND_ONE_SETTINGS_SUB_ROLE, id);
	}

	/**
	 * Updates an existing sub-role by its ID with new data.
	 *
	 * @param id The ID of the sub-role to be updated.
	 * @param updateData The DTO containing updated sub-role data such as name and permissions.
	 * @returns A promise that resolves to the updated sub-role.
	 */
	async updateSubRole(id: string, updateData: UpdateRoleDto) {
		return this.authClient.send(USERS_PATTERN.UPDATE_SETTINGS_SUB_ROLE, {
			id,
			dto: updateData,
		});
	}

	/**
	 * Deletes a sub-role by its ID.
	 *
	 * @param id The ID of the sub-role to be deleted.
	 * @returns A promise that resolves to the result of the deletion operation.
	 */
	deleteSubRole(id: string) {
		return this.authClient.send(USERS_PATTERN.DELETE_SETTINGS_SUB_ROLE, id);
	}

	/**
	 * Retrieves all permissions.
	 *
	 * @returns A promise that resolves to an array of permissions.
	 */
	findPermissions() {
		return this.authClient.send(USERS_PATTERN.FIND_ALL_SETTINGS_PERMISSION, {});
	}

	/**
	 * Retrieves all entity types.
	 *
	 * @returns A promise that resolves to an array of entity types.
	 */
	findEntityTypes() {
		return this.authClient.send(USERS_PATTERN.FIND_ALL_SETTINGS_ENTITY_TYPES, {});
	}
}
