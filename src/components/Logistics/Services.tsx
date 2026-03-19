import React from 'react';
import { motion } from 'motion/react';
import { Truck, Globe, ShieldCheck, BarChart3, ChevronRight, Zap, Package, MapPin, Rocket } from 'lucide-react';

export const Services = () => {
  return (
    <section id="services" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-cyber-blue"></div>
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-cyber-blue">Core Capabilities</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              ENGINEERED FOR <br />
              <span className="text-cyber">VELOCITY.</span>
            </h2>
            <p className="text-xl text-white/40 leading-relaxed max-w-2xl">
              We've dismantled traditional logistics to build a network that moves at the speed of thought. 
              From micro-electronics to heavy industrial assets.
            </p>
          </div>
          <button className="glass px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all border-white/10 group">
            View All Services
            <ChevronRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[300px]">
          
          {/* Main Card - Large */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-6 lg:col-span-8 row-span-2 bento-card border-cyber-blue/20 group"
          >
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <Globe className="w-96 h-96 -mr-24 -mt-24 text-cyber-blue" />
            </div>
            <div>
              <div className="w-14 h-14 bg-cyber-blue/10 rounded-2xl flex items-center justify-center mb-8 border border-cyber-blue/20">
                <Globe className="w-7 h-7 text-cyber-blue" />
              </div>
              <h3 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">GLOBAL <br />FREIGHT ENGINE</h3>
              <p className="text-lg text-white/40 max-w-md leading-relaxed">
                Our proprietary routing algorithms optimize air, sea, and land transit in real-time, 
                ensuring your assets navigate the globe with zero friction.
              </p>
            </div>
            <div className="flex items-center gap-8 mt-12">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white">220+</span>
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Countries</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white">1.2M</span>
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Daily Shipments</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2 - Vertical */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-6 lg:col-span-4 row-span-2 bento-card border-cyber-pink/20 group"
          >
            <div className="absolute bottom-0 right-0 p-8 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <ShieldCheck className="w-64 h-64 -mr-12 -mb-12 text-cyber-pink" />
            </div>
            <div className="w-14 h-14 bg-cyber-pink/10 rounded-2xl flex items-center justify-center mb-8 border border-cyber-pink/20">
              <ShieldCheck className="w-7 h-7 text-cyber-pink" />
            </div>
            <div>
              <h3 className="text-3xl font-black mb-4 tracking-tighter">SECURE <br />CUSTODY</h3>
              <p className="text-white/40 leading-relaxed">
                Military-grade warehousing with biometric access and AI-driven inventory management. 
                Your value, preserved and protected.
              </p>
            </div>
            <div className="mt-12 space-y-4">
              {['Biometric Security', 'Climate Control', 'Real-time Audit'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-pink"></div>
                  <span className="text-xs font-bold text-white/60 uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 3 - Horizontal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-6 lg:col-span-6 bento-card border-cyber-yellow/20 group"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="w-14 h-14 bg-cyber-yellow/10 rounded-2xl flex items-center justify-center mb-8 border border-cyber-yellow/20">
                  <Zap className="w-7 h-7 text-cyber-yellow" />
                </div>
                <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase">Express Warp</h3>
                <p className="text-white/40 leading-relaxed max-w-sm">
                  Priority handling for mission-critical assets. 24-hour delivery across major global hubs.
                </p>
              </div>
              <div className="hidden sm:block">
                <Rocket className="w-24 h-24 text-cyber-yellow opacity-10 group-hover:opacity-20 transition-opacity" />
              </div>
            </div>
          </motion.div>

          {/* Card 4 - Horizontal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-6 lg:col-span-6 bento-card border-neon/20 group"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="w-14 h-14 bg-neon/10 rounded-2xl flex items-center justify-center mb-8 border border-neon/20">
                  <BarChart3 className="w-7 h-7 text-neon" />
                </div>
                <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase">Trade Intel</h3>
                <p className="text-white/40 leading-relaxed max-w-sm">
                  Advanced customs clearance and trade compliance powered by predictive analytics.
                </p>
              </div>
              <div className="hidden sm:block">
                <BarChart3 className="w-24 h-24 text-neon opacity-10 group-hover:opacity-20 transition-opacity" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
