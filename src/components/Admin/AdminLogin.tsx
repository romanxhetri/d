import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Zap, ArrowRight, X } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
  onClose: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-2xl overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass w-full max-w-md rounded-[32px] sm:rounded-[40px] border-white/10 overflow-hidden relative p-8 sm:p-12 my-auto"
      >
        <button onClick={onClose} className="absolute top-6 right-6 sm:top-8 sm:right-8 p-2 hover:bg-white/5 rounded-full transition-colors">
          <X className="w-5 h-5 sm:w-6 h-6 text-white/40" />
        </button>

        <div className="text-center mb-8 sm:mb-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-vibrant rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 glow-pink rotate-12">
            <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-3 sm:mb-4">Admin Access</h2>
          <p className="text-sm sm:text-base text-white/40 font-light px-4">Enter your secure credentials to manage the WCETAS ecosystem.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-white/40 ml-4">Access Password</label>
            <input 
              required
              type="password" 
              placeholder="••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full glass p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-white/10 outline-none focus:border-vibrant/50 transition-all text-center text-2xl sm:text-3xl tracking-[0.5em] ${error ? 'border-red-500/50 animate-shake' : ''}`}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-white text-black py-4 sm:py-6 rounded-2xl sm:rounded-3xl font-black text-lg sm:text-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all active:scale-95 shadow-2xl"
          >
            Authenticate <ArrowRight className="w-5 h-5 sm:w-6 h-6" />
          </button>
        </form>

        <div className="mt-12 flex items-center justify-center gap-3 opacity-20">
          <Zap className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Secure Terminal Alpha v2.4</span>
        </div>
      </motion.div>
    </div>
  );
};
