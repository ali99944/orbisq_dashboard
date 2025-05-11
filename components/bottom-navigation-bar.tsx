// src/components/emenu/BottomNavigationBar.tsx
import React from 'react';
import { Utensils, ListOrdered, ShoppingCart } from 'lucide-react';
import { NavTab } from '@/src/types/emenu';
import { ShopTheme } from '@/src/types/shop';

interface BottomNavigationBarProps {
    activeTab: NavTab;
    onTabChange: (tab: NavTab) => void;
    cartItemCount: number;
    themeColors: ShopTheme | null;
}

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({ activeTab, onTabChange, cartItemCount, themeColors }) => {
    const navItems = [
        { id: 'menu' as NavTab, label: 'المنيو', icon: Utensils },
        { id: 'orders' as NavTab, label: 'طلباتي', icon: ListOrdered },
        { id: 'cart' as NavTab, label: 'السلة', icon: ShoppingCart, count: cartItemCount },
    ];
    return (
        <footer className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto shadow-top-strong z-30 border-t" style={{ backgroundColor: themeColors?.background_color, borderColor: `${themeColors?.primary_color}50` }}>
            <nav className="flex justify-around items-center h-16">
                {navItems.map((item) => (
                    <button key={item.id} onClick={() => onTabChange(item.id)}
                            className={`flex flex-col items-center justify-center w-1/3 h-full p-1 transition-colors duration-200 ease-in-out relative`}
                            style={{ color: activeTab === item.id ? themeColors?.primary_color : themeColors?.text_color, opacity: activeTab === item.id ? 1 : 0.7, }}
                            aria-current={activeTab === item.id ? 'page' : undefined}>
                        <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                        <span className={`text-[10px] mt-0.5 font-medium ${activeTab === item.id ? 'font-semibold' : ''}`}>{item.label}</span>
                        {item.id === 'cart' && (item?.count ?? 0) > 0 && <span className="absolute top-1.5 right-1/2 translate-x-[20px] bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{item.count ?? 0 > 9 ? '9+' : item.count}</span>}
                    </button>
                ))}
            </nav>
        </footer>
    );
};
export default BottomNavigationBar;