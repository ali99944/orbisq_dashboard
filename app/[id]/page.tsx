"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Instagram, Twitter, Facebook, Youtube, Utensils, Bell, WifiOff, ExternalLink, Linkedin } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import { useGetQuery } from '@/src/hooks/queries-actions';
import { Shop } from '@/src/types/shop';

// --- Helper: Loading Skeleton ---
const BrandPageSkeleton: React.FC = () => (
    <div className="min-h-screen w-full max-w-md mx-auto bg-gray-100 flex flex-col items-center justify-center p-8 animate-pulse" dir="rtl">
        <div className="w-28 h-28 bg-gray-300 rounded-full mb-6"></div>
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="h-5 bg-gray-200 rounded w-full mb-3"></div>
        <div className="h-5 bg-gray-200 rounded w-full mb-6"></div>
        <div className="h-12 bg-gray-300 rounded-lg w-full mb-4"></div>
        <div className="h-12 bg-gray-300 rounded-lg w-full mb-6"></div>
        <div className="flex gap-4 mb-6">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        </div>
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4 mt-2"></div>
    </div>
);
// --- End Skeleton ---

// --- Main Component ---
const BrandIdentityPage: React.FC = () => {

    const [error] = useState<string | null>(null);

    const params = useParams();
    const searchParams = useSearchParams();
    const shop_id = Array.isArray(params?.id) ? params.id[0] : params?.id;
    const tableNumber = searchParams?.get('table');

    const { data: shop, isLoading } = useGetQuery<Shop>({
        url: `/shops/${shop_id}`,
        key: ['shop']
    })

    const themeColors = useMemo(() => {
        if (!shop) return null;
        return shop.shop_theme;
    }, [shop]);

    

    // --- Prepare Social Links ---
    const socialMediaLinks = useMemo(() => {
        if (!shop) return [];
        return [
            { name: 'Instagram', url: shop['social_links']?.['instagram'], icon: Instagram },
            { name: 'Twitter', url: shop['social_links']?.['twitter'], icon: Twitter },
            { name: 'Facebook', url: shop['social_links']?.['facebook'], icon: Facebook },
            { name: 'Youtube', url: shop['social_links']?.['youtube'], icon: Youtube },
            { name: 'Snapchat', url: shop['social_links']?.['snapchat'], icon: ExternalLink }, // Placeholder icon
            { name: 'TikTok', url: shop['social_links']?.['tiktok'], icon: ExternalLink }, // Placeholder icon
            { name: 'LinkedIn', url: shop['social_links']?.['linkedin'], icon: Linkedin },
            { name: 'Pinterest', url: shop['social_links']?.['pinterest'], icon: ExternalLink }, // Placeholder icon
        ].filter(link => !!link.url);
    }, [shop]);

    // --- Construct Links for Actions ---
    const eMenuLink = shop ? `/${shop.id}/emenu${tableNumber ? `?table=${tableNumber}` : ''}` : '#';
    const requestServiceLink = shop ? `/${shop.id}/request-service${tableNumber ? `?table=${tableNumber}` : ''}` : '#';

    console.log(shop);
    

    // --- Render Loading/Error States ---
    if (isLoading) return <BrandPageSkeleton />;

    if (error || !shop) {
        return (
            <div className="min-h-screen w-full max-w-md mx-auto bg-gray-100 flex flex-col items-center justify-center p-8 text-center" dir="rtl">
                <WifiOff className="w-16 h-16 text-red-400 mb-4" />
                <h1 className="text-xl font-semibold text-red-600 mb-2">خطأ في الاتصال</h1>
                <p className="text-gray-600 mb-6">{error || "لا يمكن عرض بيانات المطعم حالياً."}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-5 py-2 text-white rounded-md text-sm hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: themeColors?.primary_color }}
                >
                    المحاولة مرة أخرى
                </button>
            </div>
        );
    }

    // --- Main Render ---
    return (
        <div
            className="min-h-screen w-full max-w-lg mx-auto flex flex-col items-center justify-between p-4 pt-12 md:pt-16 relative overflow-hidden"
            style={{ backgroundColor: themeColors?.secondary_color }}
            dir="rtl"
        >
            {/* Background Image/Pattern */}
            {shop.cover && (
                <div
                    className="absolute inset-0 z-0 opacity-[0.3] md:opacity-[0.4] pointer-events-none bg-repeat" // Slightly adjusted opacity
                    style={{ backgroundImage: `url(${shop.cover})` }}
                ></div>
            )}
             <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-[var(--theme-secondary)] pointer-events-none" style={{ '--theme-secondary': themeColors?.secondary_color } as React.CSSProperties}></div>


            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center text-center w-full px-2">
                {/* Logo */}
                {shop.logo && (
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden mb-5 shadow-lg border-4" style={{ borderColor: themeColors?.secondary_color }}>
                        <Image
                            src={shop.logo}
                            alt={`${shop.name} Logo`}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover bg-white" // bg-white for transparent logos
                            priority // Load logo quickly
                        />
                    </div>
                )}

                {/* Restaurant Name */}
                <h1 className="text-3xl md:text-4xl font-bold mb-1.5" style={{ color: themeColors?.accent_color }}>
                    {shop.name}
                </h1>

                {/* Description */}
                {shop.description && (
                    <p className="text-base md:text-lg mb-6 px-4" style={{ color: themeColors?.text_color }}>
                        {shop.description}
                    </p>
                )}

                {/* Action Buttons */}
                <div className="w-full max-w-[300px] sm:max-w-xs space-y-3 mb-8">
                     <div className='flex flex-col sm:flex-row gap-2'> {/* Stack on small, row on sm+ */}
                        <Link href={eMenuLink} className="block w-full">
                            <button
                                className="w-full flex items-center justify-center gap-2.5 px-4 py-2 rounded text-white font-semibold text-base shadow transition-transform duration-150 ease-out hover:opacity-95 active:scale-[0.97]"
                                style={{ backgroundColor: themeColors?.primary_color }}
                            >
                                <Utensils size={18} />
                                تصفح المنيو
                            </button>
                        </Link>
                        {/* Example for a second primary button if needed */}
                        {/* <Link href={"#"} className="block w-full">
                            <button
                                className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-lg text-white font-semibold text-base shadow-md transition-transform duration-150 ease-out hover:opacity-95 active:scale-[0.97]"
                                style={{ backgroundColor: themeColors?.primary_color, opacity: 0.85 }} // Slightly different style
                            >
                                <Info size={18} />
                                عن المطعم
                            </button>
                        </Link> */}
                    </div>
                    {tableNumber && (shop.business_info.has_dine_in || shop.business_info.has_reservation) && ( // Show if table & dine-in/reservation enabled
                        <Link href={requestServiceLink} className="block w-full">
                            <button
                                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium shadow-sm transition-all duration-150 ease-out hover:shadow-md active:scale-[0.97]"
                                style={{ borderColor: themeColors?.primary_color, color: themeColors?.primary_color, backgroundColor: themeColors?.secondary_color === themeColors?.primary_color ? '#FFFFFF' : themeColors?.secondary_color }} // Ensure contrast if secondary is same as primary
                            >
                                <Bell size={16} />
                                طلب مساعدة من النادل
                            </button>
                        </Link>
                    )}
                </div>

                {/* Contact & Socials */}
                <div className="space-y-4 mb-8 w-full">
                    <div className='flex items-center gap-x-8 justify-center'>
                    {(
                        <a href={`tel:${shop?.contact_info?.phone ?? ''}`} className="flex items-center justify-center gap-2 text-sm hover:underline" style={{ color: themeColors?.text_color }}>
                            <Phone size={16} className="opacity-80" />
                            <span dir="ltr">{shop?.contact_info?.phone}</span>
                        </a>
                    )}
                     {  (
                        <a
                            href={`https://wa.me/${(shop?.contact_info?.whatsapp ?? '').replace(/\D/g, '')}`} // Ensure it's just numbers for link
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 text-sm hover:underline"
                            style={{ color: themeColors?.text_color }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.298.297-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413z"/></svg>
                            تواصل عبر واتساب
                        </a>
                    )}
                    </div>

                    {socialMediaLinks.length > 0 && (
                        <div className="flex items-center justify-center flex-wrap gap-x-5 gap-y-3 pt-2">
                            {socialMediaLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url ?? '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-opacity duration-150 flex items-center gap-1.5"
                                    style={{ color: themeColors?.text_color, opacity: 0.75 }}
                                    onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                                    onMouseOut={(e) => e.currentTarget.style.opacity = '0.75'}
                                    title={link.name}
                                >
                                    <link.icon size={28} />
                                    <span className="text-md">{link.name}</span>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div> {/* End Main Content */}

            {/* Footer Branding */}
            <div className="relative z-10 text-center pb-3 pt-6 mt-auto">
                <p className="text-[16px]" style={{ color: themeColors?.text_color, opacity: 0.6 }}>
                    يتم التشغيل بواسطة <Link href="https://oorbis.top" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" style={{color: '#A70000'}}>Orbis Q</Link>
                </p>
            </div>
        </div>
    );
};

export default BrandIdentityPage;