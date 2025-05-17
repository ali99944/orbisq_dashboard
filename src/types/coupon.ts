import { Product } from './product';
import { Shop } from './shop';

export enum DiscountType {
  PERCENTAGE = 'percentage',
  FIXED_AMOUNT_OFF = 'fixed_amount_off',
  FIXED_PRICE = 'fixed_price',
  FREE_SHIPPING = 'free_shipping'
}

export interface Coupon {
  id: number;
  code: string;
  description?: string;
  discount_type: DiscountType;
  discount_value: number;
  min_order_amount?: number;
  max_discount?: number;
  expires_at?: Date;
  is_active: boolean;
  usage_limit?: number;
  per_user_limit?: number;
  times_used: number;
  shop_id: number;
  shop?: Shop;
  product_restrictions?: Product[];
  created_at: Date;
  updated_at: Date;
}

export interface AppliedCoupon {
  coupon: Coupon;
  discountAmount: number;
}