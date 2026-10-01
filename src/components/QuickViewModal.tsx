import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, Check } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, selectedSize?: string, selectedColor?: string, quantity?: number) => void;
  onBuyNow: (product: Product, selectedSize?: string, selectedColor?: string, quantity?: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!isOpen || !product) return null;

  const currentSize = selectedSize || product.sizes?.[0] || 'Standard';
  const currentColor = selectedColor || product.colors?.[0] || 'Default';

  const handleAddToCartClick = () => {
    onAddToCart(product, currentSize, currentColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
          
          {/* Left Media */}
          <div className="space-y-3">
            <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 px-3 py-1 bg-rose-500 text-white font-bold text-xs rounded-lg uppercase tracking-wider shadow-xs">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Micro value badges */}
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-slate-600">
              <div className="p-2 bg-slate-50 rounded-xl flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
                <span>100% Safe</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-xl flex flex-col items-center">
                <Truck className="w-4 h-4 text-sky-600 mb-1" />
                <span>Fast Dispatch</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-xl flex flex-col items-center">
                <RefreshCw className="w-4 h-4 text-indigo-600 mb-1" />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>

          {/* Right Product Details */}
          <div className="space-y-4 text-slate-800">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {product.brand} · {product.category}
              </p>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 mt-1 leading-snug">
                {product.title}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <span className="text-sm font-bold text-slate-800">{product.rating}</span>
                <span className="text-xs text-slate-400">({product.reviewCount} parent reviews)</span>
                <span className="text-xs bg-sky-50 text-sky-700 font-semibold px-2 py-0.5 rounded-full ml-auto">
                  Ages: {product.ageGroup}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 pt-1 border-t border-slate-100">
              <span className="text-2xl font-extrabold text-slate-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-sm text-slate-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-rose-500">
                    ({product.discountPercent}% OFF)
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Select Size: <span className="font-normal text-slate-500">{currentSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                        currentSize === size
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Select Color: <span className="font-normal text-slate-500">{currentColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(col => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setSelectedColor(col)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
                        currentColor === col
                          ? 'border-sky-500 bg-sky-50 text-sky-700 font-bold'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400'
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-bold text-slate-700">Quantity:</span>
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 text-sm font-bold"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={handleAddToCartClick}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 text-white shadow-md'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  onBuyNow(product, currentSize, currentColor, quantity);
                  onClose();
                }}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-300 hover:border-slate-400 font-bold text-xs text-slate-800 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Buy Now
              </button>

              <button
                type="button"
                onClick={() => onToggleWishlist(product)}
                className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-500'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-500'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
