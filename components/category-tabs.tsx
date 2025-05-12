'use client';

// src/components/emenu/CategoryTabs.tsx
import { useGetQuery } from '@/src/hooks/queries-actions';
import { ProductCategory } from '@/src/types/product_category';
import { ShopTheme } from '@/src/types/shop';
import { useParams } from 'next/navigation';
import React from 'react';

interface CategoryTabsProps {
    selectedCategoryId: number | null | undefined;
    onSelectCategory: (categoryId: number) => void;
    themeColors: ShopTheme | null;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ selectedCategoryId, onSelectCategory, themeColors }) => {
    const params = useParams();
    const restaurantIdFromParams = params?.id as string;
    const { data: categories } = useGetQuery<ProductCategory[]>({
        url: `/shops/${restaurantIdFromParams}/categories`,
        key: ['categories']
    })
    return (
        <div className="flex gap-x-2 rtl:space-x-reverse overflow-x-auto py-3 px-3 sticky top-0 z-20" style={{backgroundColor: themeColors?.background_color}}>
            {categories?.map(category => (
                <button key={category?.id} onClick={() => onSelectCategory(category?.id)}
                        className={`px-4 md:px-5 py-2 text-xs md:text-sm font-semibold rounded-lg whitespace-nowrap transition-all duration-200 ease-in-out shadow-sm flex-shrink-0`}
                        style={{
                            backgroundColor: selectedCategoryId === category?.id ? themeColors?.primary_color    : themeColors?.primary_color,
                            color: selectedCategoryId === category?.id ? themeColors?.accent_color : '#fff',
                            // border: `1px solid ${selectedCategoryId === category?.id ? themeColors?.accent_color : themeColors?.primary_color}`,
                        }}>
                    {category?.name}
                </button>
            ))}
        </div>
    );
};
export default CategoryTabs;