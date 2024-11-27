import { Controller, Get, Post, Param, Body, Delete, UseGuards, Patch } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateRoleDto } from '@app/contract/settings/dto/create.role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { API_VERSION } from '@app/common/enums';
import { CONSTANTS } from '@app/api-gateway/utils/constant';
import { ROLE } from '@app/database/enums';
import { RequirePermisison } from '@app/api-gateway/auth/decorators/role.decorator';
import { JwtAuthGuard } from '@app/api-gateway/auth/guards/jwt.guard';
import { RolesGuard } from '@app/api-gateway/auth/guards/role.guard';
import { UpdateRoleDto } from '@app/contract/settings/dto/update.role';

@ApiTags(CONSTANTS.SETTINGS_CONTROLLER)
@Controller({ path: CONSTANTS.SETTINGS_CONTROLLER, version: API_VERSION.V1 })
export class SettingsController {
	constructor(private readonly settingsService: SettingsService) {}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	// Role Endpoints
	@Post('role')
	/**
	 * Create a new sub-role.
	 *
	 * @param createRoleDto The create role DTO containing the sub-role name and permissions.
	 * @returns The newly created sub-role.
	 */
	createSubRole(@Body() createRoleDto: CreateRoleDto) {
		return this.settingsService.createSubRole(createRoleDto);
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Get('roles')
	/**
	 * Get all sub-roles.
	 *
	 * @returns An array of sub-roles.
	 */
	getSubRoles() {
		return this.settingsService.findSubRoles();
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Get('role/:id')
	/**
	 * Get a sub-role by its ID.
	 *
	 * @param id The ID of the sub-role to be retrieved.
	 * @returns The sub-role with the given ID.
	 */
	getSubRoleById(@Param('id') id: string) {
		return this.settingsService.findSubRoleById(id);
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Patch('role/:id')
	/**
	 * Update a sub-role by its ID.
	 *
	 * @param id The ID of the sub-role to be updated.
	 * @param updateRoleDto The DTO containing updated sub-role data such as name and permissions.
	 * @returns The updated sub-role.
	 */
	updateSubRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
		return this.settingsService.updateSubRole(id, updateRoleDto);
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Delete('role/:id')
	/**
	 * Delete a sub-role by its ID.
	 *
	 * @param id The ID of the sub-role to be deleted.
	 * @returns The result of the deletion operation.
	 */
	deleteSubRole(@Param('id') id: string) {
		return this.settingsService.deleteSubRole(id);
	}

	// Permission Endpoints

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Get('permissions')
	/**
	 * Retrieve all permissions.
	 *
	 * @returns An array of permissions.
	 */
	getPermissions() {
		return this.settingsService.findPermissions();
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Get('entity-types')
	/**
	 * Retrieve all entity types.
	 *
	 * @returns An array of entity types.
	 */
	getEntityTypes() {
		return this.settingsService.findEntityTypes();
	}
}
