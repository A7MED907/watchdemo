import React, { useState } from 'react';
import { CustomWatchConfig } from '../../types/watch';
import {
  CASE_OPTIONS,
  DIAL_OPTIONS,
  HANDS_OPTIONS,
  STRAP_OPTIONS,
  calculateTotalPrice,
  formatPrice,
} from '../../data/mockWatchData';
import { WatchPreview } from '../watch-renderer/WatchPreview';
import { X, CheckCircle2, Copy, Check, Send, Sparkles } from 'lucide-react';

interface OrderRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CustomWatchConfig;
}

export const OrderRequestModal: React.FC<OrderRequestModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Alexandre Laurent',
    phone: '+20 100 123 4567',
    email: 'client@hora-atelier.com',
    wristSize: '17.5 cm (Standard M)',
    city: 'Cairo (Hand Concierge Delivery)',
    notes: 'Please ensure high-contrast lumed handset. Interested in complementary display box engraving.',
  });

  if (!isOpen) return null;

  const currentCase = CASE_OPTIONS.find((c) => c.id === config.caseId) || CASE_OPTIONS[0];
  const currentDial = DIAL_OPTIONS.find((d) => d.id === config.dialId) || DIAL_OPTIONS[0];
  const currentHands = HANDS_OPTIONS.find((h) => h.id === config.handsId) || HANDS_OPTIONS[0];
  const currentStrap = STRAP_OPTIONS.find((s) => s.id === config.strapId) || STRAP_OPTIONS[0];
  const totalPrice = calculateTotalPrice(config);
  const orderRef = 'HA-BESPOKE-' + Math.floor(100000 + Math.random() * 900000);

  const handleCopySummary = () => {
    const text = `HORA ATELIER - BESPOKE BUILD SHEET
Reference: ${orderRef}
Case: ${currentCase.name} (${currentCase.material})
Dial: ${currentDial.name}
Hands: ${currentHands.name}
Strap: ${currentStrap.name}
Engraving: ${config.customEngraving || 'None'}
Total Price: ${formatPrice(totalPrice)}
Calibre: Automatic Mechanical (28,800 vph)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border border-[#EAEAEA] shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">
                Custom Order Specification
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1A1A] mt-1">
                Request Custom Assembly
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Your tailored specification has been prepared. Fill in your delivery details below.
              </p>
            </div>

            {/* Watch Configuration Summary Card */}
            <div className="p-4 bg-[#F5F5F2] border border-gray-200 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-24 h-24 shrink-0 flex items-center justify-center bg-white border border-gray-200 p-1">
                <WatchPreview config={config} size="sm" showControls={false} />
              </div>

              <div className="flex-1 min-w-0 space-y-1 text-xs">
                <div className="flex justify-between items-center pb-1 border-b border-gray-200">
                  <span className="font-mono text-gray-500 text-[10px]">REFERENCE:</span>
                  <span className="font-mono font-bold text-black">{orderRef}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-gray-700 text-[11px]">
                  <div>
                    <span className="text-gray-400 block text-[9px]">CASE</span>
                    <span className="truncate font-medium block">{currentCase.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[9px]">DIAL</span>
                    <span className="truncate font-medium block">{currentDial.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[9px]">HANDS</span>
                    <span className="truncate font-medium block">{currentHands.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[9px]">STRAP</span>
                    <span className="truncate font-medium block">{currentStrap.name}</span>
                  </div>
                </div>
                <div className="pt-2 flex justify-between items-baseline border-t border-gray-200">
                  <span className="text-gray-500 font-medium text-[10px] uppercase">Estimated Total:</span>
                  <span className="text-sm font-bold font-mono text-black">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* Concierge Client Details Form */}
            <form onSubmit={handleSubmitForm} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-gray-500 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-200 text-[#1A1A1A] focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 font-medium mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-200 text-[#1A1A1A] focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-200 text-[#1A1A1A] focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 font-medium mb-1">Wrist Circumference</label>
                  <input
                    type="text"
                    value={formData.wristSize}
                    onChange={(e) => setFormData({ ...formData, wristSize: e.target.value })}
                    placeholder="e.g. 17.5 cm"
                    className="w-full px-3 py-2 bg-white border border-gray-200 text-[#1A1A1A] focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-500 text-xs font-medium mb-1">
                  Delivery City / Custom Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-200 text-[#1A1A1A] text-xs focus:outline-none focus:border-black"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="flex-1 py-3 px-4 bg-[#F5F5F2] hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center justify-center gap-2 border border-gray-200 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy Build Sheet'}</span>
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3 px-6 bg-black hover:bg-neutral-800 text-white text-[11px] uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Request</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Success State */
          <div className="p-8 text-center space-y-5">
            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[10px] uppercase font-mono text-gray-400 tracking-widest block">
                Reference: {orderRef}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#1A1A1A] mt-1">
                Custom Specification Registered
              </h2>
              <p className="text-xs text-gray-600 max-w-md mx-auto mt-2">
                Thank you, <strong>{formData.name}</strong>. Our horologist will review your bespoke specifications and contact you at <strong>{formData.phone}</strong>.
              </p>
            </div>

            <div className="p-4 bg-[#F5F5F2] border border-gray-200 text-left max-w-md mx-auto text-xs space-y-1.5 text-gray-600">
              <div className="flex items-center space-x-2 text-black font-semibold pb-1 border-b border-gray-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next Artisan Steps:</span>
              </div>
              <p>• Sizing verification within 24 hours</p>
              <p>• Hand-assembly & 5-position regulation: 14–21 business days</p>
              <p>• Includes certified chronometer card and 2-year warranty</p>
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="py-3 px-8 bg-black text-white text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-neutral-800 transition-colors"
              >
                Return to Configurator
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

