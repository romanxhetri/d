import React from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, updateQuantity, removeFromCart, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-black border-l border-white/10 z-[70] flex flex-col"
          >
            <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-vibrant rounded-2xl flex items-center justify-center shadow-lg glow-pink border border-white/20">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tighter text-white">Your Cart</h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} Items Selected
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all hover:rotate-90">
                <X className="w-6 h-6 text-white/40 hover:text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                  <ShoppingCart className="w-24 h-24 mb-6" />
                  <p className="text-2xl font-black tracking-tighter">Your cart is empty</p>
                  <button onClick={onClose} className="mt-6 text-sm font-black uppercase tracking-widest underline hover:text-white">Start Shopping</button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shrink-0 group-hover:border-indigo-500/30 transition-colors">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h4 className="font-bold text-base mb-1 truncate group-hover:text-indigo-300 transition-colors">{item.name}</h4>
                      <p className="text-sm font-black text-vibrant mb-4">${item.price.toFixed(2)}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 bg-white/5 rounded-xl px-3 py-1.5 border border-white/10">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-white/40 hover:text-white transition-colors">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-black w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-white/40 hover:text-white transition-colors">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-white/10 hover:text-red-500 transition-all hover:scale-110">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-8 border-t border-white/10 bg-white/[0.03] space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Subtotal</span>
                <span className="text-4xl font-black tracking-tighter text-white">${total.toFixed(2)}</span>
              </div>
              <button 
                disabled={cart.length === 0}
                onClick={onCheckout}
                className="w-full bg-vibrant text-white py-5 rounded-2xl font-black text-xl hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shadow-2xl glow-pink border border-white/20"
              >
                Checkout Now
              </button>
              <p className="text-[10px] text-center text-white/20 font-black uppercase tracking-[0.2em]">
                Secure encrypted checkout powered by <span className="text-white/40">WCETAS Pay</span>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
