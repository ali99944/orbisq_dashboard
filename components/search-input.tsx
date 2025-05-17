// src/components/search-input.tsx
import React from 'react';
import { Search, X } from 'lucide-react';
import { ShopTheme } from '@/src/types/shop';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
    placeholder?: string;
    themeColors: ShopTheme | null;
}

const SearchInput: React.FC<SearchInputProps> = ({
    value,
    onChange,
    onClear,
    placeholder = 'ابحث عن منتج...',
    themeColors
}) => {
    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full py-2 pr-10 pl-10 text-sm text-right rounded-lg border border-gray-300 focus:ring-2 focus:outline-none"
                placeholder={placeholder}
                style={{
                    borderColor: themeColors?.primary_color + '40',
                    backgroundColor: 'white',
                    boxShadow: `0 2px 4px ${themeColors?.accent_color}20`,
                    color: themeColors?.text_color
                }}
            />
            {value && (
                <button
                    onClick={onClear}
                    className="absolute inset-y-0 left-0 flex items-center pl-3"
                    aria-label="Clear search"
                >
                    <X size={18} className="text-gray-400 hover:text-gray-600" />
                </button>
            )}
        </div>
    );
};

export default SearchInput;