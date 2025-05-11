// src/types/restaurant.ts

export interface RestaurantSettings {
    'remove-branding'?: boolean;
}

// Define types for the _raw nested data if you plan to use them directly
// For simplicity, keeping them as 'unknown' here, but you can create detailed types.
export interface RawShopData {
    address?: unknown;
    contact_info?: unknown;
    social_links?: unknown;
    shop_theme?: unknown;
    business_info?: unknown;
    currency_info?: unknown;
    shop_owner?: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
    } | null;
}

export interface Restaurant {
    id: string;
    name: string;
    description?: string | null;
    logo?: string | null;
    cover?: string | null; // Mapped from 'cover' in backend
    
    contact_info: {
        whatsapp?: string | null;
        phone?: string | null;
    }
    social_links: {
        facebook?: string | null;
        instagram?: string | null;
        twitter?: string | null;
        youtube?: string | null;
        tiktok?: string | null;
        linkedin?: string | null;
        snapchat?: string | null;
        pinterest?: string | null;
        telegram?: string | null;
    }

    theme_primary_color?: string | null;
    theme_secondary_color?: string | null;
    theme_accent_color?: string | null;
    theme_text_color?: string | null;
    // theme_background_image?: string | null; // If backend provides and frontend uses

    has_delivery?: boolean | null;
    has_takeaway?: boolean | null;
    has_reservation?: boolean | null;
    has_dine_in?: boolean | null;

    address_street?: string | null;
    address_city?: string | null;
    address_country?: string | null;
    geo_latitude?: number | null;
    geo_longitude?: number | null;

    opening_hours?: unknown | null; // Expecting JSON; parse on frontend if needed
    timezone?: string | null;
    language?: string | null;
    rating?: number | null;
    review_count?: number | null;

    shop_owner_name?: string | null;
    shop_owner_contact_info?: string | null; // Example: "Contact: email@example.com"

    settings?: RestaurantSettings | null;

    _raw?: RawShopData | null; // Optional: if frontend needs access to original nested structures
}