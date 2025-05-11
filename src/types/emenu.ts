import { Product } from "./product";

// src/types/emenu.ts
export interface MenuItem {
    product: Product
    quantity?: number; // For cart
}

export interface MenuCategory {
    id:string;
    name: string;
    name_ar: string;
}

export interface BaseRestaurant {
    id: string;
    code: string;
    name: string;
    description?: string;
    logo?: string;
    image?: string;
    theme_primary_color?: string;
    theme_secondary_color?: string;
    theme_accent_color?: string;
    theme_text_color?: string;
}

export interface Restaurant extends BaseRestaurant {
    menu_categories: MenuCategory[];
    menu_items: MenuItem[];
}

export interface ThemeColors {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
}

export type NavTab = 'menu' | 'orders' | 'cart';