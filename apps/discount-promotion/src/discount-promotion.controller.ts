import { Controller } from '@nestjs/common';
import { DiscountPromotionService } from './discount-promotion.service';

@Controller()
export class DiscountPromotionController {
	constructor(private readonly discountPromotionService: DiscountPromotionService) {}
}
