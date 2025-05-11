// src/components/emenu/modals/DeliveryOrderModal.tsx
import React, { useState } from 'react';
import { XCircle, User, Phone, MapPin, Edit3 } from 'lucide-react';
import { ShopTheme } from '@/src/types/shop';

interface DeliveryOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (details: { name: string; phone: string; location: string; landmark: string; notes?: string }) => void;
    themeColors: ShopTheme | null;
}

const DeliveryOrderModal: React.FC<DeliveryOrderModalProps> = ({ isOpen, onClose, onSubmit, themeColors }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [landmark, setLandmark] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && phone.trim() && location.trim() && landmark.trim()) {
            onSubmit({ name, phone, location, landmark, notes });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40" dir="rtl" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-5 md:p-6 max-h-[90vh] overflow-y-auto" style={{ backgroundColor: themeColors?.secondary_color }} onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg md:text-xl font-semibold" style={{color: themeColors?.accent_color}}>طلب توصيل</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <XCircle size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Name Input */}
                    <div>
                        <label htmlFor="delivery-name" className="block text-sm font-medium mb-1" style={{color: themeColors?.text_color}}>الاسم</label>
                        <div className="relative">
                            <User size={16} className="text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                            <input type="text" id="delivery-name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 pr-10 border rounded-md text-sm focus:ring-1" style={{ borderColor: `${themeColors?.primary_color}80`, color: themeColors?.text_color, outlineColor: themeColors?.primary_color }} />
                        </div>
                    </div>
                    {/* Phone Input */}
                    <div>
                        <label htmlFor="delivery-phone" className="block text-sm font-medium mb-1" style={{color: themeColors?.text_color}}>رقم الهاتف</label>
                        <div className="relative">
                            <Phone size={16} className="text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                            <input type="tel" id="delivery-phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full p-2 pr-10 border rounded-md text-sm focus:ring-1" style={{ borderColor: `${themeColors?.primary_color}80`, color: themeColors?.text_color, outlineColor: themeColors?.primary_color }} />
                        </div>
                    </div>
                     {/* Location Input */}
                    <div>
                        <label htmlFor="delivery-location" className="block text-sm font-medium mb-1" style={{color: themeColors?.text_color}}>العنوان بالتفصيل</label>
                        <div className="relative">
                            <MapPin size={16} className="text-gray-400 absolute right-3 top-3 pointer-events-none" />
                            <textarea id="delivery-location" value={location} onChange={(e) => setLocation(e.target.value)} required rows={2} className="w-full p-2 pr-10 border rounded-md text-sm focus:ring-1" style={{ borderColor: `${themeColors?.primary_color}80`, color: themeColors?.text_color, outlineColor: themeColors?.primary_color }} placeholder="مثال: شارع الملك فهد، مبنى رقم 5، الدور الثاني، شقة 10"></textarea>
                        </div>
                    </div>
                     {/* Landmark Input */}
                    <div>
                        <label htmlFor="delivery-landmark" className="block text-sm font-medium mb-1" style={{color: themeColors?.text_color}}>أقرب معلم مميز</label>
                        <div className="relative">
                             <Edit3 size={16} className="text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                            <input type="text" id="delivery-landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)} required className="w-full p-2 pr-10 border rounded-md text-sm focus:ring-1" style={{ borderColor: `${themeColors?.primary_color}80`, color: themeColors?.text_color, outlineColor: themeColors?.primary_color }} placeholder="مثال: بجوار مسجد النور"/>
                        </div>
                    </div>
                    {/* Notes Input */}
                    <div>
                        <label htmlFor="delivery-notes" className="block text-sm font-medium mb-1" style={{color: themeColors?.text_color}}>ملاحظات إضافية (اختياري)</label>
                         <textarea id="delivery-notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="w-full p-2 border rounded-md text-sm focus:ring-1" style={{ borderColor: `${themeColors?.primary_color}80`, color: themeColors?.text_color, outlineColor: themeColors?.primary_color }}></textarea>
                    </div>

                    <button type="submit" className="w-full py-2.5 md:py-3 rounded-lg text-white font-semibold text-sm md:text-base" style={{backgroundColor: themeColors?.primary_color}}>
                        تأكيد طلب التوصيل
                    </button>
                </form>
            </div>
        </div>
    );
};
export default DeliveryOrderModal;