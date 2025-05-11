// src/components/common/EMenuPageSkeleton.tsx
import React from 'react';

const EMenuPageSkeleton: React.FC = () => (
    <div className="min-h-screen w-full max-w-lg mx-auto bg-gray-100 p-4 animate-pulse" dir="rtl"> {/* max-w-lg for iPad consistency */}
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-6 p-3">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-300 rounded-md"></div> {/* Responsive table number */}
            <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                    <div className="h-6 md:h-7 bg-gray-300 rounded w-24 md:w-32 mb-1"></div> {/* Responsive name */}
                    <div className="h-4 md:h-5 bg-gray-300 rounded w-32 md:w-40"></div> {/* Responsive description */}
                </div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-300 rounded-full"></div> {/* Responsive logo */}
            </div>
        </div>
        {/* Category Tabs Skeleton */}
        <div className="flex gap-x-2 mb-6 overflow-x-auto pb-2 px-3 sticky top-0 bg-gray-100">
            {[1, 2, 3].map(i => <div key={i} className="h-10 md:h-12 bg-gray-300 rounded-lg w-28 md:w-32 flex-shrink-0"></div>)}
        </div>
        {/* Menu Items Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 px-3"> {/* Responsive grid */}
            {[1, 2, 3, 4, 5, 6].map(i => ( // More items for larger screens
                <div key={i} className="bg-gray-200 rounded-lg p-3">
                    <div className="w-full h-24 md:h-32 bg-gray-300 rounded-md mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
            ))}
        </div>
        {/* Bottom Nav Skeleton */}
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-gray-200 border-t border-gray-300 max-w-lg mx-auto"></div>
    </div>
);
export default EMenuPageSkeleton;