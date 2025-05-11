// src/app/restaurants/[id]/emenu/page.tsx
"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { WifiOff } from 'lucide-react';
import BottomNavigationBar from '@/components/bottom-navigation-bar';
import CategoryTabs from '@/components/category-tabs';
import CartContentPane from '@/components/content-panes/cart-content-pane';
import MenuContentPane from '@/components/content-panes/menu-content-pane';
import OrdersContentPane from '@/components/content-panes/orders-content-pane';
import DeliveryOrderModal from '@/components/delivery-order-modal';
import EMenuHeader from '@/components/header';
import OrderSuccessDisplay from '@/components/order-success-display';                               
import EMenuPageSkeleton from '@/components/page-skeleton';
import TakeawayOrderModal from '@/components/takeaway-order-modal';
import { MenuItem, NavTab } from '@/src/types/emenu';
import { useGetQuery } from '@/src/hooks/queries-actions';
import { Shop, ShopTheme } from '@/src/types/shop';
import { Product } from '@/src/types/product';

const EMenuPage: React.FC = () => {
    const [error] = useState<string | null>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [cart, setCart] = useState<MenuItem[]>([]);
    const [activeNavTab, setActiveNavTab] = useState<NavTab>('menu');

    // Modal States
    const [isTakeawayModalOpen, setIsTakeawayModalOpen] = useState(false);
    const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
    const [orderSuccessDetails, setOrderSuccessDetails] = useState<{
        isOpen: boolean; title: string; messageLines: (string|React.ReactNode)[]; orderNumber?: string|number;
    } | null>(null);


    const params = useParams();
    const searchParams = useSearchParams();
    const restaurantIdFromParams = params?.id as string;
    const displayTableNumber = searchParams?.get('table') || "12";

    const { data: shop, isLoading: is_shop_loading } = useGetQuery<Shop>({
        url: `/shops/${restaurantIdFromParams}`,
        key: ['shop']
    })

    const themeColors = shop?.shop_theme as ShopTheme | null

    const handleSelectCategory = useCallback((categoryId: number) => setSelectedCategoryId(categoryId), []);

    const handleAddToCart = useCallback((itemToAdd: Product) => {
        if (!itemToAdd.is_active) {
            setOrderSuccessDetails({ isOpen: true, title: 'عذراً', messageLines: [`${itemToAdd.name} غير متوفر حالياً.`] });
            return;
        }
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.product.id === itemToAdd.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.product.id === itemToAdd.id ? { ...item, quantity: (item.quantity ?? 0) + 1 } : item
                );
            }
            return [...prevCart, { product: itemToAdd, quantity: 1 }];
        });
    }, []);

    const handleIncreaseQuantity = useCallback((itemId: number) => {
        setCart(prevCart => prevCart.map(item => item.product.id === itemId ? { ...item, quantity: (item.quantity ?? 0) + 1 } : item));
    }, []);

    const handleDecreaseQuantity = useCallback((itemId: number) => {
        setCart(prevCart => {
            const itemToDecrease = prevCart.find(item => item.product.id === itemId);
            if (itemToDecrease && (itemToDecrease.quantity ?? 0) > 1) {
                return prevCart.map(item => item.product.id === itemId ? { ...item, quantity: (item.quantity ?? 0) - 1 } : item);
            }
            // If quantity is 1, remove it (or keep it based on CartItem's X button logic)
            return prevCart.filter(item => item.product.id !== itemId);
        });
    }, []);

    const handleRemoveItem = useCallback((itemId: number) => {
        setCart(prevCart => prevCart.filter(item => item.product.id !== itemId));
    }, []);


    const handleClearCart = useCallback(() => {
        setCart([]);
        // feedback: setOrderSuccessDetails({ isOpen: true, title: 'تم إفراغ السلة', messageLines: [`تمت إزالة جميع الأصناف من السلة.`] });
    }, []);

    const handleApplyCoupon = useCallback((couponCode: string) => {
        console.log("Applying coupon:", couponCode);
        // Placeholder: Add coupon logic here
        setOrderSuccessDetails({ isOpen: true, title: 'كود الخصم', messageLines: [`جاري تطبيق كود "${couponCode}"... (ميزة قيد التطوير)`] });
    }, []);

    // --- Order Type Handlers ---
    const handleInitiateDineIn = () => {
        if (cart.length === 0) {
            setOrderSuccessDetails({ isOpen: true, title: 'السلة فارغة', messageLines: ['الرجاء إضافة بعض الأصناف أولاً.'] });
            return;
        }
        // Process Dine-In Order (e.g., send to kitchen)
        console.log("Dine-In Order Submitted:", cart);
        setOrderSuccessDetails({
            isOpen: true,
            title: 'تم استلام طلبك!',
            messageLines: ['يتم الآن تحضير طلبك.', 'الوقت المتوقع للتحضير: 15-20 دقيقة.'],
        });
        setCart([]); // Clear cart after order
    };

    const handleInitiateTakeaway = () => {
        if (cart.length === 0) { /* ... empty cart check ... */ return; }
        setIsTakeawayModalOpen(true);
    };
    const handleSubmitTakeaway = (name: string, phone: string) => {
        setIsTakeawayModalOpen(false);
        const orderNumber = `T-${Math.floor(Math.random() * 10000)}`;
        console.log("Takeaway Order Submitted:", { name, phone, cart, orderNumber });
        setOrderSuccessDetails({
            isOpen: true,
            title: 'طلبك جاهز للاستلام!',
            orderNumber: orderNumber,
            messageLines: ['شكراً لطلبك، ' + name + '.', 'برجاء التوجه للدفع واستلام طلبك.'],
        });
        setCart([]);
    };

    const handleInitiateDelivery = () => {
         if (cart.length === 0) { /* ... empty cart check ... */ return; }
        setIsDeliveryModalOpen(true);
    };
    const handleSubmitDelivery = (details: { name: string; phone: string; location: string; landmark: string; notes?: string }) => {
        setIsDeliveryModalOpen(false);
        const orderNumber = `D-${Math.floor(Math.random() * 10000)}`;
        console.log("Delivery Order Submitted:", { ...details, cart, orderNumber });
        setOrderSuccessDetails({
            isOpen: true,
            title: 'تم تأكيد طلب التوصيل!',
            orderNumber: orderNumber,
            messageLines: [`شكراً ${details.name}، طلبك في الطريق إليك.`, `سيتم التواصل معك على الرقم: ${details.phone} قريباً.`]
        });
        setCart([]);
    };


    const filteredMenuItems = useMemo(() => {
        return shop?.products.filter(item => item?.product_category?.id === selectedCategoryId);
    }, [selectedCategoryId, shop?.products]);

    // --- Render Logic ---
    if (is_shop_loading) return <EMenuPageSkeleton />;
    if (error) { /* ... error display ... */
         return (
            <div className="min-h-screen w-full max-w-lg mx-auto bg-gray-100 flex flex-col items-center justify-center p-8 text-center" dir="rtl">
                <WifiOff className="w-16 h-16 text-red-400 mb-4" />
                <h1 className="text-xl font-semibold text-red-600 mb-2">خطأ في الاتصال</h1>
                <p className="text-gray-600 mb-6">{error || "لا يمكن عرض قائمة الطعام."}</p>
                <button onClick={() => window.location.reload()} className="px-5 py-2 text-white rounded-md text-sm hover:opacity-90 transition-opacity" style={{ backgroundColor: themeColors?.primary_color }}>
                    المحاولة مرة أخرى
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full max-w-lg mx-auto flex flex-col relative pb-20" style={{ backgroundColor: themeColors?.background_color }} dir="rtl">
            <EMenuHeader  themeColors={themeColors as ShopTheme | null} displayTableNumber={displayTableNumber} />

            <main className="flex-grow p-3 pt-0 overflow-y-auto scrollbar-thin">
                {activeNavTab === 'menu' && (
                    <>
                        <CategoryTabs selectedCategoryId={selectedCategoryId} onSelectCategory={handleSelectCategory} themeColors={themeColors} />
                        <div className="mt-3">
                           <MenuContentPane filteredMenuItems={filteredMenuItems ?? []} handleAddToCart={handleAddToCart} themeColors={themeColors} />
                        </div>
                    </>
                )}
                {activeNavTab === 'orders' && <OrdersContentPane themeColors={shop?.shop_theme as ShopTheme | null} />}
                {activeNavTab === 'cart' &&
                    <CartContentPane
                        cartItems={cart}
                        themeColors={shop?.shop_theme as ShopTheme | null}
                        onClearCart={handleClearCart}
                        onIncreaseQuantity={handleIncreaseQuantity}
                        onDecreaseQuantity={handleDecreaseQuantity}
                        onRemoveItem={handleRemoveItem}
                        onApplyCoupon={handleApplyCoupon}
                        onInitiateDineIn={handleInitiateDineIn}
                        onInitiateTakeaway={handleInitiateTakeaway}
                        onInitiateDelivery={handleInitiateDelivery}
                    />
                }
            </main>

            {/* Modals */}
            {isTakeawayModalOpen &&
                <TakeawayOrderModal isOpen={isTakeawayModalOpen} onClose={() => setIsTakeawayModalOpen(false)} onSubmit={handleSubmitTakeaway} themeColors={themeColors} />
            }
            {isDeliveryModalOpen &&
                <DeliveryOrderModal isOpen={isDeliveryModalOpen} onClose={() => setIsDeliveryModalOpen(false)} onSubmit={handleSubmitDelivery} themeColors={themeColors} />
            }
            {orderSuccessDetails?.isOpen &&
                <OrderSuccessDisplay
                    isOpen={orderSuccessDetails.isOpen}
                    onClose={() => setOrderSuccessDetails(null)}
                    title={orderSuccessDetails.title}
                    messageLines={orderSuccessDetails.messageLines}
                    orderNumber={orderSuccessDetails.orderNumber}
                    themeColors={themeColors}
                    autoCloseDuration={orderSuccessDetails.orderNumber ? undefined : 3000} // Auto-close general messages
                />
            }

            <BottomNavigationBar activeTab={activeNavTab} onTabChange={setActiveNavTab} cartItemCount={cart.length} themeColors={themeColors} />
        </div>
    );
};

export default EMenuPage;