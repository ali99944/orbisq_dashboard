// src/components/emenu/content-panes/MenuContentPane.tsx
import React from 'react';
import { Filter } from 'lucide-react';
import MenuItemCard from '../menu-item-card';
import { Product } from '@/src/types/product';
import { ShopTheme } from '@/src/types/shop';

interface MenuContentPaneProps {
    filteredMenuItems: Product[];
    handleAddToCart: (item: Product) => void;
    themeColors: ShopTheme | null;
}

const MenuContentPane: React.FC<MenuContentPaneProps> = ({ filteredMenuItems, handleAddToCart, themeColors }) => (
    <>
        {filteredMenuItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"> {/* Responsive grid */}
                {filteredMenuItems.map(item => (
                    <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} themeColors={themeColors} />
                ))}
            </div>
        ) : (
            <div className="text-center py-10 min-h-[300px] flex flex-col justify-center items-center"> {/* Ensure some height */}
                <Filter size={48} className="mx-auto text-gray-400 mb-4" />
                <p style={{ color: themeColors?.text_color }}>لا توجد أصناف في هذه الفئة حالياً.</p>
            </div>
        )}
    </>
);
export default MenuContentPane;