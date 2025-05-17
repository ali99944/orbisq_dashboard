// src/lib/utils.ts (or a similar utility file)
import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';
import { Package, CookingPot, PackageCheck, Ban, BadgeDollarSign, Truck, Info, Utensils } from 'lucide-react'; // Import relevant icons


export const formatOrderStatus = (status: string | undefined): { text: string; colorClass: string; icon: React.ElementType } => {
    console.log(status);
    
    switch (status) {
        
        case 'pending': return { text: 'في انتظار التأكيد', colorClass: 'bg-amber-50 text-amber-600 border-amber-200', icon: Package };
        case 'confirmed': return { text: 'تم تأكيد الطلب', colorClass: 'bg-blue-50 text-blue-600 border-blue-200', icon: Package };
        case 'preparing': return { text: 'جاري تحضير الطلب', colorClass: 'bg-orange-50 text-orange-600 border-orange-200', icon: CookingPot };
        case 'ready': return { text: 'الطلب جاهز', colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-200', icon: PackageCheck };
        case 'served': return { text: 'تم تقديم الطلب', colorClass: 'bg-green-50 text-green-600 border-green-200', icon: Utensils };
        case 'out_for_delivery': return { text: 'جاري توصيل الطلب', colorClass: 'bg-sky-50 text-sky-600 border-sky-200', icon: Truck };
        case 'delivered': return { text: 'تم توصيل الطلب', colorClass: 'bg-teal-50 text-teal-600 border-teal-200', icon: PackageCheck };
        case 'completed': return { text: 'تم إكمال الطلب', colorClass: 'bg-green-50 text-green-600 border-green-200', icon: PackageCheck };
        case 'cancelled': return { text: 'تم إلغاء الطلب', colorClass: 'bg-red-50 text-red-600 border-red-200', icon: Ban };
        case 'refunded': return { text: 'تم استرجاع المبلغ', colorClass: 'bg-purple-50 text-purple-600 border-purple-200', icon: BadgeDollarSign };
        default: return { text: 'حالة غير معروفة', colorClass: 'bg-gray-50 text-gray-600 border-gray-200', icon: Info };
    }
};

export const formatOrderType = (type: string | undefined): string => {
    switch (type) {
        case 'dine_in': return 'داخلي (طاولة)';
        case 'takeaway': return 'استلام من المطعم';
        case 'delivery': return 'توصيل للمنزل';
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