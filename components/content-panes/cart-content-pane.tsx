// src/components/emenu/content-panes/CartContentPane.tsx
import React, { useMemo } from 'react';
import { ShoppingCart } from 'lucide-react';
import { MenuItem } from '@/src/types/emenu';
import CartItem from '../cart-item';
import CouponInput from '../coupon-input';
import OrderTypeButtons from '../order-type-buttons';
import { ShopTheme } from '@/src/types/shop';

interface CartContentPaneProps {
    cartItems: MenuItem[];
    themeColors: ShopTheme | null;
    onClearCart: () => void;
    onIncreaseQuantity: (itemId: number) => void;
    onDecreaseQuantity: (itemId: number) => void;
    onRemoveItem: (itemId: number) => void;
    onApplyCoupon: (couponCode: string) => void;
    // Order type handlers
    onInitiateDineIn: () => void;
    onInitiateTakeaway: () => void;
    onInitiateDelivery: () => void;
}

const CartContentPane: React.FC<CartContentPaneProps> = ({
    cartItems, themeColors, onClearCart,
    onIncreaseQuantity, onDecreaseQuantity, onRemoveItem,
    onApplyCoupon,
    onInitiateDineIn, onInitiateTakeaway, onInitiateDelivery
}) => {
    const totalAmount = useMemo(() => cartItems.reduce((sum, item) => sum + (item.product.price ?? 0) * (item.quantity ?? 0), 0), [cartItems]);

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-280px)] md:min-h-[calc(100vh-300px)] py-10 text-center">
                <ShoppingCart size={64} className="mb-4 md:w-20 md:h-20" style={{ color: themeColors?.primary_color, opacity: 0.5 }}/>
                <h2 className="text-xl md:text-2xl font-semibold" style={{ color: themeColors?.text_color }}>سلة التسوق فارغة</h2>
                <p className="md:text-lg" style={{ color: themeColors?.text_color, opacity: 0.7 }}>أضف بعض الأصناف اللذيذة من المنيو!</p>
            </div>
        );
    }

    return (
        <div className="p-1 md:p-3">
            <h2 className="text-xl md:text-2xl font-bold my-4 text-center" style={{ color: themeColors?.accent_color }}>محتويات السلة</h2>
            <div className="space-y-2 mb-4 max-h-[calc(100vh-450px)] md:max-h-[calc(100vh-500px)] overflow-y-auto px-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {cartItems.map((item) => (
                    <CartItem
                        key={item.product.id}
                        item={item}
                        themeColors={themeColors as ShopTheme | null}
                        onIncreaseQuantity={onIncreaseQuantity}
                        onDecreaseQuantity={onDecreaseQuantity}
                        onRemoveItem={onRemoveItem}
                    />
                ))}
            </div>

            <CouponInput themeColors={themeColors} onApplyCoupon={onApplyCoupon} />

            {/* Total Amount */}
            <div className="flex justify-between items-center my-3 md:my-4 px-1">
                <span className="text-md md:text-lg font-medium" style={{color: themeColors?.text_color}}>الإجمالي:</span>
                <span className="text-lg md:text-xl font-bold" style={{color: themeColors?.primary_color}}>${totalAmount.toFixed(2)}</span>
            </div>

            <OrderTypeButtons
                themeColors={themeColors as ShopTheme | null}
                onDineIn={onInitiateDineIn}
                onTakeaway={onInitiateTakeaway}
                onDelivery={onInitiateDelivery}
            />

            <button onClick={onClearCart} className="w-full mt-3 py-2 rounded-lg text-xs md:text-sm" style={{color: themeColors?.accent_color, border: `1px solid ${themeColors?.accent_color}50`}}>
                إفراغ السلة
            </button>
        </div>
    );
};
export default CartContentPane;