'use client';

// src/components/emenu/Header.tsx
import React from 'react';
// import { ThemeColors } from '@/src/types/emenu';
import Image from 'next/image';
import { useGetQuery } from '@/src/hooks/queries-actions';
import { Shop, ShopTheme } from '@/src/types/shop';
import { useParams } from 'next/navigation';

interface EMenuHeaderProps {
    themeColors: ShopTheme | null;
    displayTableNumber: string;
}

const EMenuHeader: React.FC<EMenuHeaderProps> = ({ themeColors, displayTableNumber }) => {
    const params = useParams();
    const restaurantIdFromParams = params?.id as string;
    const { data: shop } = useGetQuery<Shop>({
            url: `/shops/${restaurantIdFromParams}`,
            key: ['shop']
    })
    return (
        <header className="p-3 py-4 flex justify-between items-center w-full" style={{ borderBottom: `1px solid ${themeColors?.primary_color}20` }}>
            <div className="w-14 h-14 md:w-14 md:h-14 flex flex-col items-center justify-center rounded-md" style={{ backgroundColor: themeColors?.primary_color }}>
                {displayTableNumber != '0' && <span className="text-[10px] md:text-xs leading-tight" style={{ color: themeColors?.accent_color, opacity: 1 }}>طاولة</span>}
                <span className="font-bold text-xl md:text-2xl leading-tight flex justify-center" style={{ color: themeColors?.accent_color }}>
                    {displayTableNumber == '0' ? <Image src="/restaurant-menu.svg" alt="Table" width={40} height={40}  /> : displayTableNumber}
                </span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 text-left">
                <div>
                    <h1 className="text-lg md:text-xl font-bold" style={{ color: themeColors?.text_color }}>{shop?.name}</h1>
                    <p className="text-[11px] md:text-xs" style={{ color: themeColors?.text_color, opacity: 0.8 }}>{shop?.description}</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: themeColors?.accent_color }}>
                    <Image
                        src={shop?.logo || ''} // Use local path
                        alt={`${shop?.name} Logo`}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover bg-white rounded-full"
                        priority
                    />
                </div>
            </div>
        </header>
    );
};
export default EMenuHeader;