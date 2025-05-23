"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Instagram, Twitter, Facebook, Youtube, Utensils, WifiOff, ExternalLink, Linkedin, MapPin, Clock, Mail } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import { useGetQuery } from '@/src/hooks/queries-actions';
import { Shop } from '@/src/types/shop';

// --- Helper: Loading Skeleton ---
const BrandPageSkeleton: React.FC = () => (
    <div className="min-h-screen w-full max-w-md mx-auto flex flex-col items-center justify-center p-8 animate-pulse" dir="rtl">
        <div className="w-32 h-32 bg-gray-300 rounded-full mb-6 shadow-md"></div>
        <div className="h-8 bg-gray-300 rounded-full w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded-full w-1/2 mb-6"></div>
        <div className="h-5 bg-gray-200 rounded-full w-full mb-3"></div>
        <div className="h-5 bg-gray-200 rounded-full w-full mb-6"></div>
        <div className="h-14 bg-gray-300 rounded-xl w-full mb-4"></div>
        <div className="h-14 bg-gray-300 rounded-xl w-full mb-6"></div>
        <div className="flex gap-5 mb-6">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>
        <div className="h-3 bg-gray-200 rounded-full w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded-full w-1/4 mt-2"></div>
    </div>
);

// --- Main Component ---
const BrandIdentityPage: React.FC = () => {
    const [error] = useState<string | null>(null);
    const [animateContent, setAnimateContent] = useState(false);

    const params = useParams();
    const searchParams = useSearchParams();
    const shop_id = Array.isArray(params?.id) ? params.id[0] : params?.id;
    const deskNumber = searchParams?.get('desk');

    const { data: shop, isLoading } = useGetQuery<Shop>({
        url: `/shops/${shop_id}`,
        key: ['shop']
    });

    // Trigger animations after component mounts
    useEffect(() => {
        setAnimateContent(true);
    }, []);

    const themeColors = useMemo(() => {
        if (!shop) return null;
        return shop?.shop_theme;
    }, [shop]);

    // --- Prepare Social Links with custom order ---
    const socialMediaLinks = useMemo(() => {
        if (!shop) return [];
        
        const priorityOrder = ['instagram', 'facebook', 'twitter', 'youtube', 'tiktok', 'snapchat', 'linkedin', 'pinterest'];
        
        const links = [
            { id: 'instagram', name: 'Instagram', url: shop['social_links']?.['instagram'], icon: Instagram },
            { id: 'twitter', name: 'Twitter', url: shop['social_links']?.['twitter'], icon: Twitter },
            { id: 'facebook', name: 'Facebook', url: shop['social_links']?.['facebook'], icon: Facebook },
            { id: 'youtube', name: 'Youtube', url: shop['social_links']?.['youtube'], icon: Youtube },
            { id: 'snapchat', name: 'Snapchat', url: shop['social_links']?.['snapchat'], icon: ExternalLink },
            { id: 'tiktok', name: 'TikTok', url: shop['social_links']?.['tiktok'], icon: ExternalLink },
            { id: 'linkedin', name: 'LinkedIn', url: shop['social_links']?.['linkedin'], icon: Linkedin },
            { id: 'pinterest', name: 'Pinterest', url: shop['social_links']?.['pinterest'], icon: ExternalLink },
        ].filter(link => !!link.url);
        
        // Sort links based on priority order
        return links.sort((a, b) => {
            const indexA = priorityOrder.indexOf(a.id);
            const indexB = priorityOrder.indexOf(b.id);
            return indexA - indexB;
        });
    }, [shop]);

    // --- Construct Links for Actions ---
    const eMenuLink = shop ? `/${shop?.id}/emenu${deskNumber ? `?desk=${deskNumber}` : ''}` : '#';


    // --- Prepare Business Hours If Available ---
    const hasBusinessHours = shop?.business_info?.opening_time && 
                           Object.values(shop?.business_info.opening_time).some(day => day?.length > 0);

    // --- Calculate if shop is currently open ---
    const isCurrentlyOpen = useMemo(() => {
        if (!shop?.business_info?.opening_time) return null;
        
        return true
        // const today = new Date().toLocaleString('en-us', {weekday: 'long'}).toLowerCase();
        // const currentHours = shop?.business_info.opening_time;
        
        // if (!currentHours || currentHours.length === 0) return false;
        
        // const now = new Date();
        // const currentTime = now.getHours() * 60 + now.getMinutes();
        
        // return currentHours.some(timeRange => {
        //     const [startTime, endTime] = timeRange.split('-').map(time => {
        //         const [hours, minutes] = time.split(':').map(Number);
        //         return hours * 60 + minutes;
        //     });
            
        //     return currentTime >= startTime && currentTime <= endTime;
        // });
    }, [shop]);


        // --- Render Loading/Error States ---
        if (isLoading) return <BrandPageSkeleton />;

        if (error || !shop) {
            return (
                <div className="min-h-screen w-full max-w-md mx-auto flex flex-col items-center justify-center p-8 text-center" dir="rtl">
                    <div className="p-6 rounded-2xl bg-white/90 shadow-lg backdrop-blur-sm">
                        <WifiOff className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h1 className="text-xl font-bold text-red-600 mb-2">خطأ في الاتصال</h1>
                        <p className="text-gray-700 mb-6">{error || "لا يمكن عرض بيانات المطعم حالياً."}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 text-white rounded-xl font-semibold text-sm hover:opacity-90 transition shadow-md"
                            style={{ backgroundColor: themeColors?.primary_color || '#d32f2f' }}
                        >
                            المحاولة مرة أخرى
                        </button>
                    </div>
                </div>
            );
        }

    // --- Main Render ---
    return (
        <div className="min-h-screen w-full mx-auto flex flex-col items-center overflow-hidden" dir="rtl">
            {/* Hero Banner with Cover Image & Overlay */}
            <div className="w-full h-[280px] md:h-[320px] relative">
                {shop?.cover ? (
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={shop?.cover}
                            alt={`${shop?.name} Cover`}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"></div>
                    </div>
                ) : (
                    <div 
                        className="absolute inset-0 z-0"
                        style={{ 
                            backgroundColor: themeColors?.primary_color,
                            backgroundImage: `radial-gradient(circle at 25px 25px, ${themeColors?.accent_color}30 2%, transparent 0%), 
                                              radial-gradient(circle at 75px 75px, ${themeColors?.accent_color}20 2%, transparent 0%)`,
                            backgroundSize: '100px 100px'
                        }}
                    ></div>
                )}
            </div>

            {/* Main Content Card */}
            <div className={`relative m-4 z-10 w-[95%] max-w-lg bg-white rounded-[32px] -mt-12 shadow-xl px-6 pt-0 pb-10
                          transform transition-all duration-700 ease-out ${animateContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                
                {/* Logo */}
                <div className="flex justify-center -mt-16 mb-6">
                    <div className={`w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg
                               transform transition-all duration-700 delay-100 ${animateContent ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                        <Image
                            src={shop?.logo || '/placeholder-logo.png'} 
                            alt={`${shop?.name} Logo`}
                            width={160}
                            height={160}
                            className="w-full h-full object-cover bg-white"
                            priority
                        />
                    </div>
                </div>

                {/* Brand Info */}
                <div className={`text-center mb-8 transform transition-all duration-500 delay-200 
                             ${animateContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2"
                        style={{ color: themeColors?.primary_color }}>
                        {shop?.name}
                    </h1>
                    
                    {/* Open Status Badge */}
                    {isCurrentlyOpen !== null && (
                        <div className="flex justify-center mb-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                                        ${isCurrentlyOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                <span className={`w-2 h-2 rounded-full mr-1.5 ${isCurrentlyOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                {isCurrentlyOpen ? 'مفتوح الآن' : 'مغلق الآن'}
                            </span>
                        </div>
                    )}
                    
                    {/* Description */}
                    {shop?.description && (
                        <p className="text-gray-700 text-base px-6 mt-3 leading-relaxed">
                            {shop?.description}
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className={`w-full max-w-xs mx-auto space-y-3 mb-8 transform transition-all duration-500 delay-300 
                             ${animateContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <Link href={eMenuLink} className="block w-full">
                        <button
                            className="w-full flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-200 hover:shadow-xl active:scale-[0.98]"
                            style={{ 
                                backgroundColor: themeColors?.primary_color,
                                boxShadow: `0 4px 14px ${themeColors?.primary_color}40`
                            }}
                        >
                            <Utensils size={20} />
                            تصفح المنيو
                        </button>
                    </Link>
                </div>

                {/* Contact & Business Info */}
                <div className={`space-y-6 mb-10 transform transition-all duration-500 delay-400 
                             ${animateContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    
                    {/* Contact Info */}
                    <div className="bg-gray-50 rounded-2xl p-5 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4"
                            style={{ color: themeColors?.primary_color }}>
                            معلومات التواصل
                        </h3>
                        
                        <div className="space-y-4">
                            {shop?.contact_info?.phone && (
                                <a href={`tel:${shop?.contact_info?.phone}`} 
                                   className="flex items-center gap-3 text-gray-700 hover:text-gray-900">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                                         style={{ backgroundColor: `${themeColors?.primary_color}15` }}>
                                        <Phone size={18} style={{ color: themeColors?.primary_color }} />
                                    </div>
                                    <span dir="ltr">{shop?.contact_info?.phone}</span>
                                </a>
                            )}
                            
                            {shop?.contact_info?.whatsapp && (
                                <a href={`https://wa.me/${(shop?.contact_info?.whatsapp ?? '').replace(/\D/g, '')}`}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="flex items-center gap-3 text-gray-700 hover:text-gray-900">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                                         style={{ backgroundColor: `${themeColors?.primary_color}15` }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" 
                                             fill={themeColors?.primary_color}><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.298.297-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413z"/></svg>
                                    </div>
                                    <span>تواصل عبر واتساب</span>
                                </a>
                            )}
                            
                            {shop?.contact_info?.email && (
                                <a href={`mailto:${shop?.contact_info?.email}`}
                                   className="flex items-center gap-3 text-gray-700 hover:text-gray-900">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                                         style={{ backgroundColor: `${themeColors?.primary_color}15` }}>
                                        <Mail size={18} style={{ color: themeColors?.primary_color }} />
                                    </div>
                                    <span>{shop?.contact_info?.email}</span>
                                </a>
                            )}
                            
                            {shop?.address && (
                                <div className="flex items-center gap-3 text-gray-700">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                                         style={{ backgroundColor: `${themeColors?.primary_color}15` }}>
                                        <MapPin size={18} style={{ color: themeColors?.primary_color }} />
                                    </div>
                                    <span>{shop?.address.city} - {shop?.address.street} </span>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Business Hours */}
                    {hasBusinessHours && (
                        <div className="bg-gray-50 rounded-2xl p-5 shadow-sm">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"
                                style={{ color: themeColors?.primary_color }}>
                                <Clock size={18} />
                                ساعات العمل
                            </h3>
                            
                            {/* <div className="space-y-2">
                                {shop?.business_info?. && 
                                  Object.entries(shop?.business_info.business_hours)
                                    .map(([day, hours]) => {
                                        const dayNames = {
                                            sunday: 'الأحد',
                                            monday: 'الإثنين',
                                            tuesday: 'الثلاثاء',
                                            wednesday: 'الأربعاء',
                                            thursday: 'الخميس',
                                            friday: 'الجمعة',
                                            saturday: 'السبت'
                                        };
                                        
                                        return (
                                            <div key={day} className="flex justify-between text-sm">
                                                <span className="font-medium">{dayNames[day]}</span>
                                                <span className="text-gray-600 font-mono">
                                                    {hours && hours.length > 0 
                                                        ? hours.join(', ') 
                                                        : 'مغلق'}
                                                </span>
                                            </div>
                                        );
                                    })
                                }
                            </div> */}
                        </div>
                    )}
                </div>

                {/* Social Media Links */}
                {socialMediaLinks.length > 0 && (
                    <div className={`mb-10 transform transition-all duration-500 delay-500 
                                 ${animateContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        <h3 className="text-lg font-semibold mb-4 text-center"
                            style={{ color: themeColors?.primary_color }}>
                            تابعنا على وسائل التواصل
                        </h3>
                        
                        <div className="flex justify-center flex-wrap gap-4">
                            {socialMediaLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url ?? '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
                                    style={{ 
                                        backgroundColor: themeColors?.primary_color,
                                        boxShadow: `0 4px 10px ${themeColors?.primary_color}30`
                                    }}
                                    title={link.name}
                                >
                                    <link.icon size={22} color="#FFFFFF" />
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Branding */}
            <div className={`w-full bg-gray-50 py-4 text-center transform transition-all duration-500 delay-600 
                         ${animateContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <p className="text-sm text-gray-600">
                    يتم التشغيل بواسطة <Link href="https://oorbis.top" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline" style={{color: '#A70000'}}>Orbis Q</Link>
                </p>
            </div>
        </div>
    );
};

export default BrandIdentityPage;