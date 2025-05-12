// src/components/emenu/modals/DineInOrderModal.tsx
import React, { useState } from 'react';
import { XCircle, User, Phone } from 'lucide-react';
import { ShopTheme } from '@/src/types/shop';

interface DineInOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (name: string, phone: string) => void;
    themeColors: ShopTheme | null;
}

const DineInOrderModal: React.FC<DineInOrderModalProps> = ({ isOpen, onClose, onSubmit, themeColors }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && phone.trim()) {
            onSubmit(name, phone);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center p-4 z-40" dir="rtl" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5 md:p-6" style={{ backgroundColor: themeColors?.background_color }} onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg md:text-xl font-semibold" style={{color: themeColors?.text_color}}>طلب داخل المطعم</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <XCircle size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="takeaway-name" className="block text-sm font-medium mb-1" style={{color: themeColors?.text_color}}>الاسم</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <User size={16} className="text-gray-400" />
                            </div>
                            <input type="text" id="takeaway-name" value={name} onChange={(e) => setName(e.target.value)} required
                                   className="w-full p-2 pr-10 border rounded-md text-sm md:text-base focus:ring-1"
                                   style={{ borderColor: `${themeColors?.primary_color}80`, color: themeColors?.text_color, outlineColor: themeColors?.primary_color }} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="takeaway-phone" className="block text-sm font-medium mb-1" style={{color: themeColors?.text_color}}>رقم الهاتف</label>
                         <div className="relative">
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <Phone size={16} className="text-gray-400" />
                            </div>
                            <input type="tel" id="takeaway-phone" value={phone} onChange={(e) => setPhone(e.target.value)} required
                                   className="w-full p-2 pr-10 border rounded-md text-sm md:text-base focus:ring-1"
                                   style={{ borderColor: `${themeColors?.primary_color}80`, color: themeColors?.text_color, outlineColor: themeColors?.primary_color }} />
                        </div>
                        <p className="text-xs mt-1" style={{color: themeColors?.text_color, opacity: 0.7}}>* نحتاج رقم هاتفك لتأكيد الطلب والتواصل عند الحاجة.</p>
                    </div>
                    <button type="submit" className="w-full py-2.5 md:py-3 rounded-lg font-semibold text-sm md:text-base" style={{backgroundColor: themeColors?.primary_color, color: themeColors?.accent_color}}>
                        تأكيد الطلب
                    </button>
                </form>
            </div>
        </div>
    );
};
export default DineInOrderModal;