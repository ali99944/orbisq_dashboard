// src/lib/utils.ts (or a similar utility file)
import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';
import { Package, CookingPot, PackageCheck, Ban, BadgeDollarSign, Truck, Info, Utensils } from 'lucide-react'; // Import relevant icons
import { OrderStatus, OrderType } from './types/order';


export const formatOrderStatus = (status: OrderStatus | undefined): { text: string; colorClass: string; icon: React.ElementType } => {
    switch (status) {
        case OrderStatus.pending: return { text: 'قيد الانتظار', colorClass: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Package };
        case OrderStatus.confirmed: return { text: 'تم التأكيد', colorClass: 'bg-blue-100 text-blue-700 border-blue-200', icon: Package };
        case OrderStatus.preparing: return { text: 'قيد التحضير', colorClass: 'bg-orange-100 text-orange-700 border-orange-200', icon: CookingPot };
        case OrderStatus.ready: return { text: 'جاهز للاستلام/التقديم', colorClass: 'bg-teal-100 text-teal-700 border-teal-200', icon: PackageCheck };
        case OrderStatus.served: return { text: 'تم التقديم (محلي)', colorClass: 'bg-green-100 text-green-700 border-green-200', icon: Utensils };
        case OrderStatus.out_for_delivery: return { text: 'في الطريق للتوصيل', colorClass: 'bg-cyan-100 text-cyan-700 border-cyan-200', icon: Truck };
        case OrderStatus.delivered: return { text: 'تم التوصيل', colorClass: 'bg-green-100 text-green-700 border-green-200', icon: PackageCheck };
        case OrderStatus.completed: return { text: 'مكتمل', colorClass: 'bg-green-100 text-green-700 border-green-200', icon: PackageCheck };
        case OrderStatus.cancelled: return { text: 'ملغي', colorClass: 'bg-red-100 text-red-700 border-red-200', icon: Ban };
        case OrderStatus.refunded: return { text: 'مسترجع', colorClass: 'bg-purple-100 text-purple-700 border-purple-200', icon: BadgeDollarSign };
        default: return { text: String(status || 'غير معروف'), colorClass: 'bg-gray-100 text-gray-600 border-gray-200', icon: Info };
    }
};

export const formatOrderType = (type: OrderType | undefined): string => {
    switch (type) {
        case OrderType.dine_in: return 'محلي (طاولة)';
        case OrderType.takeaway: return 'استلام من المطعم';
        case OrderType.delivery: return 'توصيل للمنزل';
        default: return String(type || 'غير محدد');
    }
};

export const formatOrderDateTime = (dateString: Date | string | undefined, includeTime: boolean = true): string => {
    if (!dateString) return '-';
    try {
        const date = new Date(dateString);
        const formatString = includeTime ? 'd MMMM yyyy, hh:mm a' : 'd MMMM yyyy';
        return format(date, formatString, { locale: arSA });
    } catch (e) {
        console.log(e);
        
        return String(dateString); // Fallback
    }
};