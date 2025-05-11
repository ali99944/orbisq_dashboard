// src/components/common/FeedbackModal.tsx
"use client";
import React, { useEffect } from 'react';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { ThemeColors } from '@/src/types/emenu';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
    duration?: number;
    themeColors: ThemeColors;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, type, title, message, duration = 2500, themeColors }) => {
    useEffect(() => {
        if (isOpen && duration) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [isOpen, duration, onClose]);

    const IconComponent = type === 'success' ? CheckCircle2 : type === 'error' ? AlertTriangle : Info;
    const iconColorClass = type === 'success' ? `text-[${themeColors.primary}]` : type === 'error' ? 'text-red-500' : 'text-blue-500';

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/20 bg-opacity-30 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-out" style={{ opacity: isOpen ? 1 : 0 }} onClick={onClose}>
            <div className="rounded-xl shadow-2xl w-full max-w-xs p-6 text-center transform transition-all duration-300 ease-out"
                 style={{ backgroundColor: themeColors.secondary, color: themeColors.text, transform: isOpen ? 'scale(1)' : 'scale(0.95)', opacity: isOpen ? 1 : 0 }}
                 onClick={(e) => e.stopPropagation()}>
                <IconComponent size={56} className={`mx-auto mb-4 ${iconColorClass}`} />
                <h3 className="text-xl md:text-2xl font-semibold mb-2" style={{ color: themeColors.accent }}>{title}</h3>
                <p className="text-sm md:text-base" style={{color: themeColors.text}}>{message}</p>
            </div>
        </div>
    );
};
export default FeedbackModal;