import { Product } from "./product";
import { Shop } from "./shop";

export interface ProductCategory {
    id: number;
    name: string;
    description?: string;
    image?: string;
    reference_code: string;
    total_products: number;
    is_active: boolean;
    sort_order: number;
    slug?: string;
    display_mode: DisplayMode;
    shop_id?: number;
    shop?: Shop;
    products: Product[];
    created_at: Date;
    updated_at: Date;
}

export enum DisplayMode {
    LIST = 'list',
    GRID = 'grid',
    CARD = 'card',
}
