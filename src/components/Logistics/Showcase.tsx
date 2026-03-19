import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, BarChart3, ChevronRight } from 'lucide-react';

export const Showcase = () => {
  return (
    <section id="supply-chain" className="py-32 px-6 bg-white/[0.02] border-y border-white/5 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <motion.div 
              initial={{ rotateY: 20, rotateX: 10, opacity: 0 }}
              whileInView={{ rotateY: 0, rotateX: 0, opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="relative z-10 glass rounded-[40px] p-6 shadow-[0_50px_100px_rgba(0,0,0,0.8)] border-white/20 glow-indigo"
            >
              <div className="bg-black rounded-[32px] overflow-hidden aspect-video relative group border border-white/10">
                <img 
                  src="https://picsum.photos/seed/logistics-tech/1200/800" 
                  alt="Logistics Dashboard" 
                  className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[2000ms]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-vibrant rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-all duration-500 group/play glow-pink">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1 group-hover/play:scale-110 transition-transform"></div>
                  </div>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${30 + Math.random() * 60}%` }}
                      transition={{ duration: 2, delay: i * 0.3 }}
                      className={`h-full ${i === 1 ? 'bg-indigo-500' : i === 2 ? 'bg-pink-500' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`}
                    ></motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [0, -25, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-16 -right-16 glass p-8 rounded-3xl z-20 hidden md:block border-white/20 glow-indigo"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-sm font-bold text-emerald-100">Verified Shipment</span>
              </div>
              <div className="text-3xl font-bold tracking-tighter text-white">#WC-9921-A</div>
              <div className="mt-3 text-[10px] font-black uppercase tracking-widest text-emerald-500/60">Status: In Transit</div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 25, 0], rotate: [0, -2, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-16 -left-16 glass p-8 rounded-3xl z-20 hidden md:block border-white/20 glow-pink"
            >
              <div className="flex items-center gap-4 mb-3">
                <BarChart3 className="w-5 h-5 text-indigo-400" />
                <span className="text-sm font-bold text-white/40">Efficiency</span>
              </div>
              <div className="text-4xl font-bold text-vibrant">+42.8%</div>
              <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-indigo-500"></div>
              </div>
            </motion.div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-cyber-pink"></div>
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-cyber-pink">Operational Intelligence</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.9]">
              PRECISION <br />
              <span className="text-cyber">COMMAND.</span>
            </h2>
            <p className="text-xl text-white/40 mb-12 leading-relaxed max-w-xl">
              Our proprietary command center provides absolute visibility over every asset, every route, and every milestone. 
              Predictive AI anticipates disruption before it impacts your bottom line.
            </p>
            <ul className="space-y-8">
              {[
                { text: "Real-time GPS telemetry for every asset", color: "text-cyber-blue" },
                { text: "Automated customs documentation engine", color: "text-cyber-pink" },
                { text: "AI-driven route optimization", color: "text-cyber-yellow" },
                { text: "Multi-carrier management interface", color: "text-neon" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-6 group">
                  <div className={`w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500 group-hover:scale-110 shadow-lg`}>
                    <ChevronRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                  </div>
                  <span className="text-lg font-bold text-white/60 group-hover:text-white transition-colors">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
