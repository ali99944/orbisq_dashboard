// src/components/emenu/MenuItemCard.tsx
import React from 'react';
import Image from 'next/image';
import { Coffee } from 'lucide-react';
import { Product } from '@/src/types/product';
import { ShopTheme } from '@/src/types/shop';
import { getImageLink } from '@/src/storage';

interface MenuItemCardProps {
    item: Product;
    onAddToCart: (item: Product) => void;
    themeColors: ShopTheme | null;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart, themeColors }) => {
    const isAvailable = item.is_active
    return (
        <div className={`rounded-lg overflow-hidden flex flex-col h-full transition-all duration-300 ease-in-out ${!isAvailable ? 'opacity-60' : 'border border-gray-300'}`}
             style={{ borderColor: themeColors?.secondary_color, backgroundColor: isAvailable ? themeColors?.accent_color : '#E9E9E9' }}>
            <div className="relative w-full aspect-[4/3]"> {/* Maintain aspect ratio for responsiveness */}
                <Image src={getImageLink(item?.image) ?? ''} alt={item.name} layout="fill" objectFit="cover" className={`rounded-t-lg ${!isAvailable ? 'filter grayscale' : ''}`} />
                {!isAvailable && <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-t-lg"><span className="text-white font-semibold text-xs px-2 py-1 bg-red-600 rounded">غير متوفر</span></div>}
            </div>
            <div className="p-2 md:p-3 flex flex-col flex-grow"> {/* Responsive padding */}
                <h3 className="text-sm md:text-base font-semibold mb-0.5 truncate" style={{ color: themeColors?.accent_color }}>{item.name}</h3>
                <p className="text-xs md:text-sm text-gray-500 mb-1 truncate" style={{color: themeColors?.text_color, opacity: 0.7}}>{item.name}</p>
                <p className="text-base md:text-lg font-bold mb-2" style={{ color: themeColors?.primary_color }}>${(item.price ?? 0).toFixed(2)}</p>
                {isAvailable ? (
                    <button onClick={() => onAddToCart(item)} className="mt-auto w-full flex items-center justify-center gap-2 px-3 py-1.5 md:py-2 rounded-md text-white font-medium text-xs md:text-sm shadow-sm transition-transform duration-150 ease-out active:scale-[0.97]" style={{ backgroundColor: themeColors?.primary_color }} aria-label={`Add ${item.name} to cart`}>
                        <Coffee size={14} className="md:w-4 md:h-4" /> أضف للطلب
                    </button>
                ) : (
                     <button disabled className="mt-auto w-full flex items-center justify-center gap-2 px-3 py-1.5 md:py-2 rounded-md text-gray-400 bg-gray-300 font-medium text-xs md:text-sm cursor-not-allowed">
                        <Coffee size={14} className="md:w-4 md:h-4" /> غير متوفر
                    </button>
                )}
            </div>
        </div>
    );
};
export default MenuItemCard;