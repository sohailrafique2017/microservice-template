import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StateService } from './state.service';
import { CreateStateDto } from '@app/contract/users/dto/state/create.state.dto';
import { UpdateStateDto } from '@app/contract/users/dto/state/update.state.dto';
import { USERS_PATTERN } from '@app/contract/users/pattern/users.pattern';

@Controller()
export class StateController {
	constructor(private readonly stateService: StateService) {}

	@MessagePattern(USERS_PATTERN.CREATE_STATE)
	/**
	 * Creates a new state.
	 *
	 * @param createStateDto The state's information.
	 * @returns The created state.
	 */
	create(@Payload() createStateDto: CreateStateDto) {
		return this.stateService.create(createStateDto);
	}

	@MessagePattern(USERS_PATTERN.FIND_ALL_STATE)
	/**
	 * Retrieves all states.
	 *
	 * @returns An array of states.
	 */
	findAll() {
		return this.stateService.findAll();
	}

	@MessagePattern(USERS_PATTERN.FIND_ONE_STATE)
	/**
	 * Retrieves a state by its ID.
	 *
	 * @param id The ID of the state to find.
	 * @returns The found state.
	 */
	findOne(@Payload() id: string) {
		return this.stateService.findOne(id);
	}

	@MessagePattern(USERS_PATTERN.FIND_STATE_BY_COUNTRY)

	/**
	 * Retrieves all states by country ID.
	 *
	 * @param id The ID of the country to find states.
	 * @returns An array of state entities.
	 */
	findStateByCountry(@Payload() id: string) {
		return this.stateService.findStateByCountry(id);
	}

	@MessagePattern(USERS_PATTERN.UPDATE_STATE)
	/**
	 * Updates a state by its ID.
	 *
	 * @param data The object containing the ID of the state to update and the updated state data.
	 * @returns The updated state.
	 */
	update(@Payload() data: { id: string; dto: UpdateStateDto }) {
		return this.stateService.update(data.id, data.dto);
	}

	@MessagePattern(USERS_PATTERN.REMOVE_STATE)
	/**
	 * Deletes a state by its ID.
	 *
	 * @param id The ID of the state to delete.
	 * @returns The deletion result.
	 */
	remove(@Payload() id: string) {
		return this.stateService.remove(id);
	}
}
