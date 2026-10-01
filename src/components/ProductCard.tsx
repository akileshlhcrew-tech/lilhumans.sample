import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onQuickView
}) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-3.5 flex flex-col justify-between hover:shadow-xl hover:border-slate-300 transition-all duration-300 relative">
      
      {/* Top Media Area */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-50 mb-3 cursor-pointer">
        
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          onClick={() => onQuickView(product)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Badge (New / Sale) */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            {product.badge === 'New' && (
              <span className="px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase bg-emerald-500 text-white rounded-md shadow-xs">
                New
              </span>
            )}
            {product.badge === 'Sale' && (
              <span className="px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase bg-rose-500 text-white rounded-md shadow-xs">
                Sale
              </span>
            )}
            {product.badge === 'Bestseller' && (
              <span className="px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase bg-amber-500 text-white rounded-md shadow-xs">
                Bestseller
              </span>
            )}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-xs cursor-pointer ${
            isWishlisted
              ? 'bg-rose-50 text-rose-500 hover:bg-rose-100'
              : 'bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quick View overlay on hover */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute inset-x-3 bottom-3 py-1.5 bg-white/95 backdrop-blur-xs text-slate-800 text-xs font-semibold rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity text-center hover:bg-white"
        >
          Quick View
        </button>
      </div>

      {/* Info Area */}
      <div className="flex-1 flex flex-col justify-between">
        
        <div>
          {/* Brand */}
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
            {product.brand}
          </div>

          {/* Title */}
          <h4
            onClick={() => onQuickView(product)}
            className="text-xs sm:text-sm font-semibold text-slate-800 hover:text-sky-600 line-clamp-2 cursor-pointer leading-snug mb-1.5 transition-colors"
          >
            {product.title}
          </h4>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-slate-700">
              {product.rating}
            </span>
            <span className="text-[11px] text-slate-400">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Price Row */}
        <div className="pt-1 pb-3">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-base sm:text-lg font-extrabold text-slate-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-xs text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-rose-500">
                  ({product.discountPercent}% OFF)
                </span>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="flex items-center justify-center gap-1 py-2 px-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="truncate">Add to Cart</span>
          </button>

          <button
            type="button"
            onClick={() => onBuyNow(product)}
            className="flex items-center justify-center py-2 px-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer truncate"
          >
            Buy Now
          </button>
        </div>

      </div>

    </div>
  );
};
