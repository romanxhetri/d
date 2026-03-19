/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { Hero } from './components/Logistics/Hero';
import { Services } from './components/Logistics/Services';
import { Showcase } from './components/Logistics/Showcase';
import { ShippingCalculator } from './components/Logistics/ShippingCalculator';
import { TrackingView } from './components/Logistics/TrackingView';
import { ShopView } from './components/Shop/ShopView';
import { CartDrawer } from './components/Shop/CartDrawer';
import { CheckoutFlow } from './components/Shop/CheckoutFlow';
import { AdminLogin } from './components/Admin/AdminLogin';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Product, CartItem, Order } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<'logistics' | 'shop' | 'tracking' | 'admin'>('logistics');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckoutComplete = (order: Order) => {
    setCart([]);
    // Success state handled in CheckoutFlow
  };

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
    setIsAdminLoginOpen(false);
    setCurrentView('admin');
  };

  return (
    <div className="selection:bg-indigo-500/30 min-h-screen bg-[#050505] text-white relative overflow-x-hidden">
      {/* High-Quality Cinematic Background Image */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=3840&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark Overlay for Readability - Adjusted opacity for better image visibility */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Dynamic Gradient Overlays */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/15 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-pink-600/10 blur-[100px] rounded-full animate-float"></div>
      </div>

      <div className="relative z-10">
        <Navbar 
          onToggleShop={() => setCurrentView(currentView === 'shop' ? 'logistics' : 'shop')} 
          onToggleTracking={() => setCurrentView(currentView === 'tracking' ? 'logistics' : 'tracking')}
          onToggleAdmin={() => {
            if (isAdminAuthenticated) {
              setCurrentView(currentView === 'admin' ? 'logistics' : 'admin');
            } else {
              setIsAdminLoginOpen(true);
            }
          }}
          currentView={currentView}
          cartCount={cartCount}
          onOpenCart={() => setIsCartOpen(true)}
        />
        
        <AnimatePresence mode="wait">
        {currentView === 'shop' ? (
          <motion.div
            key="shop"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ShopView onAddToCart={addToCart} />
          </motion.div>
        ) : currentView === 'tracking' ? (
          <motion.div
            key="tracking"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <TrackingView />
          </motion.div>
        ) : currentView === 'admin' ? (
          <motion.div
            key="admin"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <AdminDashboard />
          </motion.div>
        ) : (
          <motion.div
            key="logistics"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
            
            {/* Trust Bar */}
            <div className="py-12 border-y border-white/5 bg-white/[0.02]">
              <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-30 grayscale">
                {['AMAZON', 'DARAZ', 'FEDEX', 'DHL', 'UPS', 'MAERSK'].map(brand => (
                  <span key={brand} className="text-xl font-black tracking-tighter italic">{brand}</span>
                ))}
              </div>
            </div>

            <Services />
            <Showcase />
            <ShippingCalculator />

            {/* CTA Section */}
            <section className="py-32 px-6">
              <div className="max-w-5xl mx-auto glass rounded-[40px] p-12 md:p-24 text-center relative overflow-hidden border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 relative z-10 leading-none">Ready to move the world?</h2>
                <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto relative z-10">
                  Join thousands of global enterprises that trust WCETAS for their mission-critical logistics and supply chain operations.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                  <button className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                    Open Business Account
                  </button>
                  <button className="w-full sm:w-auto glass px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                    Contact Global Sales
                  </button>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <AnimatePresence>
        {isCheckoutOpen && (
          <CheckoutFlow 
            cart={cart}
            total={cartTotal}
            onComplete={handleCheckoutComplete}
            onClose={() => setIsCheckoutOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAdminLoginOpen && (
          <AdminLogin 
            onLogin={handleAdminLogin}
            onClose={() => setIsAdminLoginOpen(false)}
          />
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
