import { IsString } from 'class-validator';

export class CreateEntityTypeDto {
	@IsString()
	name: string;
}
