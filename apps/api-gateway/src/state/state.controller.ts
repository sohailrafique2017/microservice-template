import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { UpdateStateDto } from '@app/contract/users/dto/state/update.state.dto';
import { CreateStateDto } from '@app/contract/users/dto/state/create.state.dto';
import { API_VERSION } from '@app/common/enums';
import { USERS_CLIENT } from '@app/contract/constant';
import { USERS_PATTERN } from '@app/contract/users/pattern/users.pattern';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CONSTANTS } from '../utils/constant';
import { ROLE } from '@app/database/enums';
import { RequirePermisison } from '../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/role.guard';

@ApiTags(CONSTANTS.STATE_CONTROLLER)
@Controller({ path: CONSTANTS.STATE_CONTROLLER, version: API_VERSION.V1 })
export class StateController {
	constructor(@Inject(USERS_CLIENT) private readonly authClient: ClientProxy) {}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Post()
	/**
	 * Creates a new state.
	 *
	 * @param createStateDto The state's information.
	 * @returns The created state.
	 */
	create(@Body() createStateDto: CreateStateDto) {
		return this.authClient.send(USERS_PATTERN.CREATE_STATE, createStateDto);
	}

	@Get()
	/**
	 * Retrieves all states.
	 *
	 * @returns An array of state entities.
	 */
	findAll() {
		return this.authClient.send(USERS_PATTERN.FIND_ALL_STATE, {});
	}

	@Get(':id')
	/**
	 * Retrieves a state by its ID.
	 *
	 * @param id The ID of the state to find.
	 * @returns The found state.
	 */
	findOne(@Param('id') id: string) {
		return this.authClient.send(USERS_PATTERN.FIND_ONE_STATE, id);
	}

	@Get('country/:id')
	/**
	 * Retrieves all states by country ID.
	 *
	 * @param id The ID of the country to find states.
	 * @returns An array of state entities.
	 */
	findStateByCountry(@Param('id') id: string) {
		return this.authClient.send(USERS_PATTERN.FIND_STATE_BY_COUNTRY, id);
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Patch(':id')
	/**
	 * Updates a state by its ID.
	 *
	 * @param id The ID of the state to update.
	 * @param updateStateDto The updated state data.
	 * @returns The updated state.
	 */
	update(@Param('id') id: string, @Body() updateStateDto: UpdateStateDto) {
		return this.authClient.send(USERS_PATTERN.UPDATE_STATE, { id, dto: updateStateDto });
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Delete(':id')
	/**
	 * Deletes a state by its ID.
	 *
	 * @param id The ID of the state to delete.
	 * @returns The deletion result.
	 */
	remove(@Param('id') id: string) {
		return this.authClient.send(USERS_PATTERN.REMOVE_STATE, id);
	}
}
