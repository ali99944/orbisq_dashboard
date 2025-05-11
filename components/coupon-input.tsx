// src/components/emenu/CouponInput.tsx
import { ShopTheme } from '@/src/types/shop';
import React, { useState } from 'react';

interface CouponInputProps {
    themeColors: ShopTheme | null;
    onApplyCoupon: (couponCode: string) => void; // Placeholder for now
}

const CouponInput: React.FC<CouponInputProps> = ({ themeColors, onApplyCoupon }) => {
    const [couponCode, setCouponCode] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (couponCode.trim()) {
            onApplyCoupon(couponCode.trim());
            // setCouponCode(''); // Optionally clear after applying
        }
    };

    return (
        <form onSubmit={handleSubmit} className="my-4 md:my-6">
            <label htmlFor="coupon-code" className="block text-sm font-medium mb-1" style={{ color: themeColors?.text_color }}>
                كود الخصم (إن وجد)
            </label>
            <div className="flex gap-2">
                <input
                    type="text"
                    id="coupon-code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="ادخل كود الخصم"
                    className="flex-grow p-2 md:p-2.5 border rounded-md text-sm md:text-base focus:ring-1"
                    style={{ borderColor: `${themeColors?.primary_color}80`, color: themeColors?.text_color, outlineColor: themeColors?.primary_color }}
                />
                <button
                    type="submit"
                    className="px-4 py-2 md:px-5 md:py-2.5 rounded-md text-white font-semibold text-xs md:text-sm"
                    style={{ backgroundColor: themeColors?.primary_color, color: themeColors?.text_color }}
                    disabled={!couponCode.trim()}
                >
                    تطبيق
                </button>
            </div>
        </form>
    );
};

export default CouponInput;