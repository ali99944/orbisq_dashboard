// src/components/emenu/OrderDetailSheet.tsx
import React from 'react';
import { X, Calendar, User, Phone, MapPin, Landmark, ShoppingBag, Receipt, CreditCard, Table } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Order } from '@/src/types/order';
import { Shop, ShopTheme } from '@/src/types/shop';
import { formatOrderStatus, formatOrderDateTime, formatOrderType } from '@/src/utils';
import { getImageLink } from '@/src/storage';

interface OrderDetailSheetProps {
    isOpen: boolean;
    onClose: () => void;
    order: Order | null;
    shop: Shop | null; // Pass restaurant for currency etc.
    themeColors: ShopTheme | null
}

const OrderDetailSheet: React.FC<OrderDetailSheetProps> = ({
    isOpen,
    onClose,
    order,
    shop,
    themeColors
}) => {

    if (!order) return null; // Don't render if no order selected

    const statusInfo = formatOrderStatus(order.status as unknown as string);
    const currency = shop?.currency_info.currency_code || 'ج';

    const formatPrice = (price: number | string | undefined): string => {
        const num = parseFloat(String(price));
        return isNaN(num) ? '-' : `${num.toFixed(2)} ${currency}`;
    };

    const getCustomerName = () => {
        if (order.order_type.toString() === 'delivery') return order.delivery_customer_name;
        if (order.order_type.toString() === 'takeaway') return order.takeaway_customer_name;
        // For dine_in, customer might be linked via customer_id if logged in
        return order.customer?.name || 'زبون عام';
    };

     const getCustomerPhone = () => {
        if (order.order_type.toString() === 'delivery') return order.delivery_customer_phone;
        if (order.order_type.toString() === 'takeaway') return order.takeaway_customer_phone;
        return order.customer?.phone_number;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col bg-black/30 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose} // Close on backdrop click
                    dir="rtl"
                >
                    <motion.div
                        className="bg-white w-full h-[95vh] md:h-[90vh] shadow-xl rounded-t-2xl flex flex-col mt-auto" // Slide from bottom
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()} // Prevent close on sheet click
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
                            <h2 className="text-lg font-semibold text-gray-800">
                                تفاصيل الطلب <span className="font-mono text-primary" style={{color: themeColors?.primary_color}}>#{order.order_number || order.id}</span>
                            </h2>
                            <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-grow overflow-y-auto p-4 space-y-5 text-sm">
                            {/* Order Status */}
                            <div className={`flex items-center gap-2 p-3 rounded-lg border ${statusInfo.colorClass}`}>
                                 <statusInfo.icon size={20}/>
                                 <span className="font-semibold">{statusInfo.text}</span>
                            </div>

                            {/* Basic Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <InfoItem icon={Calendar} label="تاريخ الطلب" value={formatOrderDateTime(order.placed_at || order.created_at)} />
                                <InfoItem icon={ShoppingBag} label="نوع الطلب" value={formatOrderType(order.order_type.toString() as unknown as string)} />
                                {order.order_type.toString() === 'dine_in' && order.desk?.desk_number && <InfoItem icon={Table} label="رقم الطاولة" value={String(order.desk.desk_number)} />}
                            </div>

                            {/* Customer Info (if applicable) */}
                            {(order.order_type.toString() === 'delivery' || order.order_type.toString() === 'takeaway' || order.customer_id) && (
                                <div className="border-t pt-4">
                                    <h3 className="font-semibold text-gray-700 mb-2">بيانات العميل</h3>
                                    <div className="space-y-1">
                                        <InfoItem icon={User} label="الاسم" value={getCustomerName()} />
                                        {getCustomerPhone() && <InfoItem icon={Phone} label="الهاتف" value={getCustomerPhone()} dir="ltr" />}
                                        {order.order_type.toString() === 'delivery' && order.delivery_address && (
                                            <InfoItem icon={MapPin} label="العنوان" value={order.delivery_address} />
                                        )}
                                        {order.order_type.toString() === 'delivery' && order.delivery_landmark && (
                                            <InfoItem icon={Landmark} label="علامة مميزة" value={order.delivery_landmark} />
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Order Items */}
                            <div className="border-t pt-4">
                                <h3 className="font-semibold text-gray-700 mb-2">الأصناف المطلوبة ({order.order_items.length})</h3>
                                <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto pr-1 -mr-1"> {/* Indent scrollbar slightly */}
                                    {order.order_items.map(item => (
                                        <div key={item.id} className="flex items-center py-2.5">
                                            {item.product?.image && (
                                                <img src={getImageLink(item.product?.image)} alt={item.product?.name} className="w-12 h-12 object-cover rounded-md ml-3 flex-shrink-0" />
                                            )}
                                            <div className="flex-1">
                                                <div className="flex items-baseline gap-2 flex-wrap">
                                                    <p className="font-medium text-gray-800">{item.product?.name}</p>
                                                    {item.order_item_modifiers?.find(mod => mod.price_adjustment === null) && (
                                                        <span className="text-sm text-gray-600">({item.order_item_modifiers.find(mod => mod.price_adjustment === null)?.name})</span>
                                                    )}
                                                </div>
                                                {item.order_item_modifiers?.some(mod => mod.price_adjustment !== null) && (
                                                    <div className="mt-1 space-y-0.5">
                                                        {item.order_item_modifiers
                                                            .filter(mod => mod.price_adjustment !== null)
                                                            .map((mod, idx) => (
                                                                <div key={idx} className="flex gap-x-2 text-xs">
                                                                    <span className="text-gray-500 flex flex-row-reverse items-center gap-1">
                                                                         <span>{mod.name}</span>
                                                                    </span>
                                                                    -
                                                                    {(mod?.price_adjustment ?? 0) > 0 && (
                                                                        <span className="text-gray-600">+{formatPrice(mod?.price_adjustment ?? 0)}</span>
                                                                    )}
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                )}
                                                <p className="text-xs text-gray-500 mt-1">الكمية: {item.quantity}</p>
                                            </div>
                                            <div className="text-left font-semibold text-gray-700">
                                                {formatPrice((item.quantity * (item.product?.price || 0)) + (item.order_item_modifiers?.reduce((sum, mod) => sum + (mod.price_adjustment || 0) * item.quantity, 0) || 0))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pricing Summary */}
                            <div className="border-t pt-4 space-y-1.5">
                                <h3 className="font-semibold text-gray-700 mb-2">ملخص الدفع</h3>
                                <PriceRow label="المجموع الفرعي" value={formatPrice(order.order_items.reduce((sum, item) => sum + (item.quantity * (item.product?.price || 0)) + (item.order_item_modifiers?.reduce((modSum, mod) => modSum + (mod.price_adjustment || 0) * item.quantity, 0) || 0), 0))} />
                                {order.discount_amount > 0 && <PriceRow label="الخصم" value={`-${formatPrice(order.discount_amount)}`} className="text-red-600" />}
                                <PriceRow label="ضريبة القيمة المضافة" value={formatPrice(order.tax_amount)} />
                                {order.delivery_fee && order.delivery_fee > 0 && <PriceRow label="رسوم التوصيل" value={formatPrice(order.delivery_fee)} />}
                                {order.service_charge && order.service_charge > 0 && <PriceRow label="رسوم خدمة" value={formatPrice(order.service_charge)} />}
                                <PriceRow label="الإجمالي الكلي" value={formatPrice(order.order_items.reduce((sum, item) => sum + (item.quantity * (item.product?.price || 0)) + (item.order_item_modifiers?.reduce((modSum, mod) => modSum + (mod.price_adjustment || 0) * item.quantity, 0) || 0), 0) + (order.tax_amount || 0) + (order.delivery_fee || 0) + (order.service_charge || 0) - (order.discount_amount || 0))} isTotal={true} primaryColor={themeColors?.primary_color} />
                            </div>

                            {/* Payment Details */}
                            <div className="border-t pt-4">
                                <h3 className="font-semibold text-gray-700 mb-2">الدفع</h3>
                                <InfoItem icon={Receipt} label="حالة الدفع" value={order.payment_status ? String(order.payment_status) == 'unpaid' ? 'مدفوع' : 'غير مدفوع' : 'غير مدفوع'} />
                                {order.payment_method && <InfoItem icon={CreditCard} label="طريقة الدفع" value={String(order.payment_method)} />}
                            </div>

                            {/* Notes */}
                            {order.notes && (
                                 <div className="border-t pt-4">
                                    <h3 className="font-semibold text-gray-700 mb-2">ملاحظات إضافية</h3>
                                    <p className="text-gray-600 bg-gray-50 p-2 rounded-md whitespace-pre-wrap">{order.notes}</p>
                                 </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Helper sub-components for OrderDetailSheet
const InfoItem: React.FC<{ icon: React.ElementType; label: string; value: string | number | undefined | null; dir?: 'ltr' | 'rtl'}> = ({ icon: Icon, label, value, dir}) => (
    <div className="flex items-start gap-2">
        <Icon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
        <span className="text-gray-600">{label}:</span>
        <span className="font-medium text-gray-800 break-words" dir={dir}>{value || '-'}</span>
    </div>
);
const PriceRow: React.FC<{ label: string; value: string; isTotal?: boolean; className?: string; primaryColor?: string }> = ({ label, value, isTotal, className, primaryColor }) => (
    <div className={`flex justify-between items-baseline ${className || ''} ${isTotal ? 'font-bold text-lg pt-2 border-t border-dashed mt-1' : 'text-sm'}`}>
        <span className={isTotal ? 'text-gray-800' : 'text-gray-600'}>{label}:</span>
        <span className={isTotal ? 'text-primary' : 'font-medium text-gray-800'} style={isTotal ? {color: primaryColor} : {}}>{value}</span>
    </div>
);

export default OrderDetailSheet;