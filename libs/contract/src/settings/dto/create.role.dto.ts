import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { PermissionDto } from './create.permission.dto';
export class CreateRoleDto {
	@ApiProperty({ example: 'Marketing Manager', description: 'The name of the role' })
	@IsNotEmpty({ message: 'Please enter name' })
	name: string;

	@ApiProperty({
		type: [PermissionDto],
		description: 'Array of permissions associated with the role',
		example: [
			{
				entity_type_id: 'uuid',
				permission_id: ['uuid', 'uuid'],
			},
		],
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => PermissionDto)
	permissions: PermissionDto[];
}
