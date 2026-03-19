import React from 'react';
import { Calculator, ShieldCheck, Clock, MapPin } from 'lucide-react';

export const ShippingCalculator = () => {
  return (
    <section id="calculator" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="glass rounded-[32px] sm:rounded-[48px] p-6 sm:p-10 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center border-white/10 glow-indigo">
          <div>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-cyber-blue text-black text-[10px] font-black tracking-[0.2em] uppercase mb-8 sm:mb-10 shadow-lg glow-cyber border border-white/20">
              <Calculator className="w-3.5 h-3.5" />
              <span>Instant Estimation</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter mb-6 sm:mb-10 leading-[0.9]">
              CALCULATE <br />
              <span className="text-cyber">VELOCITY.</span>
            </h2>
            <p className="text-lg sm:text-xl text-white/40 mb-8 sm:mb-12 leading-relaxed font-medium max-w-lg">
              Precision pricing for the global trade elite. Get a definitive quote based on weight, dimensions, and destination in milliseconds.
            </p>
            
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-start gap-4 sm:gap-6 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
                  <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 group-hover:text-emerald-300 transition-colors">Guaranteed Pricing</h4>
                  <p className="text-sm sm:text-base text-white/40 leading-relaxed">The price you see is the price you pay, guaranteed for 48 hours.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 sm:gap-6 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-500">
                  <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 group-hover:text-indigo-300 transition-colors">Estimated Delivery</h4>
                  <p className="text-sm sm:text-base text-white/40 leading-relaxed">Get real-time delivery windows based on current network traffic.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass bg-white/[0.02] border-white/10 rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="relative z-10 space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Origin</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400/60" />
                    <input type="text" placeholder="City, Country" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm sm:text-base outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-pink-400 uppercase tracking-[0.2em]">Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400/60" />
                    <input type="text" placeholder="City, Country" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm sm:text-base outline-none focus:border-pink-500/50 focus:bg-white/[0.08] transition-all" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Package Weight (kg)</label>
                  <span className="text-sm font-black text-cyber-yellow">25 KG</span>
                </div>
                <input type="range" min="0" max="100" className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-cyber-blue" />
                <div className="flex justify-between text-[8px] sm:text-[10px] font-black text-white/20 uppercase tracking-widest">
                  <span>0 KG</span>
                  <span>50 KG</span>
                  <span>100+ KG</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Length</label>
                  <input type="text" placeholder="cm" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm sm:text-base outline-none focus:border-white/30 transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Width</label>
                  <input type="text" placeholder="cm" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm sm:text-base outline-none focus:border-white/30 transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Height</label>
                  <input type="text" placeholder="cm" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm sm:text-base outline-none focus:border-white/30 transition-all" />
                </div>
              </div>

              <button className="w-full bg-cyber-pink text-black py-4 sm:py-5 rounded-2xl font-black text-lg sm:text-xl hover:scale-[1.02] transition-all active:scale-95 shadow-2xl glow-cyber border border-white/20 mt-4 uppercase tracking-widest">
                Generate Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
