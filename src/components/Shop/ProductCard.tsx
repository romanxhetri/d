import React from 'react';
import { Star, ShoppingBag, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => onViewDetails(product)}
      className="glass glass-hover rounded-[32px] overflow-hidden group flex flex-col h-full border-white/5 hover:border-indigo-500/30 transition-all duration-500 cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden bg-white/[0.02]">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {product.isFlashSale && (
          <div className="absolute top-4 left-4 bg-cyber-pink text-black text-[10px] font-black px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-2xl glow-cyber border border-white/20">
            <Zap className="w-3.5 h-3.5 fill-current animate-pulse" />
            FLASH SALE
          </div>
        )}
        {product.discount && (
          <div className="absolute top-4 right-4 bg-white text-black text-[10px] font-black px-4 py-1.5 rounded-full shadow-2xl border border-white/20">
            -{product.discount}%
          </div>
        )}
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="bg-white text-black p-5 rounded-full hover:scale-110 transition-all shadow-2xl glow-indigo group/btn"
          >
            <ShoppingBag className="w-7 h-7 group-hover/btn:rotate-12 transition-transform" />
          </button>
        </div>
      </div>

      <div className="p-7 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <span className="text-[10px] font-black text-cyber-blue uppercase tracking-[0.3em]">{product.category}</span>
          <div className="flex items-center gap-1.5 text-[10px] font-black bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 text-white/60">
            <Star className="w-3 h-3 text-cyber-yellow fill-current" />
            <span>{product.rating}</span>
          </div>
        </div>
        <h3 className="text-2xl font-black mb-3 tracking-tighter group-hover:text-cyber-blue transition-colors line-clamp-1 uppercase">{product.name}</h3>
        <p className="text-sm text-white/40 mb-6 line-clamp-2 flex-1 leading-relaxed font-medium">{product.description}</p>
        
        <div className="flex items-end justify-between mt-auto pt-6 border-t border-white/5">
          <div className="flex flex-col">
            {product.discount && (
              <span className="text-xs text-white/20 line-through font-bold mb-0.5">
                ${(product.price * (1 + product.discount / 100)).toFixed(2)}
              </span>
            )}
            <span className="text-3xl font-black tracking-tighter text-white">${product.price.toFixed(2)}</span>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-cyber-blue hover:text-white transition-all hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};
