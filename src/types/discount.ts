import { Desk } from "./desk";
import { OrderItem } from "./order";
import { Product } from "./product";
import { Shop } from "./shop";

export interface Discount {
    id: number;
    name: string;
    description?: string;
    type: discount_type;
    value: number;
    is_active: boolean;
    start_date?: Date;
    end_date?: Date;
    coupon_code?: string;
    min_order?: number;
    max_discount?: number;
    usage_limit?: number;
    times_used: number;
    customer_eligibility: CustomerEligibility;
    customer_ids?: number[];
    shop_id: number;
    shop: Shop;
    products: Product[];
    created_at: Date;
    updated_at: Date;
    desks: Desk[];
    order_items: OrderItem[];
}

export enum CustomerEligibility {
    all,
    specific_groups,
    specific_customers,
    first_time_buyers,
    returning_customers
}

export enum discount_type {
    percentage,
    fixed_amount_off,
    fixed_price,
    free_shipping
}
