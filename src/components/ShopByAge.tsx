import React from 'react';
import { ArrowRight } from 'lucide-react';
import { AGE_GROUPS } from '../data/ageGroups';
import { DoodleHeart } from './Doodles';

interface ShopByAgeProps {
  selectedAgeGroups: string[];
  onToggleAge: (ageLabel: string) => void;
  onViewAllStages: () => void;
}

export const ShopByAge: React.FC<ShopByAgeProps> = ({
  selectedAgeGroups,
  onToggleAge,
  onViewAllStages
}) => {
  return (
    <section className="py-8 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Shop by Age
          </h2>
          <div className="flex items-center -space-x-1">
            <DoodleHeart className="w-5 h-5 text-rose-400 fill-rose-300" />
            <DoodleHeart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>

        <button
          onClick={onViewAllStages}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 hover:text-sky-800 hover:underline transition-colors cursor-pointer group"
        >
          <span>Find the perfect picks for every stage</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 5 Age Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {AGE_GROUPS.map((group) => {
          const isSelected = selectedAgeGroups.includes(group.label);
          return (
            <div
              key={group.id}
              onClick={() => onToggleAge(group.label)}
              className={`group flex flex-col items-center p-3 rounded-2xl transition-all duration-200 cursor-pointer ${
                group.bgColor
              } border ${
                isSelected
                  ? 'border-sky-500 ring-2 ring-sky-300 shadow-md scale-102 bg-white'
                  : 'border-slate-100 hover:border-slate-200 hover:shadow-md hover:scale-101'
              }`}
            >
              {/* Photo */}
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-white/60">
                <img
                  src={group.image}
                  alt={group.label}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Age Pill Button Label */}
              <div className={`w-full py-2 px-3 rounded-xl text-center text-xs sm:text-sm font-bold transition-colors ${
                isSelected
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white/90 text-slate-800 group-hover:bg-white shadow-xs'
              }`}>
                {group.label}
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};
