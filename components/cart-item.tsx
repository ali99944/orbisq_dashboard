// src/components/emenu/CartItem.tsx
import React from 'react';
import Image from 'next/image';
import { Plus, Minus, X } from 'lucide-react';
import { MenuItem } from '@/src/types/emenu';
import { ShopTheme } from '@/src/types/shop';
import { getImageLink } from '@/src/storage';

interface CartItemProps {
    item: MenuItem;
    themeColors: ShopTheme | null;
    onIncreaseQuantity: (itemId: number) => void;
    onDecreaseQuantity: (itemId: number) => void;
    onRemoveItem: (itemId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, themeColors, onIncreaseQuantity, onDecreaseQuantity, onRemoveItem }) => {
    console.log(item);
    
    return (
        <div className="flex items-center justify-between p-2 md:p-3 rounded-lg" style={{ backgroundColor: `${themeColors?.primary_color}10`, border: `1px solid ${themeColors?.primary_color}30`}}>
            <div className="flex items-center gap-2 md:gap-3 flex-grow">
                <Image src={getImageLink(item.product.image) ?? ''} alt={item.product.name} width={50} height={50} className="rounded-md object-cover w-[50px] h-[50px] md:w-[60px] md:h-[60px]" />
                <div className="flex-grow">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                        <h3 className="text-sm md:text-base font-semibold" style={{color: themeColors?.primary_color}}>
                            {item.product.name}
                        </h3>
                        {/* Display required modifier (nullable price) */}
                        {item.product.selectedModifiers?.find(mod => mod.price_adjustment === null) && (
                            <span className="text-xs font-medium" style={{color: themeColors?.text_color}}>
                                {item.product.selectedModifiers.find(mod => mod.price_adjustment === null)?.name}
                            </span>
                        )}
                    </div>
                    
                    {/* Display optional extras (non-nullable price) */}
                    {item.product.selectedModifiers?.some(mod => mod.price_adjustment !== null) && (
                        <div className="mt-1.5 bg-white/50 rounded-md p-1.5 space-y-1">
                            {item.product.selectedModifiers
                                .filter(modifier => modifier.price_adjustment !== null)
                                .map((modifier, index) => (
                                    <div key={`modifier-${index}`} className="flex items-center justify-between text-xs px-1">
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1 h-1 rounded-full opacity-60" style={{ backgroundColor: themeColors?.primary_color }} />
                                            <span style={{color: themeColors?.text_color}}>
                                                {modifier.name}
                                            </span>
                                        </div>
                                        {(modifier?.price_adjustment ?? 0) > 0 && (
                                            <span className="font-medium tabular-nums" style={{color: themeColors?.primary_color}}>
                                                +{(modifier?.price_adjustment ?? 0).toFixed(2)} ج.م
                                            </span>
                                        )}
                                    </div>
                            ))}
                        </div>
                    )}
                    
                    <p className="text-xs md:text-sm" style={{color: themeColors?.primary_color}}>
                        ${(
                            ((item.product.price ?? 0) + 
                            (item.selectedModifiers?.reduce((sum, mod) => sum + (mod.price_adjustment ?? 0), 0) ?? 0)) * 
                            (item.quantity ?? 0)
                        ).toFixed(2)}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-1 md:gap-2 ml-2">
                <button
                    onClick={() => onIncreaseQuantity(item.product.id)}
                    className="p-1 rounded-full"
                    style={{ backgroundColor: `${themeColors?.primary_color}`, color: themeColors?.accent_color }}
                    aria-label="Increase quantity"
                >
                    <Plus size={14} className="md:w-4 md:h-4" />
                </button>
                <span className="text-sm md:text-base font-medium w-5 text-center" style={{color: themeColors?.primary_color}}>
                    {(item.quantity ?? 0)}
                </span>
                {(item.quantity ?? 0) > 1 ? (
                    <button
                        onClick={() => onDecreaseQuantity(item.product.id)}
                        className="p-1 rounded-full"
                        style={{ backgroundColor: `${themeColors?.primary_color}30`, color: themeColors?.accent_color }}
                        aria-label="Decrease quantity"
                    >
                        <Minus size={14} className="md:w-4 md:h-4" />
                    </button>
                ) : (
                    <button
                        onClick={() => onRemoveItem(item.product.id)} // Or onDecreaseQuantity if you prefer it to remove at 1
                        className="p-1 rounded-full text-red-500 hover:text-red-700"
                        style={{ backgroundColor: `#fee2e2` }} // Light red background
                        aria-label="Remove item"
                    >
                        <X size={14} className="md:w-4 md:h-4" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default CartItem;