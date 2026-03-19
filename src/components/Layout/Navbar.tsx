import React, { useState, useEffect } from 'react';
import { Globe, User, Menu, X, ShoppingCart, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InfoModal } from '../InfoModal';
import { INFO_CONTENT, InfoItem } from '../../constants/infoContent';

interface NavbarProps {
  onToggleShop: () => void;
  onToggleTracking: () => void;
  onToggleAdmin: () => void;
  currentView: 'logistics' | 'shop' | 'tracking' | 'admin';
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleShop, onToggleTracking, onToggleAdmin, currentView, cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<InfoItem | null>(null);

  const isShopView = currentView === 'shop';
  const isTrackingView = currentView === 'tracking';
  const isAdminView = currentView === 'admin';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    if (INFO_CONTENT[key]) {
      setSelectedInfo(INFO_CONTENT[key]);
    }
  };

  const navLinks = [
    { name: 'Services', href: '#services', hideInShop: true },
    { name: 'Tracking', onClick: onToggleTracking, active: isTrackingView },
    { name: 'Calculator', href: '#calculator', hideInShop: true },
    { name: 'Admin', onClick: onToggleAdmin, active: isAdminView },
    { name: 'Pricing', href: '#pricing', hideInShop: true }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,padding,border-color] duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <InfoModal 
          isOpen={!!selectedInfo} 
          onClose={() => setSelectedInfo(null)} 
          content={selectedInfo} 
        />
        
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => { if(currentView !== 'logistics') onToggleShop(); }}>
            <div className="w-11 h-11 bg-cyber-blue rounded-xl flex items-center justify-center group-hover:rotate-12 transition-all duration-500 shadow-lg glow-cyber border border-white/20">
              <Globe className="text-black w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white group-hover:text-cyber-blue transition-colors uppercase">WCETAS</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {!isShopView && navLinks.map((link) => (
              link.onClick ? (
                <button 
                  key={link.name} 
                  onClick={link.onClick}
                  className={`text-sm font-black uppercase tracking-widest transition-all hover:scale-105 ${link.active ? 'text-cyber-blue' : 'text-white/40 hover:text-cyber-blue'}`}
                >
                  {link.name}
                </button>
              ) : (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-sm font-bold uppercase tracking-widest text-white/50 hover:text-indigo-400 transition-all hover:scale-105"
                >
                  {link.name}
                </a>
              )
            ))}
            {isShopView && (
              <span className="text-xs font-black uppercase tracking-[0.3em] text-vibrant animate-pulse">Marketplace</span>
            )}
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={onToggleShop}
              className={`hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-8 py-2.5 rounded-full transition-all border ${
                isShopView ? 'bg-white/5 text-white border-white/10 hover:bg-white/10' : 'bg-cyber-pink text-black border-white/20 hover:scale-105 glow-cyber'
              }`}
            >
              {isShopView ? 'Logistics Command' : 'Shop Marketplace'}
            </button>
            
            <button 
              onClick={onOpenCart}
              className="relative p-2.5 hover:bg-white/10 rounded-xl transition-all hover:scale-110 group"
            >
              <ShoppingCart className="w-6 h-6 text-white group-hover:text-indigo-400 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyber-pink text-black text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-black glow-cyber">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="hidden md:flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white transition-all hover:scale-105">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <User className="w-4 h-4" />
              </div>
              Sign In
            </button>
            
            <button 
              className="md:hidden text-white p-2 hover:bg-white/5 rounded-xl transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            {/* Side Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-[85%] sm:w-[50%] bg-[#080808] border-l border-white/10 shadow-2xl flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-white/5 bg-black/50 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyber-blue rounded-lg flex items-center justify-center">
                    <Globe className="text-black w-5 h-5" />
                  </div>
                  <span className="text-xl font-black tracking-tighter text-white uppercase">WCETAS</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar bg-transparent">
                <div className="space-y-4">
                  <button 
                    onClick={() => { onToggleShop(); setIsMobileMenuOpen(false); }}
                    className={`w-full text-base font-black uppercase tracking-widest text-left p-4 rounded-2xl border ${
                      isShopView ? 'bg-white/5 text-white border-white/10' : 'bg-vibrant text-white border-white/20 glow-pink'
                    }`}
                  >
                    {isShopView ? 'Back to Logistics' : 'Shop Marketplace'}
                  </button>
                  
                  <div className="flex flex-col gap-2">
                    {!isShopView && navLinks.map((link) => (
                      link.onClick ? (
                        <button 
                          key={link.name} 
                          onClick={() => { link.onClick(); setIsMobileMenuOpen(false); }}
                          className={`text-base font-bold uppercase tracking-[0.2em] text-left py-3 px-4 rounded-xl transition-colors ${link.active ? 'bg-white/5 text-vibrant' : 'text-white/50 hover:text-indigo-400 hover:bg-white/5'}`}
                        >
                          {link.name}
                        </button>
                      ) : (
                        <a 
                          key={link.name} 
                          href={link.href} 
                          className="text-base font-bold uppercase tracking-[0.2em] text-white/50 hover:text-indigo-400 hover:bg-white/5 py-3 px-4 rounded-xl transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.name}
                        </a>
                      )
                    ))}
                  </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-white/5">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-4 px-4">Solutions</h4>
                    <div className="flex flex-col gap-3">
                      {['Express Courier', 'Freight Forwarding', 'Supply Chain Management', 'Customs Brokerage', 'Warehousing & Storage', 'E-commerce Logistics', 'Cold Chain Solutions', 'Project Cargo'].map(item => (
                        <a 
                          key={item} 
                          href="#" 
                          onClick={(e) => handleLinkClick(e, item)}
                          className="text-sm font-medium text-white/40 hover:text-white px-4 transition-colors"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-400 mb-4 px-4">Company</h4>
                    <div className="flex flex-col gap-3">
                      {['About Us', 'Global Network', 'Careers', 'Sustainability', 'Press & Media', 'Investor Relations', 'Our History', 'Global Leadership'].map(item => (
                        <a 
                          key={item} 
                          href="#" 
                          onClick={(e) => handleLinkClick(e, item)}
                          className="text-sm font-medium text-white/40 hover:text-white px-4 transition-colors"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-4 px-4">Support</h4>
                    <div className="flex flex-col gap-3">
                      {['Help Center', 'Tracking Support', 'Contact Sales', 'Legal & Privacy', 'Security Standards', 'FAQs', 'Sitemap'].map(item => (
                        <a 
                          key={item} 
                          href="#" 
                          onClick={(e) => handleLinkClick(e, item)}
                          className="text-sm font-medium text-white/40 hover:text-white px-4 transition-colors"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <button className="w-full flex items-center gap-3 text-base font-bold uppercase tracking-widest text-white/50 p-4 rounded-2xl hover:bg-white/5 hover:text-white transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <User className="w-5 h-5" />
                    </div>
                    Sign In
                  </button>
                </div>
              </div>

              <div className="p-6 border-t border-white/5 text-[8px] font-black uppercase tracking-widest text-white/20 text-center">
                © 2026 WCETAS LOGISTICS GROUP
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
