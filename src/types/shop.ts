import { Branch } from "./branch"
import { Desk, Coupon } from "./desk"
import { Discount } from "./discount"
import { Order } from "./order"
import { Product } from "./product"
import { ProductCategory } from "./product_category"

export interface Shop {
    id: number
    name: string
    slug: string
    logo?: string
    cover?: string
    description?: string
    address?: Address
    address_id?: number
    contact_info?: ContactInfo
    contact_info_id?: number
    social_links?: SocialLink
    social_links_id?: number
    currency_info: CurrencyInfo
    currency_info_id: number
    business_info: BusinessInfo
    business_info_id: number
    shop_theme: ShopTheme
    shop_theme_id: number
    status: ShopStatus
    orders_count: number
    views_count: number
    last_sale_at?: Date
    opening_hours?: string
    timezone?: string
    language?: string
    rating?: number
    review_count?: number
    payment_methods?: string[]
    fulfillment_types?: string[]
    created_at: Date
    updated_at: Date
    desks: Desk[]
    orders: Order[]
    // gift_cards: GiftCard[]
    branches: Branch[]
    coupons: Coupon[]
    categories: ProductCategory[]
    products: Product[]
    discounts: Discount[]
    access_portal?: ShopAccessPortal
    shop_owner_id: number
    shop_owner: ShopOwner
}

export interface Address {
    id: number
    street?: string
    city?: string
    state?: string
    country?: string
    postal_code?: string
    latitude?: number
    longitude?: number
    is_primary: boolean
    notes?: string
    shop?: Shop
    shop_id?: number
    created_at: Date
    updated_at: Date
    branches: Branch[]
}

export interface ContactInfo {
    id: number
    phone?: string
    mobile?: string
    email?: string
    website?: string
    support_email?: string
    whatsapp?: string
    telegram?: string
    shop?: Shop
    shop_id?: number
    created_at: Date
    updated_at: Date
    branches: Branch[]
}

export interface SocialLink {
    id: number
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
    whatsapp?: string
    telegram?: string
    snapchat?: string
    youtube?: string
    tiktok?: string
    pinterest?: string
    follower_count?: number
    shop?: Shop
    created_at: Date
    updated_at: Date
}

export interface CurrencyInfo {
    id: number
    currency: string
    currency_symbol: string
    currency_code: string
    decimal_places: number
    exchange_rate?: number
    is_default: boolean
    shop?: Shop
    created_at: Date
    updated_at: Date
}

export interface BusinessInfo {
    id: number
    has_delivery: boolean
    has_takeaway: boolean
    has_reservation: boolean
    has_dine_in: boolean
    has_through_drive: boolean
    delivery_cost: number
    minimum_order?: number
    delivery_radius?: number
    preparation_time?: number
    vat_rate: number
    vat_type: VatType
    vat_number?: string
    vat_certificate_url?: string
    commercial_license?: string
    license_url?: string
    opening_time?: string
    closing_time?: string
    shop?: Shop
    created_at: Date
    updated_at: Date
}

export interface ShopTheme {
    id: number
    primary_color: string
    secondary_color: string
    accent_color: string
    text_color: string
    background_color?: string
    background_image?: string
    shop?: Shop
    shop_id?: number
    created_at: Date
    updated_at: Date
}

export enum VatType {
    Inclusive,
    Exclusive
}

export enum ShopStatus {
    Active,
    Inactive,
    PendingApproval,
    Suspended,
    OnBreak
}

export interface ShopOwner {
    id: number
    first_name: string
    last_name: string
    email: string
    phone: string
    password: string
    is_active: boolean
    email_verified: boolean
    phone_verified: boolean
    last_login_at?: Date
    created_at: Date
    updated_at: Date
    shops: Shop[]
    // access_tokens: ShopAccessToken[]
}

export interface ShopAccessPortal {
    id: number
    shop_id: number
    username: string
    password: string
    is_active: boolean
    last_login_at?: Date
    // permissions?: any
    created_at: Date
    updated_at: Date
    shop: Shop
    // access_tokens: ShopAccessToken[]
}
