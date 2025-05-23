// src/components/emenu/MenuItemCard.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { Coffee } from 'lucide-react';
import { Product, Modifier } from '@/src/types/product';
import { Shop, ShopTheme } from '@/src/types/shop';
import { getImageLink } from '@/src/storage';
import ProductModifiersModal from './product-modifiers-modal';
import { useGetQuery } from '@/src/hooks/queries-actions';
import { useParams } from 'next/navigation';

interface MenuItemCardProps {
    item: Product;
    onAddToCart: (item: Product) => void;
    themeColors: ShopTheme | null;
    showAddToCartButton?: boolean;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart, themeColors, showAddToCartButton = true }) => {
    const isAvailable = item.is_active;
    const [showModifiersModal, setShowModifiersModal] = useState(false);
    
    const handleAddToCartClick = () => {
        // Check if product has modifiers
        if (item.modifiers && item.modifiers.length > 0) {
            setShowModifiersModal(true);
        } else {
            // No modifiers, add directly to cart
            onAddToCart(item);
        }
    };
    
    const handleAddWithModifiers = (product: Product, selectedModifiers: Modifier[]) => {
        // Create a new product object with the selected modifiers
        const productWithModifiers = {
            ...product,
            selectedModifiers // This will be used when adding to cart
        };
        onAddToCart(productWithModifiers);
    };
    const params = useParams();
    const restaurantIdFromParams = params?.id as string;
    
    const { data: shop } = useGetQuery<Shop>({
        url: `/shops/${restaurantIdFromParams}`,
        key: ['shop']
    })
    
    return (
        <>
            <div className={`rounded-lg overflow-hidden flex flex-col h-full transition-all duration-300 ease-in-out ${!isAvailable ? 'opacity-60' : 'border border-gray-300'}`}
                style={{ borderColor: themeColors?.primary_color + '40',  backgroundColor: isAvailable ? 'transparent' : '#E9E9E9', boxShadow: isAvailable ? `0 2px 4px ${themeColors?.accent_color}` : 'none' }}>
                <div className="relative w-full aspect-[3/3]"> {/* Maintain aspect ratio for responsiveness */}
                    <Image src={getImageLink(item?.image) ?? ''} alt={item.name} layout="fill" objectFit="cover" className={`rounded-t-lg ${!isAvailable ? 'filter grayscale' : ''}`} />
                    {!isAvailable && <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-t-lg"><span className="text-white font-semibold text-xs px-2 py-1 bg-red-600 rounded">غير متوفر</span></div>}
                </div>
                <div className="p-2 md:p-3 flex flex-col flex-grow flex-wrap"> {/* Responsive padding */}
                    <div className="min-h-[2.5rem] md:min-h-[3rem]">
                        <h3 className="text-sm md:text-base font-semibold mb-0.5" style={{ color: themeColors?.primary_color }}>{item.name}</h3>
                        <p className="text-xs md:text-sm text-gray-500 mb-1 " style={{color: themeColors?.text_color, opacity: 0.7}}>{item.description}</p>
                    </div>
                    <p className="text-base md:text-lg font-bold mb-2" style={{ color: themeColors?.primary_color }}>{shop?.currency_info.currency_code}{(item.price ?? 0).toFixed(2)}</p>
                    {showAddToCartButton && isAvailable ? (
                        <button 
                            onClick={handleAddToCartClick} 
                            className="mt-auto w-full flex items-center justify-center gap-2 px-3 py-1.5 md:py-2 rounded-md text-white font-medium text-xs md:text-sm shadow-sm transition-transform duration-150 ease-out active:scale-[0.97]" 
                            style={{ backgroundColor: themeColors?.primary_color }} 
                            aria-label={`Add ${item.name} to cart`}
                        >
                            <Coffee size={14} className="md:w-4 md:h-4" /> أضف للطلب
                        </button>
                    ) : showAddToCartButton && !isAvailable ? (
                        <button disabled className="mt-auto w-full flex items-center justify-center gap-2 px-3 py-1.5 md:py-2 rounded-md text-gray-400 bg-gray-300 font-medium text-xs md:text-sm cursor-not-allowed">
                            <Coffee size={14} className="md:w-4 md:h-4" /> غير متوفر
                        </button>
                    ) : null}
                </div>
            </div>
            
            {/* Modifiers Modal */}
            {showAddToCartButton && (
                <ProductModifiersModal 
                    isOpen={showModifiersModal}
                    onClose={() => setShowModifiersModal(false)}
                    product={item}
                    onAddToCart={handleAddWithModifiers}
                    themeColors={themeColors}
                />
            )}
        </>
    );
};
export default MenuItemCard;