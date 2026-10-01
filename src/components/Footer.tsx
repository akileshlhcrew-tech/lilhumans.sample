import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { DoodleHeart } from './Doodles';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-2xl text-white tracking-tight">
                lil’ <span className="uppercase text-xl text-sky-400">HUMANS</span>
              </span>
              <DoodleHeart className="w-4 h-4 text-rose-400 fill-rose-400" />
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Curating joy, wonder, and gentle essentials for babies, kids, and growing teens from ages 0 to 16. Loved by over 100,000+ conscious parents.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
                Join Lil' Humans Club (15% Off First Order)
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 p-3 bg-emerald-950/60 border border-emerald-700/50 rounded-xl text-emerald-300 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Welcome to the family! Check your inbox for code <strong>LILHUMANS15</strong>.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter parent's email..."
                    className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Join</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#clothing" className="hover:text-white transition-colors">Kids Clothing &amp; Frocks</a></li>
              <li><a href="#toys" className="hover:text-white transition-colors">Montessori &amp; STEM Toys</a></li>
              <li><a href="#books" className="hover:text-white transition-colors">Early Learning &amp; Picture Books</a></li>
              <li><a href="#baby" className="hover:text-white transition-colors">Baby Essentials &amp; Nursing</a></li>
              <li><a href="#footwear" className="hover:text-white transition-colors">First Steps &amp; Sport Shoes</a></li>
              <li><a href="#nursery" className="hover:text-white transition-colors">Nursery Cribs &amp; Decor</a></li>
            </ul>
          </div>

          {/* Ages */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              Shop By Age
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#age-0-2" className="hover:text-white transition-colors">0 - 2 Years (Infants &amp; Toddlers)</a></li>
              <li><a href="#age-3-5" className="hover:text-white transition-colors">3 - 5 Years (Preschool Explorers)</a></li>
              <li><a href="#age-6-8" className="hover:text-white transition-colors">6 - 8 Years (Early Elementary)</a></li>
              <li><a href="#age-9-12" className="hover:text-white transition-colors">9 - 12 Years (Pre-Teens)</a></li>
              <li><a href="#age-13-16" className="hover:text-white transition-colors">13 - 16 Years (Teens)</a></li>
              <li><a href="#size-guide" className="hover:text-white transition-colors">Kids Size Calculator Guide</a></li>
            </ul>
          </div>

          {/* Parent Care */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              Parent Care
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#orders" className="hover:text-white transition-colors">Track Your Order</a></li>
              <li><a href="#returns" className="hover:text-white transition-colors">Hassle-Free 15-Day Returns</a></li>
              <li><a href="#shipping" className="hover:text-white transition-colors">Shipping &amp; Delivery Info</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Safety Certifications &amp; FAQ</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">WhatsApp Support: +91 98765 43210</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} lil’ HUMANS Retail India Pvt Ltd. Crafted with care for little steps.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Standards</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
