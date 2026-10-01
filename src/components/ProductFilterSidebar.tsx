import React, { useState } from 'react';
import { ChevronDown, ChevronUp, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { AGE_GROUPS } from '../data/ageGroups';
import { BRANDS, SIZES, COLOR_OPTIONS } from '../data/products';
import { FilterState } from '../types';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
}

export const ProductFilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onResetFilters
}) => {
  // Accordion toggle states
  const [openSections, setOpenSections] = useState({
    categories: true,
    age: true,
    brand: true,
    price: true,
    size: false,
    color: true,
    availability: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryToggle = (category: string) => {
    const updated = filters.selectedCategories.includes(category)
      ? filters.selectedCategories.filter(c => c !== category)
      : [...filters.selectedCategories, category];
    onFilterChange({ ...filters, selectedCategories: updated });
  };

  const handleAgeToggle = (age: string) => {
    const updated = filters.selectedAgeGroups.includes(age)
      ? filters.selectedAgeGroups.filter(a => a !== age)
      : [...filters.selectedAgeGroups, age];
    onFilterChange({ ...filters, selectedAgeGroups: updated });
  };

  const handleBrandToggle = (brand: string) => {
    const updated = filters.selectedBrands.includes(brand)
      ? filters.selectedBrands.filter(b => b !== brand)
      : [...filters.selectedBrands, brand];
    onFilterChange({ ...filters, selectedBrands: updated });
  };

  const handleSizeToggle = (size: string) => {
    const updated = filters.selectedSizes.includes(size)
      ? filters.selectedSizes.filter(s => s !== size)
      : [...filters.selectedSizes, size];
    onFilterChange({ ...filters, selectedSizes: updated });
  };

  const handleColorToggle = (colorName: string) => {
    const updated = filters.selectedColors.includes(colorName)
      ? filters.selectedColors.filter(c => c !== colorName)
      : [...filters.selectedColors, colorName];
    onFilterChange({ ...filters, selectedColors: updated });
  };

  const handleMaxPriceChange = (value: number) => {
    onFilterChange({ ...filters, priceRange: [filters.priceRange[0], value] });
  };

  const activeFilterCount =
    filters.selectedCategories.length +
    filters.selectedAgeGroups.length +
    filters.selectedBrands.length +
    filters.selectedSizes.length +
    filters.selectedColors.length +
    (filters.onlyInStock ? 1 : 0) +
    (filters.onlyFastDelivery ? 1 : 0) +
    (filters.priceRange[1] < 10000 ? 1 : 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
      
      {/* Top Header */}
      <div className="p-4 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-700" />
          <h3 className="font-heading font-bold text-slate-900 text-base">Filter &amp; Sort</h3>
          {activeFilterCount > 0 && (
            <span className="bg-sky-100 text-sky-800 text-xs px-2 py-0.5 rounded-full font-bold">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs text-rose-500 hover:text-rose-700 font-medium cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Categories Accordion */}
      <div className="p-4">
        <button
          onClick={() => toggleSection('categories')}
          className="w-full flex items-center justify-between text-left text-sm font-bold text-slate-900 cursor-pointer"
        >
          <span>Categories</span>
          {openSections.categories ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.categories && (
          <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-1">
            {CATEGORIES.map(cat => {
              const checked = filters.selectedCategories.includes(cat.name);
              return (
                <label
                  key={cat.id}
                  className="flex items-center justify-between text-xs text-slate-600 hover:text-slate-900 cursor-pointer group select-none"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleCategoryToggle(cat.name)}
                      className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300 cursor-pointer"
                    />
                    <span className={checked ? 'font-semibold text-slate-900' : ''}>
                      {cat.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 group-hover:text-slate-500">
                    {cat.itemCount}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Age Accordion */}
      <div className="p-4">
        <button
          onClick={() => toggleSection('age')}
          className="w-full flex items-center justify-between text-left text-sm font-bold text-slate-900 cursor-pointer"
        >
          <span>Age</span>
          {openSections.age ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.age && (
          <div className="mt-3 space-y-2">
            {AGE_GROUPS.map(age => {
              const checked = filters.selectedAgeGroups.includes(age.label);
              return (
                <label
                  key={age.id}
                  className="flex items-center justify-between text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleAgeToggle(age.label)}
                      className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300 cursor-pointer"
                    />
                    <span className={checked ? 'font-semibold text-slate-900' : ''}>
                      {age.label}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Brand Accordion */}
      <div className="p-4">
        <button
          onClick={() => toggleSection('brand')}
          className="w-full flex items-center justify-between text-left text-sm font-bold text-slate-900 cursor-pointer"
        >
          <span>Brand</span>
          {openSections.brand ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.brand && (
          <div className="mt-3 space-y-2 max-h-40 overflow-y-auto pr-1">
            {BRANDS.map(brand => {
              const checked = filters.selectedBrands.includes(brand);
              return (
                <label
                  key={brand}
                  className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleBrandToggle(brand)}
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300 cursor-pointer"
                  />
                  <span className={checked ? 'font-semibold text-slate-900' : ''}>
                    {brand}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Price Accordion */}
      <div className="p-4">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-left text-sm font-bold text-slate-900 cursor-pointer"
        >
          <span>Price</span>
          {openSections.price ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.price && (
          <div className="mt-3 space-y-3">
            <input
              type="range"
              min={0}
              max={10000}
              step={100}
              value={filters.priceRange[1]}
              onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <div className="flex items-center justify-between text-xs text-slate-700 font-semibold">
              <span>₹0</span>
              <span className="text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded">
                Up to ₹{filters.priceRange[1].toLocaleString()}
              </span>
              <span>₹10,000+</span>
            </div>
          </div>
        )}
      </div>

      {/* 5. Size Accordion */}
      <div className="p-4">
        <button
          onClick={() => toggleSection('size')}
          className="w-full flex items-center justify-between text-left text-sm font-bold text-slate-900 cursor-pointer"
        >
          <span>Size</span>
          {openSections.size ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.size && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {SIZES.map(size => {
              const selected = filters.selectedSizes.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeToggle(size)}
                  className={`text-[11px] px-2.5 py-1 rounded-md border font-medium transition-colors cursor-pointer ${
                    selected
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Color Accordion */}
      <div className="p-4">
        <button
          onClick={() => toggleSection('color')}
          className="w-full flex items-center justify-between text-left text-sm font-bold text-slate-900 cursor-pointer"
        >
          <span>Color</span>
          {openSections.color ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.color && (
          <div className="mt-3 flex flex-wrap gap-2">
            {COLOR_OPTIONS.map(c => {
              const isSelected = filters.selectedColors.includes(c.name);
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => handleColorToggle(c.name)}
                  title={c.name}
                  className={`w-6 h-6 rounded-full ${c.bg} transition-all cursor-pointer ${
                    isSelected ? 'ring-2 ring-offset-2 ring-slate-900 scale-110' : 'hover:scale-110'
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* 7. Availability Accordion */}
      <div className="p-4">
        <button
          onClick={() => toggleSection('availability')}
          className="w-full flex items-center justify-between text-left text-sm font-bold text-slate-900 cursor-pointer"
        >
          <span>Availability</span>
          {openSections.availability ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.availability && (
          <div className="mt-3 space-y-2">
            <label className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.onlyInStock}
                onChange={(e) => onFilterChange({ ...filters, onlyInStock: e.target.checked })}
                className="w-4 h-4 rounded text-sky-600 border-slate-300"
              />
              <span>In Stock Only</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.onlyFastDelivery}
                onChange={(e) => onFilterChange({ ...filters, onlyFastDelivery: e.target.checked })}
                className="w-4 h-4 rounded text-sky-600 border-slate-300"
              />
              <span>Fast 24h Express Delivery</span>
            </label>
          </div>
        )}
      </div>

    </div>
  );
};
