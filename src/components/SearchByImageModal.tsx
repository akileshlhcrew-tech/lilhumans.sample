import React, { useState } from 'react';
import { X, UploadCloud, Camera, Sparkles, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

interface SearchByImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProductMatch: (category: string, titleKeyword: string) => void;
  products: Product[];
}

export const SearchByImageModal: React.FC<SearchByImageModalProps> = ({
  isOpen,
  onClose,
  onSelectProductMatch,
}) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const sampleImages = [
    {
      label: 'Striped Pants',
      category: 'Clothing',
      keyword: 'Stripe',
      url: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=200&auto=format&fit=crop&q=80'
    },
    {
      label: 'Baby Romper',
      category: 'Clothing',
      keyword: 'Romper',
      url: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=200&auto=format&fit=crop&q=80'
    },
    {
      label: 'Kids Book',
      category: 'Books',
      keyword: 'Book',
      url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&auto=format&fit=crop&q=80'
    },
    {
      label: 'Wooden Toy',
      category: 'Toys',
      keyword: 'Rainbow',
      url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=200&auto=format&fit=crop&q=80'
    },
    {
      label: 'Sneakers',
      category: 'Footwear',
      keyword: 'Sneakers',
      url: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=200&auto=format&fit=crop&q=80'
    }
  ];

  const handleSimulateAnalysis = (category: string, keyword: string, imgUrl: string) => {
    setPreviewUrl(imgUrl);
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      onSelectProductMatch(category, keyword);
      onClose();
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setAnalyzing(true);
      setTimeout(() => {
        setAnalyzing(false);
        // Match a cute product
        onSelectProductMatch('Clothing', 'Romper');
        onClose();
      }, 1400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-100 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl">
              Search by Image
            </h3>
            <p className="text-xs text-slate-500">
              Find exact or similar kids clothing, toys, and nursery items by photo
            </p>
          </div>
        </div>

        {/* Upload Zone */}
        <div className="mt-4 border-2 border-dashed border-sky-200 hover:border-sky-400 bg-sky-50/50 rounded-2xl p-6 text-center transition-colors relative cursor-pointer group">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
          />
          <div className="flex flex-col items-center">
            <UploadCloud className="w-10 h-10 text-sky-500 mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-semibold text-slate-800">
              Drop an image here or <span className="text-sky-600 underline">browse photo</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Supports JPG, PNG, WEBP (up to 10MB)
            </p>
          </div>
        </div>

        {/* Loading overlay if analyzing */}
        {analyzing && (
          <div className="mt-4 p-4 rounded-2xl bg-sky-50 border border-sky-100 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-sky-600 animate-spin" />
            <div className="text-xs">
              <p className="font-bold text-slate-800">Scanning image features...</p>
              <p className="text-slate-500">Matching patterns, colors &amp; product catalog</p>
            </div>
          </div>
        )}

        {/* Sample Images to Try */}
        <div className="mt-6">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
            Or try these sample items:
          </p>
          <div className="grid grid-cols-5 gap-2">
            {sampleImages.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSimulateAnalysis(sample.category, sample.keyword, sample.url)}
                className="group flex flex-col items-center gap-1.5 p-1.5 rounded-xl border border-slate-200 hover:border-sky-400 bg-slate-50 hover:bg-white transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-white">
                  <img
                    src={sample.url}
                    alt={sample.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <span className="text-[10px] font-semibold text-slate-700 truncate w-full text-center">
                  {sample.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Guarantee Info */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Instant visual product matching
          </span>
          <span>lil’ HUMANS Visual AI</span>
        </div>

      </div>
    </div>
  );
};
