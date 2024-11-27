import { Controller } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller()
export class CatalogController {
	constructor(private readonly catalogService: CatalogService) {}
}
