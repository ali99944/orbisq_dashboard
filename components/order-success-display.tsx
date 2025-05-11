// src/components/common/OrderSuccessDisplay.tsx
import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { ShopTheme } from '@/src/types/shop';

interface OrderSuccessDisplayProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    messageLines: (string | React.ReactNode)[]; // Array for multiple lines or rich content
    orderNumber?: string | number;
    themeColors: ShopTheme | null;
    autoCloseDuration?: number; // Optional auto-close
}

const OrderSuccessDisplay: React.FC<OrderSuccessDisplayProps> = ({
    isOpen, onClose, title, messageLines, orderNumber, themeColors, autoCloseDuration
}) => {
    useEffect(() => {
        if (isOpen && autoCloseDuration) {
            const timer = setTimeout(onClose, autoCloseDuration);
            return () => clearTimeout(timer);
        }
    }, [isOpen, autoCloseDuration, onClose]);


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50" onClick={onClose}>
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 md:p-8 text-center"
                style={{ backgroundColor: themeColors?.secondary_color }}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10">
                    <X size={24} />
                </button>
                <CheckCircle2 size={64} className="mx-auto mb-5 md:mb-6" style={{ color: themeColors?.primary_color }} />
                <h2 className="text-xl md:text-2xl font-bold mb-3" style={{ color: themeColors?.accent_color }}>{title}</h2>

                {orderNumber && (
                    <div className="my-4 p-3 rounded-lg" style={{backgroundColor: `${themeColors?.primary_color}15`, border: `2px dashed ${themeColors?.primary_color}`}}>
                        <p className="text-sm md:text-base" style={{ color: themeColors?.text_color }}>رقم الطلب الخاص بك:</p>
                        <p className="text-2xl md:text-3xl font-mono font-bold my-1" style={{ color: themeColors?.primary_color }}>
                            {orderNumber}
                        </p>
                    </div>
                )}

                <div className="space-y-1 md:space-y-2 text-sm md:text-base" style={{ color: themeColors?.text_color }}>
                    {messageLines.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 w-full max-w-xs mx-auto py-2.5 md:py-3 rounded-lg text-white font-semibold text-sm md:text-base"
                    style={{ backgroundColor: themeColors?.primary_color }}
                >
                    حسنًا
                </button>
            </div>
        </div>
    );
};

export default OrderSuccessDisplay;