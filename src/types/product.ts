import { Coupon } from "./desk";
import { Discount } from "./discount";
import { ProductCategory } from "./product_category";
import { Shop } from "./shop";

export interface Product {
    id: number;
    name: string;
    image?: string | null;
    description?: string;
    short_description?: string;
    calories?: number;
    prepare_time?: number;
    protein?: number;
    carbohydrates?: number;
    fat?: number;
    allergens?: string;
    product_category_id: number;
    product_category: ProductCategory;
    tax_id?: number;
    // tax?: Tax;
    discount_id?: number;
    discount?: Discount;
    is_active: boolean;
    is_featured: boolean;
    is_retail: boolean;
    sku_number?: string;
    reference_code?: string;
    barcode?: string;
    price?: number;
    cost_price?: number;
    pricing_type: PricingType;
    sales_unit_type: SalesUnitType;
    cost_calculation_unit: CostCalculationUnit;
    stock: number;
    low_stock_threshold?: number;
    sort_order: number;
    has_variants: boolean;
    // modifier_groups: ProductModifierGroup[];
    // addon_groups: ProductAddonGroup[];
    shop_id?: number;
    shop?: Shop;
    created_at: Date;
    updated_at: Date;
    coupons: Coupon[];
}

enum PricingType {
    FIXED = 'fixed',
    DYNAMIC = 'dynamic'
}

enum SalesUnitType {
    PIECE = 'piece',
    WEIGHT = 'weight',
    VOLUME = 'volume',
    LENGTH = 'length'
}

enum CostCalculationUnit {
    INGREDIENT = 'ingredient',
    OPERATION = 'operation',
    TIME_BASED = 'time_based'
}

