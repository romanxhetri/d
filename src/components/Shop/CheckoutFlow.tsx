import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Wallet, Landmark, Truck, CheckCircle2, ArrowRight, ArrowLeft, X, Zap } from 'lucide-react';
import { CartItem, PaymentMethod, ShippingDetails, Order } from '../../types';

interface CheckoutFlowProps {
  cart: CartItem[];
  total: number;
  onComplete: (order: Order) => void;
  onClose: () => void;
}

export const CheckoutFlow: React.FC<CheckoutFlowProps> = ({ cart, total, onComplete, onClose }) => {
  const [step, setStep] = useState<'payment' | 'shipping' | 'success'>('payment');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    name: '',
    email: '',
    phone: '',
    deliveryLocation: ''
  });

  const handlePaymentSelect = (method: PaymentMethod) => {
    setPaymentMethod(method);
    setStep('shipping');
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      items: cart,
      total,
      paymentMethod: paymentMethod!,
      shippingDetails,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage for demo persistence
    const existingOrders = JSON.parse(localStorage.getItem('wcetas_orders') || '[]');
    localStorage.setItem('wcetas_orders', JSON.stringify([...existingOrders, newOrder]));
    
    onComplete(newOrder);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass w-full max-w-2xl rounded-[32px] sm:rounded-[40px] border-white/10 overflow-hidden relative my-auto"
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-vibrant rounded-xl flex items-center justify-center glow-pink">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tighter">Secure Checkout</h2>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-black">Step {step === 'payment' ? '1' : step === 'shipping' ? '2' : '3'} of 3</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <X className="w-6 h-6 text-white/40" />
          </button>
        </div>

        <div className="p-6 sm:p-10">
          <AnimatePresence mode="wait">
            {step === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 sm:space-y-8"
              >
                <div className="text-center mb-6 sm:mb-10">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Select Payment Method</h3>
                  <p className="text-sm text-white/40">Choose your preferred way to pay securely.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'esewa', name: 'eSewa Wallet', icon: <Wallet className="text-emerald-400" />, desc: 'Instant digital payment' },
                    { id: 'bank', name: 'Bank Transfer', icon: <Landmark className="text-indigo-400" />, desc: 'Direct bank settlement' },
                    { id: 'wallet', name: 'Global Wallet', icon: <CreditCard className="text-pink-400" />, desc: 'WCETAS Pay' },
                    { id: 'cod', name: 'Cash on Delivery', icon: <Truck className="text-orange-400" />, desc: 'Pay when you receive' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => handlePaymentSelect(method.id as PaymentMethod)}
                      className="glass p-4 sm:p-6 rounded-3xl border-white/5 hover:border-vibrant/50 transition-all text-left group hover:scale-[1.02] active:scale-95"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                        {React.cloneElement(method.icon as React.ReactElement, { className: "w-5 h-5 sm:w-6 h-6" })}
                      </div>
                      <h4 className="text-base sm:text-lg font-bold mb-1 group-hover:text-vibrant transition-colors">{method.name}</h4>
                      <p className="text-[10px] sm:text-xs text-white/30">{method.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'shipping' && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-6 sm:mb-10">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Shipping Details</h3>
                  <p className="text-sm text-white/40">Where should we deliver your order?</p>
                </div>

                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="space-y-4 max-h-[40vh] sm:max-h-none overflow-y-auto pr-2 custom-scrollbar">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Full Name</label>
                        <input 
                          required
                          type="text" 
                          placeholder="John Doe"
                          value={shippingDetails.name}
                          onChange={(e) => setShippingDetails({...shippingDetails, name: e.target.value})}
                          className="w-full glass p-4 sm:p-5 rounded-2xl border-white/5 outline-none focus:border-vibrant/50 transition-colors text-sm sm:text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Email Address</label>
                        <input 
                          required
                          type="email" 
                          placeholder="john@example.com"
                          value={shippingDetails.email}
                          onChange={(e) => setShippingDetails({...shippingDetails, email: e.target.value})}
                          className="w-full glass p-4 sm:p-5 rounded-2xl border-white/5 outline-none focus:border-vibrant/50 transition-colors text-sm sm:text-base"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="+977 98XXXXXXXX"
                        value={shippingDetails.phone}
                        onChange={(e) => setShippingDetails({...shippingDetails, phone: e.target.value})}
                        className="w-full glass p-4 sm:p-5 rounded-2xl border-white/5 outline-none focus:border-vibrant/50 transition-colors text-sm sm:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Delivery Location</label>
                      <textarea 
                        required
                        placeholder="Street address, City, Province"
                        value={shippingDetails.deliveryLocation}
                        onChange={(e) => setShippingDetails({...shippingDetails, deliveryLocation: e.target.value})}
                        className="w-full glass p-4 sm:p-5 rounded-2xl border-white/5 outline-none focus:border-vibrant/50 transition-colors min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4 sm:pt-6 border-t border-white/5">
                    <button 
                      type="button"
                      onClick={() => setStep('payment')}
                      className="w-full sm:flex-1 glass py-4 sm:py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-colors text-sm sm:text-base"
                    >
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <button 
                      type="submit"
                      className="w-full sm:flex-[2] bg-vibrant text-white py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all glow-pink"
                    >
                      Complete Order <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 sm:py-10"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 glow-emerald">
                  <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-black tracking-tighter mb-4">Order Confirmed!</h3>
                <p className="text-sm text-white/50 mb-8 sm:mb-10 max-w-sm mx-auto">
                  Your order has been placed successfully. We've sent a confirmation email to {shippingDetails.email}.
                </p>
                <button 
                  onClick={onClose}
                  className="bg-white text-black px-10 py-4 sm:px-12 sm:py-5 rounded-full font-black text-base sm:text-lg hover:scale-105 transition-transform"
                >
                  Continue Shopping
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
