// src/components/emenu/modals/ProductModifiersModal.tsx
import React, { useState, useEffect } from 'react';
import { XCircle, Check } from 'lucide-react';
import { Product, Modifier } from '@/src/types/product';
import { ShopTheme } from '@/src/types/shop';

interface SelectedModifier extends Modifier {
  selected: boolean;
}

interface ProductModifiersModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onAddToCart: (product: Product, selectedModifiers: Modifier[]) => void;
  themeColors: ShopTheme | null;
}

const ProductModifiersModal: React.FC<ProductModifiersModalProps> = ({ 
  isOpen, 
  onClose, 
  product, 
  onAddToCart, 
  themeColors 
}) => {
  // Group modifiers by type (required variations vs optional extras)
  const [variationModifiers, setVariationModifiers] = useState<SelectedModifier[]>([]);
  const [extraModifiers, setExtraModifiers] = useState<SelectedModifier[]>([]);
  
  useEffect(() => {
    if (isOpen && product.modifiers) {
      // Initialize modifiers with selected state
      const variations: SelectedModifier[] = [];
      const extras: SelectedModifier[] = [];
      
      product.modifiers.forEach(modifier => {
        const modifierWithSelection = {
          ...modifier,
          selected: false
        };
        
        // If price_adjustment is null, it's a required variation
        if (modifier.price_adjustment === null) {
          variations.push(modifierWithSelection);
        } else {
          extras.push(modifierWithSelection);
        }
      });
      
      // Auto-select the first variation if any exist
      if (variations.length > 0) {
        variations[0].selected = true;
      }
      
      setVariationModifiers(variations);
      setExtraModifiers(extras);
    }
  }, [isOpen, product]);
  
  const handleVariationSelect = (index: number) => {
    setVariationModifiers(prev => 
      prev.map((mod, i) => ({
        ...mod,
        selected: i === index // Only one can be selected
      }))
    );
  };
  
  const handleExtraToggle = (index: number) => {
    setExtraModifiers(prev => 
      prev.map((mod, i) => i === index ? {
        ...mod,
        selected: !mod.selected
      } : mod)
    );
  };
  
  const handleSubmit = () => {
    const selectedModifiers: Modifier[] = [
      ...variationModifiers.filter(mod => mod.selected),
      ...extraModifiers.filter(mod => mod.selected)
    ];
    
    onAddToCart(product, selectedModifiers);
    onClose();
  };
  
  if (!isOpen) return null;
  
  const hasRequiredVariations = variationModifiers.length > 0;
  const hasOptionalExtras = extraModifiers.length > 0;
  const isSubmitEnabled = !hasRequiredVariations || variationModifiers.some(mod => mod.selected);
  
  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center p-4 z-40" dir="rtl" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-5 md:p-6 max-h-[90vh] overflow-y-auto" 
        style={{ backgroundColor: themeColors?.secondary_color || '#ffffff' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg md:text-xl font-semibold" style={{color: themeColors?.text_color}}>
            {product.name} - اختيارات
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>
        
        {hasRequiredVariations && (
          <div className="mb-6">
            <h4 className="text-base font-medium mb-2" style={{color: themeColors?.primary_color}}>
              اختر نوع واحد (مطلوب)
            </h4>
            <div className="space-y-2">
              {variationModifiers.map((modifier, index) => (
                <div 
                  key={`variation-${index}`}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 flex justify-between items-center ${modifier.selected ? 'ring-2' : 'border'}`}
                  style={{
                    borderColor: themeColors?.primary_color + '40',
                    backgroundColor: modifier.selected ? `${themeColors?.primary_color}15` : 'transparent',
                    boxShadow: modifier.selected ? `0 2px 4px ${themeColors?.accent_color}20` : 'none',
                    ...(modifier.selected ? { borderColor: themeColors?.primary_color } : {})
                  }}
                  onClick={() => handleVariationSelect(index)}
                >
                  <div>
                    <span className="font-medium" style={{color: themeColors?.text_color}}>{modifier.name}</span>
                  </div>
                  {modifier.selected && (
                    <Check size={20} style={{color: themeColors?.primary_color}} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {hasOptionalExtras && (
          <div className="mb-6">
            <h4 className="text-base font-medium mb-2" style={{color: themeColors?.primary_color}}>
              إضافات اختيارية
            </h4>
            <div className="space-y-2">
              {extraModifiers.map((modifier, index) => (
                <div 
                  key={`extra-${index}`}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 flex justify-between items-center ${modifier.selected ? 'ring-2' : 'border'}`}
                  style={{
                    borderColor: themeColors?.primary_color + '40',
                    backgroundColor: modifier.selected ? `${themeColors?.primary_color}15` : 'transparent',
                    boxShadow: modifier.selected ? `0 2px 4px ${themeColors?.accent_color}20` : 'none',
                    ...(modifier.selected ? { borderColor: themeColors?.primary_color } : {})
                  }}
                  onClick={() => handleExtraToggle(index)}
                >
                  <div>
                    <span className="font-medium" style={{color: themeColors?.text_color}}>{modifier.name}</span>
                    {modifier.price_adjustment && modifier.price_adjustment > 0 && (
                      <span className="text-sm mr-2" style={{color: themeColors?.text_color}}>
                        +{modifier.price_adjustment.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {modifier.selected && (
                    <Check size={20} style={{color: themeColors?.primary_color}} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            disabled={!isSubmitEnabled}
            className={`px-4 py-2 rounded-md text-white font-medium transition-all duration-200 ${!isSubmitEnabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md active:scale-[0.98]'}`}
            style={{ backgroundColor: themeColors?.primary_color }}
          >
            إضافة للطلب
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModifiersModal;