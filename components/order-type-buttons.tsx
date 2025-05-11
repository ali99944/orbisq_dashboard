// src/components/emenu/OrderTypeButtons.tsx
import { useGetQuery } from '@/src/hooks/queries-actions';
import { Shop, ShopTheme } from '@/src/types/shop';
import { useParams } from 'next/navigation';
import React from 'react';

interface OrderTypeButtonsProps {
    themeColors: ShopTheme | null;
    onDineIn: () => void;
    onTakeaway: () => void;
    onDelivery: () => void;
}

const OrderTypeButtons: React.FC<OrderTypeButtonsProps> = ({ themeColors, onDineIn, onTakeaway, onDelivery }) => {
    const params = useParams();
    const { data: shop } = useGetQuery<Shop>({
        url: `shops/${params.id}`,
        key: ['shop'],
    })
    return (
        <div className="border-t pt-4 mt-4" style={{ borderColor: `${themeColors?.primary_color}30` }}>
            <p className="text-sm text-center mb-3 font-medium" style={{color: themeColors?.text_color}}>اختر طريقة الطلب:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
                <button
                    className="w-full py-2 md:py-2 rounded-lg text-white font-semibold text-sm md:text-base"
                    style={{ backgroundColor: themeColors?.primary_color }}
                    onClick={onDineIn}
                >
                    تناول هنا
                </button>
                <div className="flex items-center gap-x-2">
                {
                    !shop?.business_info.has_takeaway && (
                        <button
                            className="w-full py-2 md:py-2 rounded-lg font-semibold text-sm md:text-base"
                            style={{ backgroundColor: `${themeColors?.primary_color}20`, color: themeColors?.primary_color, border: `1px solid ${themeColors?.primary_color}`}}
                            onClick={onTakeaway}
                        >
                            تيك أواي
                        </button>
                    )
                }
                {
                    !shop?.business_info.has_delivery && (
                        <button
                            className="w-full py-2 md:py-2 rounded-lg font-semibold text-sm md:text-base"
                            style={{ backgroundColor: `${themeColors?.accent_color}20`, color: themeColors?.accent_color, border: `1px solid ${themeColors?.accent_color}` }}
                            onClick={onDelivery}
                        >
                            توصيل
                        </button>
                    )
                }
                </div>
            </div>
        </div>
    );
};

export default OrderTypeButtons;