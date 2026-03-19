import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { InfoModal } from '../InfoModal';
import { INFO_CONTENT, InfoItem } from '../../constants/infoContent';

export const Footer = () => {
  const [selectedInfo, setSelectedInfo] = useState<InfoItem | null>(null);

  const handleLinkClick = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    if (INFO_CONTENT[key]) {
      setSelectedInfo(INFO_CONTENT[key]);
    }
  };

  return (
    <footer className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
      <InfoModal 
        isOpen={!!selectedInfo} 
        onClose={() => setSelectedInfo(null)} 
        content={selectedInfo} 
      />
      
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyber-blue rounded-xl flex items-center justify-center shadow-lg glow-cyber border border-white/20">
                <Globe className="text-black w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase">WCETAS</span>
            </div>
            <p className="text-base text-white/40 leading-relaxed font-light">
              World Connection Exports Trade and Suppliers. The global standard for modern logistics and trade facilitation.
            </p>
            <div className="flex gap-5">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center hover:bg-cyber-pink hover:border-white/20 hover:scale-110 transition-all duration-500 cursor-pointer group glow-cyber">
                  <div className="w-4 h-4 bg-white/40 group-hover:bg-black rounded-sm transition-colors"></div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black mb-8 uppercase text-[10px] tracking-[0.3em] text-cyber-blue">Solutions</h4>
            <ul className="space-y-5 text-sm font-bold text-white/40">
              {['Express Courier', 'Freight Forwarding', 'Supply Chain Management', 'Customs Brokerage', 'Warehousing & Storage', 'E-commerce Logistics', 'Cold Chain Solutions', 'Project Cargo'].map(item => (
                <li key={item}>
                  <a 
                    href="#" 
                    onClick={(e) => handleLinkClick(e, item)}
                    className="hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-8 uppercase text-[10px] tracking-[0.3em] text-cyber-pink">Company</h4>
            <ul className="space-y-5 text-sm font-bold text-white/40">
              {['About Us', 'Global Network', 'Careers', 'Sustainability', 'Press & Media', 'Investor Relations', 'Our History', 'Global Leadership'].map(item => (
                <li key={item}>
                  <a 
                    href="#" 
                    onClick={(e) => handleLinkClick(e, item)}
                    className="hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-8 uppercase text-[10px] tracking-[0.3em] text-cyber-yellow">Support</h4>
            <ul className="space-y-5 text-sm font-bold text-white/40">
              {['Help Center', 'Tracking Support', 'Contact Sales', 'Legal & Privacy', 'Security Standards', 'FAQs', 'Sitemap'].map(item => (
                <li key={item}>
                  <a 
                    href="#" 
                    onClick={(e) => handleLinkClick(e, item)}
                    className="hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
          <p>© 2026 <span className="text-white/40">WCETAS LOGISTICS GROUP</span>. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
