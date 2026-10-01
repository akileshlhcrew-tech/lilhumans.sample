import React from 'react';
import { Heart, ShieldCheck, Truck, Headphones } from 'lucide-react';
import { DoodleRainbow, DoodlePaperPlane, DoodleHeart, DoodleStar } from './Doodles';

export const WhyShopStrip: React.FC = () => {
  const pillars = [
    {
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      title: 'Curated for Little Humans',
      desc: '0–16 Years with safety first standards'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-sky-600" />,
      title: 'Trusted Brands',
      desc: '100% genuine & non-toxic certified'
    },
    {
      icon: <Truck className="w-5 h-5 text-emerald-600" />,
      title: 'Easy Shopping',
      desc: 'Hassle-free returns & swift delivery'
    },
    {
      icon: <Headphones className="w-5 h-5 text-indigo-600" />,
      title: 'Parent-Friendly Support',
      desc: 'Friendly mom & dad assistance 7 days/wk'
    }
  ];

  return (
    <section className="py-12 bg-white relative overflow-hidden border-t border-slate-100">
      
      {/* Background Subtle Doodles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute bottom-2 left-6 opacity-70 hidden sm:block">
          <DoodleRainbow className="w-20 h-12" />
        </div>
        <div className="absolute top-4 right-10 opacity-70 hidden md:block">
          <DoodlePaperPlane className="w-8 h-8 text-sky-400" />
        </div>
        <div className="absolute top-8 left-12 opacity-60">
          <DoodleHeart className="w-4 h-4 text-rose-300" />
        </div>
        <div className="absolute bottom-6 right-20 opacity-60">
          <DoodleStar className="w-4 h-4 text-amber-300" />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 tracking-tight mb-8">
          Why Shop Lil Humans?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="flex items-center sm:flex-col sm:text-center gap-3.5 p-4 rounded-2xl bg-slate-50/60 hover:bg-slate-50 transition-colors border border-slate-100"
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-100 flex items-center justify-center shrink-0">
                {pillar.icon}
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm">
                  {pillar.title}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
