import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '@app/contract/users/dto/create.user.dto';
import { UpdateUserDto } from '@app/contract/users/dto/update.user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequirePermisison } from '@app/api-gateway/auth/decorators/role.decorator';
import { ROLE } from '@app/database/enums';
import { CONSTANTS } from '@app/api-gateway/utils/constant';
import { API_VERSION } from '@app/common/enums';
import { JwtAuthGuard } from '@app/api-gateway/auth/guards/jwt.guard';
import { RolesGuard } from '@app/api-gateway/auth/guards/role.guard';

@ApiTags(CONSTANTS.USER_CONTROLLER)
@Controller({ path: CONSTANTS.USER_CONTROLLER, version: API_VERSION.V1 })
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Post()
	/**
	 * Create a new user.
	 * @param createUserDto The user data to create a new user.
	 * @returns The created user.
	 */
	create(@Body() createUserDto: CreateUserDto) {
		const user = this.userService.create(createUserDto);
		return user;
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Get()
	/**
	 * Finds all users.
	 * @returns All users.
	 */
	findAll() {
		return this.userService.findAll();
	}
	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Get(':id')
	/**
	 * Find a user by ID.
	 * @param id The ID of the user to find.
	 * @returns The user with the given ID.
	 */
	findOne(@Param('id') id: string) {
		return this.userService.findOne(id);
	}
	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Patch(':id')
	/**
	 * Updates a user.
	 * @param id The ID of the user to update.
	 * @param updateUserDto The user data to update the user.
	 * @returns The updated user.
	 */
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(id, updateUserDto);
	}
	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Delete(':id')
	/**
	 * Deletes a user.
	 * @param id The ID of the user to delete.
	 * @returns The deleted user.
	 */
	remove(@Param('id') id: string) {
		return this.userService.remove(id);
	}
}
