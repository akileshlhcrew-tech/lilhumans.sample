import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PromoBannersProps {
  onSelectPromo: (filterType: string) => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({ onSelectPromo }) => {
  const promos = [
    {
      id: 'new-arrivals',
      title: 'New Arrivals',
      subtitle: 'Fresh picks for little smiles',
      buttonText: 'Shop Now →',
      buttonBg: 'bg-[#8B5CF6] hover:bg-[#7C3AED]',
      cardBg: 'bg-[#F5F3FF]',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&auto=format&fit=crop&q=80',
      action: 'new'
    },
    {
      id: 'best-sellers',
      title: 'Best Sellers',
      subtitle: 'Loved by Thousands',
      buttonText: 'Shop Now →',
      buttonBg: 'bg-[#D97706] hover:bg-[#B45309]',
      cardBg: 'bg-[#FFFBEB]',
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&auto=format&fit=crop&q=80',
      action: 'bestseller'
    },
    {
      id: 'under-999',
      title: 'Under ₹999',
      subtitle: 'Great Quality, Happy Budgets.',
      buttonText: 'Shop Now →',
      buttonBg: 'bg-[#E11D48] hover:bg-[#BE123C]',
      cardBg: 'bg-[#FFF1F2]',
      image: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=400&auto=format&fit=crop&q=80',
      action: 'under999'
    },
    {
      id: 'gifting',
      title: 'Perfect for Gifting',
      subtitle: 'Thoughtful gifts for every occasion',
      buttonText: 'Shop Now →',
      buttonBg: 'bg-[#059669] hover:bg-[#047857]',
      cardBg: 'bg-[#ECFDF5]',
      image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&auto=format&fit=crop&q=80',
      action: 'gifting'
    }
  ];

  return (
    <section className="py-8 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {promos.map((promo) => (
          <div
            key={promo.id}
            onClick={() => onSelectPromo(promo.action)}
            className={`group rounded-2xl p-4 flex items-center justify-between gap-3 ${promo.cardBg} border border-slate-100/80 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden relative`}
          >
            {/* Left Content */}
            <div className="space-y-2 flex-1 z-10">
              <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl leading-tight">
                {promo.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-1">
                {promo.subtitle}
              </p>
              <div>
                <button
                  type="button"
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-white text-xs font-semibold shadow-xs ${promo.buttonBg} transition-colors`}
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Photo Thumbnail */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-white/70 shadow-xs">
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
