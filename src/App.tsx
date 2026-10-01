/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryStrip } from './components/CategoryStrip';
import { ShopByAge } from './components/ShopByAge';
import { ProductFilterSidebar } from './components/ProductFilterSidebar';
import { ProductCard } from './components/ProductCard';
import { PromoBanners } from './components/PromoBanners';
import { WhyShopStrip } from './components/WhyShopStrip';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchByImageModal } from './components/SearchByImageModal';
import { INITIAL_PRODUCTS } from './data/products';
import { Product, CartItem, FilterState } from './types';
import { ChevronDown, SlidersHorizontal, Check } from 'lucide-react';

export default function App() {
  const productsRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Main search & active nav state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('Shop');

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCategories: [],
    selectedAgeGroups: [],
    selectedBrands: [],
    priceRange: [0, 10000],
    selectedSizes: [],
    selectedColors: [],
    onlyInStock: false,
    onlyFastDelivery: false,
    sortBy: 'relevant'
  });

  // Responsive mobile filter toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Cart state - initialized with 2 items like shown in the screenshot badge "2"
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[1], // French Terry Caramel Stripe Pants
      quantity: 1,
      selectedSize: '3-4Y',
      selectedColor: 'Caramel Striped'
    },
    {
      product: INITIAL_PRODUCTS[3], // Tiny Tots Organic Cotton Baby Romper
      quantity: 1,
      selectedSize: '6-12M',
      selectedColor: 'Sage Bear'
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState<Product[]>([INITIAL_PRODUCTS[0]]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Quick View modal state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Search by Image modal
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Toggle category
  const handleToggleCategory = (categoryName: string) => {
    setFilters(prev => {
      const exists = prev.selectedCategories.includes(categoryName);
      return {
        ...prev,
        selectedCategories: exists
          ? prev.selectedCategories.filter(c => c !== categoryName)
          : [...prev.selectedCategories, categoryName]
      };
    });
    // Smooth scroll down to products section
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Toggle age group
  const handleToggleAge = (ageLabel: string) => {
    setFilters(prev => {
      const exists = prev.selectedAgeGroups.includes(ageLabel);
      return {
        ...prev,
        selectedAgeGroups: exists
          ? prev.selectedAgeGroups.filter(a => a !== ageLabel)
          : [...prev.selectedAgeGroups, ageLabel]
      };
    });
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedCategories: [],
      selectedAgeGroups: [],
      selectedBrands: [],
      priceRange: [0, 10000],
      selectedSizes: [],
      selectedColors: [],
      onlyInStock: false,
      onlyFastDelivery: false,
      sortBy: 'relevant'
    });
    setSearchQuery('');
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product) => {
    const isSaved = wishlist.some(p => p.id === product.id);
    if (isSaved) {
      setWishlist(prev => prev.filter(p => p.id !== product.id));
      showToast(`Removed "${product.title.slice(0, 24)}..." from Wishlist`);
    } else {
      setWishlist(prev => [...prev, product]);
      showToast(`Added to your Wishlist ❤️`);
    }
  };

  // Cart actions
  const handleAddToCart = (
    product: Product,
    selectedSize?: string,
    selectedColor?: string,
    quantity = 1
  ) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedSize: selectedSize || product.sizes?.[0] || 'Standard',
          selectedColor: selectedColor || product.colors?.[0] || 'Default'
        }
      ];
    });
    showToast(`Added to your Little Bag! 🛍️`);
  };

  const handleBuyNow = (
    product: Product,
    selectedSize?: string,
    selectedColor?: string,
    quantity = 1
  ) => {
    handleAddToCart(product, selectedSize, selectedColor, quantity);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleMoveToCart = (product: Product) => {
    handleAddToCart(product);
    setWishlist(prev => prev.filter(p => p.id !== product.id));
  };

  // Promo card clicks
  const handleSelectPromo = (action: string) => {
    if (action === 'new') {
      setFilters(prev => ({ ...prev, sortBy: 'newest' }));
    } else if (action === 'bestseller') {
      setFilters(prev => ({ ...prev, sortBy: 'rating' }));
    } else if (action === 'under999') {
      setFilters(prev => ({ ...prev, priceRange: [0, 999] }));
    } else if (action === 'gifting') {
      setFilters(prev => ({ ...prev, selectedCategories: ['Toys', 'Accessories'] }));
    }
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Image search matched selection
  const handleVisualSearchMatch = (category: string, titleKeyword: string) => {
    setSearchQuery(titleKeyword);
    setFilters(prev => ({
      ...prev,
      selectedCategories: [category]
    }));
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
    showToast(`Visual search matched: "${titleKeyword}" in ${category}! ✨`);
  };

  // Filtered & Sorted Products list
  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter(product => {
      // 1. Search Query
      const query = searchQuery.trim().toLowerCase();
      if (query) {
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesBrand && !matchesCategory && !matchesDesc) {
          return false;
        }
      }

      // 2. Categories
      if (
        filters.selectedCategories.length > 0 &&
        !filters.selectedCategories.includes(product.category)
      ) {
        return false;
      }

      // 3. Age Groups
      if (
        filters.selectedAgeGroups.length > 0 &&
        !filters.selectedAgeGroups.includes(product.ageGroup)
      ) {
        return false;
      }

      // 4. Brands
      if (
        filters.selectedBrands.length > 0 &&
        !filters.selectedBrands.includes(product.brand)
      ) {
        return false;
      }

      // 5. Price Range
      if (product.price > filters.priceRange[1]) {
        return false;
      }

      // 6. Sizes
      if (
        filters.selectedSizes.length > 0 &&
        !product.sizes?.some(s => filters.selectedSizes.includes(s))
      ) {
        return false;
      }

      // 7. Colors
      if (
        filters.selectedColors.length > 0 &&
        !product.colors?.some(c =>
          filters.selectedColors.some(sc => c.toLowerCase().includes(sc.toLowerCase()))
        )
      ) {
        return false;
      }

      // 8. In Stock
      if (filters.onlyInStock && !product.inStock) {
        return false;
      }

      // 9. Fast delivery
      if (filters.onlyFastDelivery && !product.isFastDelivery) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') {
        return a.price - b.price;
      }
      if (filters.sortBy === 'price-high') {
        return b.price - a.price;
      }
      if (filters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (filters.sortBy === 'newest') {
        return a.badge === 'New' ? -1 : 1;
      }
      return 0; // Most relevant
    });
  }, [filters, searchQuery]);

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-3">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header with Search, Image Search, Navigation, Cart & Wishlist */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenImageSearch={() => setIsImageSearchOpen(true)}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        activeNav={activeNav}
        setActiveNav={(nav) => {
          setActiveNav(nav);
          if (nav === 'Categories') {
            categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
          } else if (nav === 'Shop') {
            productsRef.current?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* 2. Hero Banner */}
      <HeroBanner
        onShopNewArrivals={() => {
          setFilters(prev => ({ ...prev, sortBy: 'newest' }));
          productsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
        onExploreCategories={() => {
          categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. Category Icons Strip */}
      <div ref={categoriesRef}>
        <CategoryStrip
          selectedCategories={filters.selectedCategories}
          onToggleCategory={handleToggleCategory}
        />
      </div>

      {/* 4. Shop By Age Cards */}
      <ShopByAge
        selectedAgeGroups={filters.selectedAgeGroups}
        onToggleAge={handleToggleAge}
        onViewAllStages={() => {
          setFilters(prev => ({ ...prev, selectedAgeGroups: [] }));
          productsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 5. Main Product Section with Filter Sidebar & Grid */}
      <main
        ref={productsRef}
        className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Filter (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28">
            <ProductFilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={handleResetFilters}
            />
          </aside>

          {/* Right Product Grid Area */}
          <section className="lg:col-span-9 space-y-6">
            
            {/* Header bar: Title, Product Count, Mobile Filter Button, Sort Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
              
              <div className="flex items-baseline gap-3">
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                  Shop All Kids &amp; Baby Products
                </h2>
                <span className="text-sm text-slate-500 font-medium">
                  {filteredProducts.length === INITIAL_PRODUCTS.length ? '98 products' : `${filteredProducts.length} products`}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                  <span>Filters</span>
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 shadow-xs relative">
                  <span className="text-slate-400 font-normal hidden sm:inline">Sort by:</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        sortBy: e.target.value as FilterState['sortBy']
                      })
                    }
                    className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer pr-4 appearance-none"
                  >
                    <option value="relevant">Most Relevant</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Mobile Filter Collapsible Area */}
            {mobileFilterOpen && (
              <div className="lg:hidden mb-4">
                <ProductFilterSidebar
                  filters={filters}
                  onFilterChange={setFilters}
                  onResetFilters={handleResetFilters}
                />
              </div>
            )}

            {/* Active filter badges / quick chips */}
            {(filters.selectedCategories.length > 0 ||
              filters.selectedAgeGroups.length > 0 ||
              searchQuery) && (
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="text-slate-500">Active filters:</span>
                {searchQuery && (
                  <span className="bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                    Search: "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery('')}
                      className="hover:text-sky-900 ml-0.5 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.selectedCategories.map(cat => (
                  <span
                    key={cat}
                    className="bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-1 rounded-full font-medium flex items-center gap-1"
                  >
                    {cat}
                    <button
                      onClick={() => handleToggleCategory(cat)}
                      className="hover:text-sky-900 ml-0.5 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.selectedAgeGroups.map(age => (
                  <span
                    key={age}
                    className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full font-medium flex items-center gap-1"
                  >
                    {age}
                    <button
                      onClick={() => handleToggleAge(age)}
                      className="hover:text-amber-900 ml-0.5 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-rose-500 hover:underline font-semibold ml-2"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8">
                <p className="font-heading font-bold text-lg text-slate-800">
                  No Little Human products found matching these filters
                </p>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try broadening your price range or clearing category filters to discover more items.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-semibold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.some(p => p.id === product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}

          </section>

        </div>
      </main>

      {/* 6. Promotional Banners Row */}
      <PromoBanners onSelectPromo={handleSelectPromo} />

      {/* 7. Why Shop Lil Humans Trust Strip */}
      <WhyShopStrip />

      {/* 8. Full Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={() => setCartItems([])}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(id) => setWishlist(prev => prev.filter(p => p.id !== id))}
        onMoveToCart={handleMoveToCart}
      />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isWishlisted={quickViewProduct ? wishlist.some(p => p.id === quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <SearchByImageModal
        isOpen={isImageSearchOpen}
        onClose={() => setIsImageSearchOpen(false)}
        onSelectProductMatch={handleVisualSearchMatch}
        products={INITIAL_PRODUCTS}
      />

    </div>
  );
}
