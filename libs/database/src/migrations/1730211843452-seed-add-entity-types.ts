import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAddEntityTypes1730211843452 implements MigrationInterface {
	name = 'SeedAddEntityTypes1730211843452';
	public async up(queryRunner: QueryRunner): Promise<void> {
		const query = `INSERT INTO "public"."entity_type" ("name") VALUES
        ('Banner Ads'),
        ('Attributes'),
        ('Brands'), 
        ('Category'),
        ('CMS Pages'),
        ('Collection'),
        ('Delivery Locations'),
        ('Home Screen'),
        ('Orders'),
        ('Reported Products'),
        ('Review and Ratings'),
        ('Sliders'),
        ('Coupon Management'),
        ('Gift Cards Management'),
        ('Vouchers Management'),
        ('Users'),
        ('Sub Admins'),
        ('Requested Products'),
        ('Shipping'),
        ('Products'),
        ('HELP/FAQs') 
        ;`;
		await queryRunner.query(query);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE FROM "public"."entity_type" WHERE "name" IN (
            'Banner Ads',
            'Attributes',
            'Brands', 
            'Category',
            'CMS Pages',
            'Collection',
            'Delivery Locations',
            'Home Screen',
            'Orders',
            'Reported Products',
            'Review and Ratings',
            'Sliders',
            'Coupon Management',
            'Gift Cards Management',
            'Vouchers Management',
            'Users',
            'Sub Admins',
            'Requested Products',
            'Shipping',
            'Products',
            'HELP/FAQs'
        )`);
	}
}
