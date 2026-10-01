import React, { useState } from 'react';
import { Search, Camera, User, Heart, ShoppingBag, ChevronDown } from 'lucide-react';
import { DoodleHeart } from './Doodles';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenImageSearch: () => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  activeNav: string;
  setActiveNav: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenImageSearch,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  activeNav,
  setActiveNav
}) => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const navItems = ['Home', 'Shop', 'Categories', 'About', 'Contact'];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div 
          onClick={() => setActiveNav('Shop')}
          className="flex items-center gap-1.5 cursor-pointer select-none group shrink-0"
        >
          <div className="relative flex items-center">
            {/* Playful Lil' Humans brand typography */}
            <div className="flex items-baseline">
              <span className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight flex items-center">
                <span className="relative">
                  lil
                  {/* Whimsical double dots over 'i' */}
                  <span className="absolute -top-1 left-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 group-hover:scale-125 transition-transform" />
                  <span className="absolute -top-2.5 left-3 w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
                </span>
                <span className="text-rose-500 font-hand text-3xl ml-0.5">’</span>
              </span>
              <span className="font-heading font-bold text-xl sm:text-2xl text-slate-800 tracking-wider ml-1 uppercase">
                HUMANS
              </span>
            </div>
            <DoodleHeart className="w-4 h-4 ml-1 text-rose-500 fill-rose-500 animate-pulse hidden sm:block" />
          </div>
        </div>

        {/* Global Search with "Search by Image" pill */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4 relative items-center">
          <div className="relative w-full flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search toys, dresses, books & essentials..."
              className="w-full pl-10 pr-36 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-full border border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all outline-none"
            />
            {/* Camera / Search by Image button */}
            <button
              type="button"
              onClick={onOpenImageSearch}
              className="absolute right-2 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-sky-600 bg-white hover:bg-sky-50 rounded-full border border-slate-200 hover:border-sky-200 shadow-xs transition-colors cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-sky-500" />
              <span>Search by Image</span>
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeNav === item;
            return (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`relative text-sm font-semibold transition-colors cursor-pointer pb-1 ${
                  isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right utility actions */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          
          {/* Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <User className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Account</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {accountMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 text-xs text-slate-700 animate-in fade-in slide-in-from-top-2"
                onMouseLeave={() => setAccountMenuOpen(false)}
              >
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="font-semibold text-slate-900 text-sm">Welcome Parent! 🌟</p>
                  <p className="text-slate-500 text-[11px] truncate">parent@lilhumans.com</p>
                </div>
                <div className="py-1">
                  <a href="#orders" onClick={() => setAccountMenuOpen(false)} className="block px-4 py-2 hover:bg-slate-50">My Orders & Tracking</a>
                  <a href="#wishlist" onClick={() => { setAccountMenuOpen(false); onOpenWishlist(); }} className="block px-4 py-2 hover:bg-slate-50">Wishlist & Favorites</a>
                  <a href="#child-profiles" onClick={() => setAccountMenuOpen(false)} className="block px-4 py-2 hover:bg-slate-50">Kids Birthday Club (15% Off)</a>
                  <a href="#support" onClick={() => setAccountMenuOpen(false)} className="block px-4 py-2 hover:bg-slate-50">Help & 24/7 Support</a>
                </div>
                <div className="pt-1 border-t border-slate-100">
                  <button className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 font-medium">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Mobile Search button */}
          <button
            onClick={onOpenImageSearch}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full md:hidden"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-slate-600 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute 0 top-0.5 right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-rose-500 text-white text-[10px] font-bold rounded-full px-1 shadow-xs">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors flex items-center"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-purple-600 text-white text-[10px] font-bold rounded-full px-1 shadow-xs">
              {cartCount}
            </span>
          </button>

        </div>

      </div>

      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-3 pt-1">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search kids products..."
            className="w-full pl-10 pr-28 py-2 bg-slate-50 text-sm rounded-full border border-slate-200 outline-none"
          />
          <button
            onClick={onOpenImageSearch}
            className="absolute right-1.5 flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-600 bg-white rounded-full border border-slate-200"
          >
            <Camera className="w-3 h-3 text-sky-500" />
            <span>Image</span>
          </button>
        </div>
      </div>
    </header>
  );
};
