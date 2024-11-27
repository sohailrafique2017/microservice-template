import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SettingsService } from './settings.service';
import { CreateRoleDto } from '@app/contract/settings/dto/create.role.dto';
import { UpdateRoleDto } from '@app/contract/settings/dto/update.role';
import { USERS_PATTERN } from '@app/contract/users/pattern/users.pattern';

@Controller()
export class SettingsController {
	constructor(private readonly settingsService: SettingsService) {}

	@MessagePattern(USERS_PATTERN.CREATE_SETTINGS_SUB_ROLE)
	/**
	 * Creates a new sub-role.
	 * @param {CreateRoleDto} createRoleDto - The create role DTO containing the sub-role name and permissions.
	 * @returns The newly created sub-role.
	 */
	createSubRole(@Payload() createRoleDto: CreateRoleDto) {
		return this.settingsService.createSubRole(createRoleDto);
	}

	@MessagePattern(USERS_PATTERN.FIND_ALL_SETTINGS_SUB_ROLE)
	/**
	 * Retrieves all sub-roles.
	 * @returns An array of sub-roles.
	 */
	getSubRoles() {
		return this.settingsService.findSubRoles();
	}

	@MessagePattern(USERS_PATTERN.FIND_ONE_SETTINGS_SUB_ROLE)
	/**
	 * Retrieves a single sub-role by ID.
	 * @param {string} id - The ID of the sub-role to find.
	 * @returns The sub-role with the specified ID.
	 */
	getSubRoleById(@Payload() id: string) {
		return this.settingsService.findSubRoleById(id);
	}

	@MessagePattern(USERS_PATTERN.UPDATE_SETTINGS_SUB_ROLE)
	/**
	 * Updates an existing sub-role by its ID with new data.
	 * @param {string} id - The ID of the sub-role to be updated.
	 * @param {UpdateRoleDto} dto - The DTO containing updated sub-role data such as name and permissions.
	 * @returns The updated sub-role.
	 */
	updateSubRole(@Payload() data: { id: string; dto: UpdateRoleDto }) {
		return this.settingsService.updateSubRole(data.id, data.dto);
	}

	@MessagePattern(USERS_PATTERN.DELETE_SETTINGS_SUB_ROLE)
	/**
	 * Deletes a sub-role by its ID.
	 *
	 * @param id The ID of the sub-role to be deleted.
	 * @returns A promise that resolves to the result of the deletion operation.
	 */
	deleteSubRole(@Payload() id: string) {
		return this.settingsService.deleteSubRole(id);
	}

	@MessagePattern(USERS_PATTERN.FIND_ALL_SETTINGS_PERMISSION)
	/**
	 * Retrieves all permissions.
	 * @returns A promise that resolves to an array of permissions.
	 */
	getPermissions() {
		return this.settingsService.findPermissions();
	}

	@MessagePattern(USERS_PATTERN.FIND_ALL_SETTINGS_ENTITY_TYPES)
	/**
	 * Retrieves all entity types.
	 *
	 * @returns A promise that resolves to an array of entity types.
	 */
	getEntityTypes() {
		return this.settingsService.findEntityTypes();
	}
}
