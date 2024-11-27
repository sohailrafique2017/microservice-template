import { Module } from '@nestjs/common';
import { DiscountPromotionController } from './discount-promotion.controller';
import { DiscountPromotionService } from './discount-promotion.service';

@Module({
	imports: [],
	controllers: [DiscountPromotionController],
	providers: [DiscountPromotionService],
})
export class DiscountPromotionModule {}
