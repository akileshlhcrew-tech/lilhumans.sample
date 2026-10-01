import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-rose-50/40">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h3 className="font-heading font-bold text-lg text-slate-900">
                Saved Favorites ({wishlist.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto text-rose-400">
                  <Heart className="w-8 h-8" />
                </div>
                <p className="font-heading font-bold text-slate-800 text-base">Your Wishlist is Empty</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Tap the heart icon on any outfit, toy, or book to save it for later!
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-full hover:bg-slate-800"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 space-y-3">
                {wishlist.map(product => (
                  <div key={product.id} className="pt-3 flex gap-3 items-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase">
                        {product.brand}
                      </p>
                      <h4 className="text-xs font-semibold text-slate-800 truncate">
                        {product.title}
                      </h4>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">
                        ₹{product.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => onMoveToCart(product)}
                        className="p-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-medium flex items-center gap-1 shadow-xs cursor-pointer"
                        title="Move to Cart"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Add</span>
                      </button>

                      <button
                        onClick={() => onRemoveFromWishlist(product.id)}
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
              <span>{wishlist.length} item{wishlist.length > 1 ? 's' : ''} saved</span>
              <button
                onClick={() => {
                  wishlist.forEach(p => onMoveToCart(p));
                  onClose();
                }}
                className="font-bold text-sky-600 hover:underline cursor-pointer"
              >
                Add All to Bag →
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
