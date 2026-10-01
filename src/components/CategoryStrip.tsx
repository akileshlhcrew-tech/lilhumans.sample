import React from 'react';
import { CATEGORIES } from '../data/categories';

interface CategoryStripProps {
  selectedCategories: string[];
  onToggleCategory: (categoryName: string) => void;
}

export const CategoryStrip: React.FC<CategoryStripProps> = ({
  selectedCategories,
  onToggleCategory
}) => {
  return (
    <section className="py-6 sm:py-8 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategories.includes(cat.name);
          return (
            <button
              key={cat.id}
              onClick={() => onToggleCategory(cat.name)}
              className={`group flex flex-col items-center p-3 rounded-2xl transition-all duration-200 cursor-pointer text-center relative ${
                cat.bgColor
              } ${
                isSelected
                  ? 'ring-2 ring-sky-500 shadow-md scale-102 bg-white'
                  : 'hover:shadow-md hover:scale-102 border border-slate-100/60'
              }`}
            >
              {/* Product preview image inside circle/rounded container */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex items-center justify-center p-1.5 transition-transform duration-200 group-hover:scale-105">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-lg drop-shadow-xs"
                  loading="lazy"
                />
              </div>

              {/* Title */}
              <span className={`mt-2 text-xs sm:text-sm font-semibold transition-colors ${
                isSelected ? 'text-sky-700 font-bold' : 'text-slate-800 group-hover:text-slate-900'
              }`}>
                {cat.name}
              </span>

              {/* Active selection dot indicator */}
              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};
