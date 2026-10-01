import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SmilingSun, DoodleCloud, DoodleRainbow, DoodleHeart, DoodleStar } from './Doodles';

interface HeroBannerProps {
  onShopNewArrivals: () => void;
  onExploreCategories: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onShopNewArrivals,
  onExploreCategories
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EBF5FE] via-[#EFF6FF] to-[#F8FAFC] py-8 md:py-14 border-b border-sky-100">
      
      {/* Whimsical Doodle Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Smiling Sun top left */}
        <div className="absolute top-4 left-6 sm:left-12 opacity-95">
          <SmilingSun className="w-16 h-16 sm:w-20 sm:h-20 animate-spin-slow" />
        </div>

        {/* Floating clouds */}
        <div className="absolute top-10 left-[26%] hidden md:block">
          <DoodleCloud className="w-16 h-10 opacity-70" stroke="#38BDF8" />
        </div>
        <div className="absolute top-6 right-[38%] hidden lg:block">
          <DoodleCloud className="w-20 h-12 opacity-80" stroke="#818CF8" />
        </div>
        <div className="absolute bottom-6 left-1/3 hidden md:block">
          <DoodleCloud className="w-14 h-8 opacity-60" stroke="#FBBF24" />
        </div>

        {/* Small floating sparkles & hearts */}
        <div className="absolute top-20 left-[18%]">
          <DoodleStar className="w-4 h-4 text-amber-400" />
        </div>
        <div className="absolute bottom-16 left-8">
          <DoodleHeart className="w-5 h-5 text-rose-400 fill-rose-200 opacity-80" />
        </div>
        <div className="absolute top-12 right-12 hidden sm:block">
          <DoodleStar className="w-5 h-5 text-amber-300" />
        </div>
        <div className="absolute bottom-4 right-[25%] hidden sm:block">
          <DoodleStar className="w-4 h-4 text-sky-300" />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Title with Doodle Heart */}
            <div className="relative inline-block">
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl xl:text-6xl text-slate-900 tracking-tight leading-[1.12]">
                Everything Little <br />
                <span className="relative inline-block">
                  Humans Love
                  <span className="absolute -top-3 -right-8 sm:-right-9">
                    <DoodleHeart className="w-6 h-6 sm:w-7 sm:h-7 text-rose-500 fill-rose-500 animate-bounce" />
                  </span>
                </span>
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 font-normal max-w-xl leading-relaxed">
              Discover clothing, toys, books, baby essentials and more — thoughtfully curated for ages 0–16.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShopNewArrivals}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Shop New Arrivals</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCategories}
                className="inline-flex items-center justify-center px-7 py-3.5 bg-white/90 hover:bg-white text-slate-800 font-semibold text-sm sm:text-base rounded-full border border-slate-300 hover:border-slate-400 shadow-xs hover:shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Explore Categories
              </button>
            </div>

          </div>

          {/* Right Visual Image & Playful Quotes */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white/80 bg-amber-50">
                <img
                  src="https://images.unsplash.com/photo-1543332164-6e82f355badc?w=1000&auto=format&fit=crop&q=80"
                  alt="Happy kids laughing and playing with colorful wooden toys"
                  className="w-full h-[280px] sm:h-[360px] lg:h-[400px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Hand-Drawn Badge: "Small Steps ♡ Big Dreams" */}
              <div className="absolute -top-6 -right-2 sm:-right-4 bg-white/95 backdrop-blur-xs px-4 py-2.5 rounded-2xl shadow-lg border border-rose-100 rotate-3 transform z-20 hidden sm:block">
                <p className="font-hand text-slate-800 text-base font-bold text-center leading-tight">
                  Small Steps <span className="text-rose-500 text-lg">♡</span><br />
                  <span className="text-sky-600 text-lg">Big Dreams</span>
                </p>
                <div className="absolute -bottom-2 -left-2">
                  <DoodleStar className="w-4 h-4 text-amber-400" />
                </div>
              </div>

              {/* Bottom Right Pastel Rainbow Decoration */}
              <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 z-20 pointer-events-none">
                <DoodleRainbow className="w-24 h-16 sm:w-32 sm:h-20 drop-shadow-md" />
              </div>

              {/* Soft toy accent floating badge */}
              <div className="absolute -bottom-4 left-6 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full shadow-md border border-slate-100 flex items-center gap-2 z-20">
                <span className="text-lg">🧸</span>
                <span className="text-xs font-bold text-slate-800">100% Non-Toxic &amp; Safe</span>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
