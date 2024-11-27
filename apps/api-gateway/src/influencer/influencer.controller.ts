import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InfluencerService } from './influencer.service';
import { CONSTANTS } from '@app/api-gateway/utils/constant';
import { API_VERSION } from '@app/common/enums';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ROLE } from '@app/database/enums';
import { RequirePermisison } from '@app/api-gateway/auth/decorators/role.decorator';
import { JwtAuthGuard } from '@app/api-gateway/auth/guards/jwt.guard';
import { RolesGuard } from '@app/api-gateway/auth/guards/role.guard';
import { CreateInfluencerDto } from '@app/contract/users/dto/create.influencer.dto';
import { UpdateInfluencerDto } from '@app/contract/users/dto/update.influencer.dto';

@ApiTags(CONSTANTS.INFLUENCER_CONTROLLER)
@Controller({ path: CONSTANTS.INFLUENCER_CONTROLLER, version: API_VERSION.V1 })
export class InfluencerController {
	constructor(private readonly influencerService: InfluencerService) {}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Post()
	/**
	 * Creates a new influencer.
	 * @param createInfluencerDto The influencer data to create.
	 * @returns The newly created influencer.
	 */
	create(@Body() createInfluencerDto: CreateInfluencerDto) {
		return this.influencerService.create(createInfluencerDto);
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Get()
	/**
	 * Find all influencers.
	 *
	 * @returns All influencers.
	 */
	findAll() {
		return this.influencerService.findAll();
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Get(':id')
	/**
	 * Finds an influencer by ID.
	 *
	 * @param id The unique identifier of the influencer to find.
	 * @returns A promise that resolves to the influencer with the given ID.
	 */
	findOne(@Param('id') id: string) {
		return this.influencerService.findOne(id);
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Patch(':id')
	/**
	 * Updates an influencer by ID.
	 * @param id The unique identifier of the influencer to update.
	 * @param updateInfluencerDto The updated influencer data.
	 * @returns A promise that resolves to the updated influencer.
	 */
	update(@Param('id') id: string, @Body() updateInfluencerDto: UpdateInfluencerDto) {
		return this.influencerService.update(id, updateInfluencerDto);
	}

	@ApiBearerAuth(CONSTANTS.BEARER_AUTH)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@RequirePermisison(ROLE.SUPER_ADMIN)
	@Delete(':id')
	/**
	 * Deletes an influencer by ID.
	 * @param id The unique identifier of the influencer to delete.
	 * @returns A promise that resolves to the deletion result.
	 */
	remove(@Param('id') id: string) {
		return this.influencerService.remove(id);
	}
}
