import React from 'react';
import { motion } from 'motion/react';
import { Zap, ArrowRight, Search, Globe2, ShieldCheck, Rocket } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background SVG Patterns */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyber-pink/10 blur-[120px] rounded-full animate-float"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border-white/20 text-[10px] font-black tracking-[0.3em] uppercase mb-12 hover:bg-white/10 transition-all cursor-default glow-cyber border-cyber-blue/30"
        >
          <Zap className="w-4 h-4 text-cyber-blue animate-pulse" />
          <span className="text-cyber-blue">Pioneering the Future of Global Trade</span>
        </motion.div>

        <div className="relative mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.85] mb-4"
          >
            <span className="block bg-gradient-to-r from-white via-cyber-blue to-white bg-clip-text text-transparent animate-gradient-x drop-shadow-[0_0_15px_rgba(0,242,255,0.3)]">WORLD CONNECTION</span>
            <span className="block bg-gradient-to-r from-cyber-blue via-cyber-pink to-cyber-yellow bg-clip-text text-transparent animate-gradient-x drop-shadow-[0_0_20px_rgba(255,0,193,0.4)]">EXPORTS TRADE</span>
            <span className="block bg-gradient-to-r from-white/90 via-cyber-yellow/80 to-white/90 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 tracking-[0.2em] font-black opacity-80 animate-pulse">& SUPPLIERS</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute -top-6 -right-6 hidden lg:flex items-center gap-2 glass px-4 py-2 rounded-2xl border-cyber-pink/30 rotate-12"
          >
            <Rocket className="w-4 h-4 text-cyber-pink" />
            <span className="text-[10px] font-bold text-cyber-pink uppercase tracking-widest">Warp Speed</span>
          </motion.div>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl text-white/50 mb-16 leading-relaxed font-medium"
        >
          WCETAS delivers <span className="text-white">unrivaled supply chain intelligence</span> and 
          <span className="text-cyber-blue"> hyper-fast global logistics</span> for the world's most ambitious enterprises.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button className="w-full sm:w-auto bg-white text-black px-12 py-6 rounded-full font-black text-xl flex items-center justify-center gap-4 hover:scale-105 transition-all group shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Ship Globally
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
          <button className="w-full sm:w-auto glass px-12 py-6 rounded-full font-black text-xl flex items-center justify-center gap-4 hover:bg-white/10 transition-all border-white/20 group">
            Our Solutions
            <Globe2 className="w-6 h-6 group-hover:rotate-12 transition-transform text-cyber-blue" />
          </button>
        </motion.div>

        {/* Tracking Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-32 max-w-4xl mx-auto relative group"
          id="tracking"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-cyber-blue via-cyber-pink to-cyber-yellow rounded-[40px] blur-2xl opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative glass rounded-[32px] p-4 flex flex-col sm:flex-row items-center gap-4 shadow-2xl border-white/5">
            <div className="flex-1 flex items-center gap-6 px-8 w-full">
              <Search className="text-cyber-blue w-7 h-7" />
              <input 
                type="text" 
                placeholder="Enter Tracking ID (e.g., WC-8829-X)" 
                className="bg-transparent border-none outline-none w-full text-white placeholder:text-white/20 py-5 text-xl font-medium"
              />
            </div>
            <button className="w-full sm:w-auto bg-cyber-blue text-black px-12 py-5 rounded-2xl font-black text-xl hover:scale-[1.02] transition-all whitespace-nowrap shadow-lg glow-cyber">
              Track Now
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mt-10">
            {[
              { icon: Globe2, label: 'Global Coverage', color: 'text-cyber-blue' },
              { icon: ShieldCheck, label: 'Secure Transit', color: 'text-cyber-pink' },
              { icon: Zap, label: 'Instant Updates', color: 'text-cyber-yellow' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 group cursor-default">
                <item.icon className={`w-4 h-4 ${item.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] group-hover:text-white/60 transition-colors">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
