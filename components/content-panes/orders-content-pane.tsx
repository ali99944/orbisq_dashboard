// src/components/emenu/content-panes/OrdersContentPane.tsx
import React, { useState, useMemo } from 'react';
import { ListOrdered, Loader2, AlertCircle } from 'lucide-react';
import { useGetQuery } from '@/src/hooks/queries-actions'; // Adjust path
import type { Order } from '@/src/types/order'; // Adjust path
import { formatOrderStatus, formatOrderType, formatOrderDateTime } from '@/src/utils';
import OrderDetailSheet from './order-details-sheet';
import { useParams } from 'next/navigation';
import { Shop, ShopTheme } from '@/src/types/shop';

interface OrdersContentPaneProps {
    themeColors: ShopTheme | null;
}

// Order Card Component (for the list)
const OrderListItem: React.FC<{ order: Order; onClick: () => void; isLatest: boolean; themeColors: ShopTheme | null }> = ({ order, onClick, isLatest, themeColors }) => {
    const statusInfo = formatOrderStatus(order.status);
    const currency = order.shop?.currency_info.currency_code || 'ج.م'; // Get currency from shop object if available

    return (
        <button // Make the whole card clickable
            onClick={onClick}
            className={`w-full text-right bg-white p-4 rounded-lg border transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                isLatest
                    ? `border-2 ring-1 ring-offset-0 shadow-lg`
                    : 'border-gray-200 hover:border-gray-300'
            }`}
            style={{ borderColor: isLatest ? themeColors?.primary_color : undefined }}
        >
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold" style={{ color: themeColors?.accent_color }}>
                    طلب #{order.order_number || order.id}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${statusInfo.colorClass}`}>
                    {statusInfo.text}
                </span>
            </div>
            <div className="text-xs text-gray-500 space-y-1">
                <p>النوع: {formatOrderType(order.order_type)}</p>
                <p>التاريخ: {formatOrderDateTime(order.placed_at || order.created_at, true)}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between items-baseline">
                <span className="text-xs text-gray-600">الإجمالي:</span>
                <span className="text-base font-bold" style={{ color: themeColors?.primary_color }}>
                    {parseFloat(String(order.total)).toFixed(2)} {currency}
                </span>
            </div>
        </button>
    );
};


const OrdersContentPane: React.FC<OrdersContentPaneProps> = ({ themeColors }) => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const params = useParams();
    const { data: shop } = useGetQuery<Shop>({
        url: `shops/${params.id}`,
        key: ['shop'],
    }); // For currency if needed

    // --- Fetching Orders ---
    // TODO: Ensure this endpoint fetches orders for the *current customer*
    // It might need to send an auth token or session ID.
    const { data: orders, isLoading: isLoadingOrders, isError, error } = useGetQuery<Order[]>({
        url: 'orders', // Example customer-specific endpoint
        key: ['customerOrders'],
        // Add options like polling if you want live updates, or rely on Pusher
    });

    console.log(orders);
    

    // Sort orders by date, newest first (assuming placed_at or created_at)
    const sortedOrders = useMemo(() => {
        return [...(orders ?? [])].sort((a, b) => new Date(b.placed_at || b.created_at).getTime() - new Date(a.placed_at || a.created_at).getTime());
    }, [orders]);

    const handleOrderClick = (order: Order) => {
        setSelectedOrder(order);
        setIsSheetOpen(true);
    };

    const handleCloseSheet = () => {
        setIsSheetOpen(false);
        // Optionally clear selectedOrder after a delay for smoother exit animation
        // setTimeout(() => setSelectedOrder(null), 300);
    };

    // --- Render Logic ---
    if (isLoadingOrders) return (
        <div className='w-full h-full flex flex-col items-center justify-center py-20'>
            <Loader2 className="h-10 w-10 animate-spin mb-3" style={{color: themeColors?.primary_color}}/>
            <p style={{color: themeColors?.text_color, opacity: 0.8}}>جاري تحميل طلباتك...</p>
        </div>
    );

    if (isError) return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-10 text-center px-4">
            <AlertCircle size={48} className="mb-4 text-red-400"/>
            <h2 className="text-xl font-semibold text-red-600 mb-2">حدث خطأ</h2>
            <p style={{ color: themeColors?.text_color, opacity: 0.7 }}>لم نتمكن من تحميل طلباتك. يرجى المحاولة مرة أخرى.</p>
            <p className="text-xs text-gray-400 mt-1">{(error as Error)?.message}</p>
        </div>
    );

    if (sortedOrders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-10 text-center px-4">
                <ListOrdered size={64} className="mb-4" style={{ color: themeColors?.primary_color, opacity: 0.5 }}/>
                <h2 className="text-xl md:text-2xl font-semibold mb-1" style={{ color: themeColors?.text_color }}>لا توجد طلبات</h2>
                <p className="md:text-lg" style={{ color: themeColors?.text_color, opacity: 0.7 }}>لم تقم بأي طلبات حتى الآن.</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto max-w-2xl px-4 py-6 space-y-4">
            <h1 className="text-2xl font-bold text-center mb-5" style={{ color: themeColors?.accent_color }}>
                طلباتي
            </h1>
            {sortedOrders.map((order, index) => (
                <OrderListItem
                    key={order.id}
                    order={order}
                    onClick={() => handleOrderClick(order)}
                    isLatest={index === 0} // Highlight the first (latest) order
                    themeColors={themeColors}
                />
            ))}

            <OrderDetailSheet
                isOpen={isSheetOpen}
                onClose={handleCloseSheet}
                order={selectedOrder}
                shop={shop as Shop || undefined} // Pass the whole restaurant object from Redux
                themeColors={themeColors}
            />
        </div>
    );
};

export default OrdersContentPane;