import { Coupon, Desk } from "./desk";

export interface Branch {
  id: number;
  name: string;
  code: string;
  slug: string;
  is_main: boolean;
  status: BranchStatus;
  opening_date: Date | null;
  timezone: string;
  locale: string;
  tax_id_number: string | null;
  manager_id: number | null;
  contact_person: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  accepts_reservations: boolean;
  accepts_walkins: boolean;
  has_delivery: boolean;
  has_pickup: boolean;
  has_dine_in: boolean;
  total_capacity: number | null;
  current_occupancy: number;
  monthly_sales: number;
  average_rating: number | null;
  shop_id: number;
  address_id: number | null;
  operating_hours: BranchOperatingHour[];
  menus: BranchMenu[];
  staff: BranchStaff[];
  desks: Desk[];
  terminals: POSTerminal[];
  inventory: BranchInventory[];
  coupons: Coupon[];
//   coupon_redemptions: CouponRedemption[];
//   gift_cards: GiftCard[];
  created_at: Date;
  updated_at: Date;
}

export interface BranchOperatingHour {
  id: number;
  branch_id: number;
  day_of_week: DayOfWeek;
  opening_time: string | null;
  closing_time: string | null;
  is_closed: boolean;
  special_note: string | null;
}

export interface BranchMenu {
  id: number;
  branch_id: number;
  menu_id: number;
  is_active: boolean;
  available_from: Date | null;
  available_to: Date | null;
}

export interface BranchStaff {
  id: number;
  branch_id: number;
  user_id: number;
  position: string | null;
  is_active: boolean;
  joined_at: Date;
  left_at: Date | null;
}

export interface POSTerminal {
  id: number;
  branch_id: number;
  name: string;
  device_id: string;
  type: TerminalType;
  is_active: boolean;
  last_active_at: Date | null;
}

export interface BranchInventory {
  id: number;
  branch_id: number;
  product_id: number | null;
  ingredient_id: number | null;
  current_stock: number;
  low_stock_threshold: number | null;
  last_updated_at: Date;
  last_updated_by: number | null;
}

export enum BranchStatus {
  active,
  inactive,
  opening_soon,
  closed_temporary,
  closed_permanent,
  under_renovation,
}

export enum TerminalType {
  cash_register,
  kitchen_printer,
  handheld,
  self_service,
  mobile,
}

export enum DayOfWeek {
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
}
