import React from 'react';
import { X, ShoppingBag, Star, Zap, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../../types';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl bg-[#0a0a0a] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto no-scrollbar"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-3 bg-black/50 hover:bg-black/80 rounded-full border border-white/10 text-white transition-all hover:rotate-90"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Section */}
          <div className="md:w-1/2 relative aspect-square md:aspect-auto bg-white/[0.02]">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.isFlashSale && (
              <div className="absolute top-8 left-8 bg-cyber-pink text-black text-xs font-black px-6 py-2 rounded-full flex items-center gap-2 shadow-2xl glow-cyber border border-white/20">
                <Zap className="w-4 h-4 fill-current animate-pulse" />
                FLASH SALE ACTIVE
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-black text-cyber-blue uppercase tracking-[0.4em]">{product.category}</span>
                <div className="flex items-center gap-1.5 text-xs font-black bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 text-white/60">
                  <Star className="w-4 h-4 text-cyber-yellow fill-current" />
                  <span>{product.rating} ({product.reviews} Reviews)</span>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 uppercase leading-tight">{product.name}</h2>
              <p className="text-lg text-white/40 leading-relaxed font-medium">{product.description}</p>
            </div>

            <div className="space-y-6 mb-10">
              <div className="flex items-end gap-4">
                <span className="text-5xl font-black tracking-tighter text-white">${product.price.toFixed(2)}</span>
                {product.discount && (
                  <span className="text-xl text-white/20 line-through font-bold mb-1.5">
                    ${(product.price * (1 + product.discount / 100)).toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass p-4 rounded-2xl border-white/5 flex flex-col items-center text-center">
                  <Truck className="w-6 h-6 text-cyber-blue mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Fast Delivery</span>
                </div>
                <div className="glass p-4 rounded-2xl border-white/5 flex flex-col items-center text-center">
                  <ShieldCheck className="w-6 h-6 text-cyber-pink mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Secure Trade</span>
                </div>
                <div className="glass p-4 rounded-2xl border-white/5 flex flex-col items-center text-center">
                  <RotateCcw className="w-6 h-6 text-cyber-yellow mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">30-Day Return</span>
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => { onAddToCart(product); onClose(); }}
                className="flex-1 bg-cyber-blue text-black py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-all active:scale-95 shadow-2xl glow-cyber border border-white/20 uppercase tracking-widest"
              >
                Add to Cart <ShoppingBag className="w-6 h-6" />
              </button>
              <button className="flex-1 glass text-white py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all border-white/10 uppercase tracking-widest">
                Buy Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
