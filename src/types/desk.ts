export enum desk_status {
    free,
    occupied,
    reserved,
    cleaning,
    out_of_service
}

enum discount_type {
    percentage,
    amount
}

export interface Desk {
    id: number
    desk_number: number
    number_of_seats: number
    qrcode: string
    name?: string
    section?: string
    floor?: number
    position_x?: number
    position_y?: number
    status: desk_status
    reservation_time?: Date
    occupation_time?: Date
    customer_id?: number
    discount_id?: number
    minimum_spend?: number
    has_outlets?: boolean
    has_view?: boolean
    is_wheelchair_accessible?: boolean
    needs_cleaning?: boolean
    is_under_maintenance?: boolean
    maintenance_notes?: string
    branch_id: number
    created_at: Date
    updated_at: Date
}

export interface Coupon {
    id: number
    code: string
    description?: string
    discount_type: discount_type
    discount_value: number
    min_order_amount?: number
    max_discount?: number
    start_date: Date
    end_date: Date
    is_active: boolean
    usage_limit?: number
    per_user_limit?: number
    times_used: number
    shop_id: number
    branch_id?: number
}
