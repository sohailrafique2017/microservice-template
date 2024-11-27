import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class PermissionDto {
	@ApiProperty({ example: 'uuid', description: 'The ID of the service associated with the permission' })
	@IsString()
	entity_type_id: string;

	@ApiProperty({
		example: ['uuid', 'uuid'],
		description: 'Array of permission IDs granted to the role for the given service',
	})
	@IsArray()
	permission_id: string[]; // Array of permission IDs
}
