// src/components/emenu/content-panes/MenuContentPane.tsx
import React from 'react';
import { Filter, Search } from 'lucide-react';
import MenuItemCard from '../menu-item-card';
import { Product } from '@/src/types/product';
import { ShopTheme } from '@/src/types/shop';
import SearchInput from '../search-input';

interface MenuContentPaneProps {
    filteredMenuItems: Product[];
    handleAddToCart: (item: Product) => void;
    themeColors: ShopTheme | null;
    searchTerm?: string;
    onSearchChange?: (value: string) => void;
}

const MenuContentPane: React.FC<MenuContentPaneProps> = ({ 
    filteredMenuItems, 
    handleAddToCart, 
    themeColors,
    searchTerm = '',
    onSearchChange = () => {}
}) => {
    // Filter items based on search term
    const searchFilteredItems = searchTerm
        ? filteredMenuItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
          )
        : filteredMenuItems;
        
    return (
    <>
        <div className="mb-4">
            <SearchInput 
                value={searchTerm}
                onChange={onSearchChange}
                onClear={() => onSearchChange('')}
                themeColors={themeColors}
            />
        </div>
        
        {searchFilteredItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"> {/* Responsive grid */}
                {searchFilteredItems.map(item => (
                    <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} themeColors={themeColors} />
                ))}
            </div>
        ) : (
            <div className="text-center py-10 min-h-[300px] flex flex-col justify-center items-center"> {/* Ensure some height */}
                {searchTerm ? (
                    <>
                        <Search size={48} className="mx-auto text-gray-400 mb-4" />
                        <p style={{ color: themeColors?.text_color }}>لا توجد نتائج مطابقة لـ &quot;{searchTerm}&quot;</p>
                    </>
                ) : (
                    <>
                        <Filter size={48} className="mx-auto text-gray-400 mb-4" />
                        <p style={{ color: themeColors?.text_color }}>لا توجد أصناف في هذه الفئة حالياً.</p>
                    </>
                )}
            </div>
        )}
    </>)
}
export default MenuContentPane;