import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ShoppingBag, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { products } from '../../data/products';
import { ProductCard } from './ProductCard';
import { ProductDetailsModal } from './ProductDetailsModal';
import { Product } from '../../types';

interface ShopViewProps {
  onAddToCart: (product: Product) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({ onAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ['All', 'Electronics', 'Logistics Tools', 'Fashion', 'Home'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-32 pb-20 px-6">
      <ProductDetailsModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={onAddToCart} 
      />
      <div className="max-w-7xl mx-auto">
        {/* Shop Hero */}
        <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden mb-12 sm:mb-16 aspect-[16/10] sm:aspect-[21/9] md:aspect-[3/1] border border-white/10 glow-indigo">
          <img 
            src="https://picsum.photos/seed/shop-hero-tech/1920/600?blur=2" 
            alt="Shop Hero" 
            className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[2000ms]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent flex items-center px-6 sm:px-12 md:px-24">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyber-pink text-black text-[10px] font-black tracking-[0.2em] uppercase mb-6 sm:mb-8 shadow-2xl glow-cyber border border-white/20">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Premium Inventory</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter mb-4 sm:mb-6 leading-[0.85] text-cyber">THE <br />MARKETPLACE.</h1>
              <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 sm:mb-10 leading-relaxed font-medium">Professional-grade equipment and exclusive WCETAS gear for the global trade elite.</p>
              <button className="bg-white text-black px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg flex items-center gap-3 hover:scale-105 transition-all shadow-xl hover:bg-indigo-50 hover:text-indigo-600">
                Shop Flash Sale <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? 'bg-white text-black' 
                    : 'glass text-white/60 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <button className="glass p-2.5 rounded-full hover:bg-white/10 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
                onViewDetails={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center opacity-40">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4" />
            <p className="text-xl font-bold">No products found matching your criteria.</p>
          </div>
        )}

        {/* Daily Deals / Flash Sale Section */}
        <div className="mt-32">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-cyber-yellow rounded-2xl flex items-center justify-center shadow-lg glow-cyber">
                <Zap className="text-black w-7 h-7 fill-current" />
              </div>
              <div>
                <h2 className="text-4xl font-black tracking-tighter uppercase">Flash Deals</h2>
                <p className="text-[10px] font-bold text-cyber-yellow uppercase tracking-widest">Ending in 04:22:15</p>
              </div>
            </div>
            <button className="text-xs font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">View All Deals</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.filter(p => p.isFlashSale).slice(0, 3).map(product => (
              <div 
                key={product.id} 
                onClick={() => setSelectedProduct(product)}
                className="bento-card border-cyber-yellow/20 p-6 flex gap-6 items-center group cursor-pointer"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-white/5">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-lg mb-1 truncate tracking-tight">{product.name}</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black tracking-tighter text-white">${product.price.toFixed(2)}</span>
                    <span className="text-xs text-white/20 line-through font-bold">
                      ${(product.price * 1.2).toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-cyber-yellow w-3/4 shadow-[0_0_10px_rgba(254,254,1,0.5)]"></div>
                  </div>
                  <p className="text-[10px] font-bold text-cyber-yellow/60 mt-2 uppercase tracking-widest">75% Sold Out</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
