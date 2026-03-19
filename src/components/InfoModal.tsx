import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';
import { InfoItem } from '../constants/infoContent';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: InfoItem | null;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, content }) => {
  if (!content) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass w-full max-w-2xl rounded-[32px] sm:rounded-[40px] border-white/10 overflow-hidden relative my-auto shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-vibrant rounded-xl flex items-center justify-center glow-pink">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tighter">{content.title}</h2>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-black">Information Details</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-white/5 rounded-full transition-colors group"
              >
                <X className="w-6 h-6 text-white/40 group-hover:text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-10 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-vibrant mb-3">Overview</h3>
                <p className="text-white/70 leading-relaxed text-base sm:text-lg">
                  {content.description}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-4">Key Features & Benefits</h3>
                <div className="grid grid-cols-1 gap-3">
                  {content.details.map((detail, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-vibrant mt-2 shrink-0 shadow-[0_0_10px_rgba(255,0,255,0.5)]" />
                      <span className="text-sm sm:text-base text-white/60 font-medium">{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <button
                  onClick={onClose}
                  className="w-full bg-vibrant text-white py-4 rounded-2xl font-black text-lg hover:scale-[1.02] transition-all glow-pink"
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
