'use client';

import React, { useState } from 'react';
import { X, Ruler, Sparkles, Check } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  gender: 'women' | 'men' | 'unisex';
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, gender }) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  const womenMeasurementsInches = [
    { size: 'XS', bust: '32', waist: '26', hip: '36', shoulder: '14' },
    { size: 'S', bust: '34', waist: '28', hip: '38', shoulder: '14.5' },
    { size: 'M', bust: '36', waist: '30', hip: '40', shoulder: '15' },
    { size: 'L', bust: '38', waist: '32', hip: '42', shoulder: '15.5' },
    { size: 'XL', bust: '40', waist: '34', hip: '44', shoulder: '16' },
    { size: 'Custom Bespoke', bust: 'Custom', waist: 'Custom', hip: 'Custom', shoulder: 'Custom' },
  ];

  const womenMeasurementsCm = [
    { size: 'XS', bust: '81', waist: '66', hip: '91', shoulder: '35.5' },
    { size: 'S', bust: '86', waist: '71', hip: '96', shoulder: '37' },
    { size: 'M', bust: '91', waist: '76', hip: '101', shoulder: '38' },
    { size: 'L', bust: '96', waist: '81', hip: '106', shoulder: '39.5' },
    { size: 'XL', bust: '101', waist: '86', hip: '111', shoulder: '40.5' },
    { size: 'Custom Bespoke', bust: 'Custom', waist: 'Custom', hip: 'Custom', shoulder: 'Custom' },
  ];

  const menMeasurementsInches = [
    { size: '38 (S)', chest: '38', waist: '32', hip: '39', shoulder: '17.5', length: '44' },
    { size: '40 (M)', chest: '40', waist: '34', hip: '41', shoulder: '18', length: '44.5' },
    { size: '42 (L)', chest: '42', waist: '36', hip: '43', shoulder: '18.5', length: '45' },
    { size: '44 (XL)', chest: '44', waist: '38', hip: '45', shoulder: '19', length: '45.5' },
    { size: '46 (XXL)', chest: '46', waist: '40', hip: '47', shoulder: '19.5', length: '46' },
    { size: 'Custom Bespoke', chest: 'Custom', waist: 'Custom', hip: 'Custom', shoulder: 'Custom', length: 'Custom' },
  ];

  const menMeasurementsCm = [
    { size: '38 (S)', chest: '96.5', waist: '81', hip: '99', shoulder: '44.5', length: '111.8' },
    { size: '40 (M)', chest: '101.6', waist: '86.4', hip: '104', shoulder: '45.7', length: '113' },
    { size: '42 (L)', chest: '106.7', waist: '91.4', hip: '109', shoulder: '47', length: '114.3' },
    { size: '44 (XL)', chest: '111.8', waist: '96.5', hip: '114.3', shoulder: '48.3', length: '115.5' },
    { size: '46 (XXL)', chest: '116.8', waist: '101.6', hip: '119.4', shoulder: '49.5', length: '116.8' },
    { size: 'Custom Bespoke', chest: 'Custom', waist: 'Custom', hip: 'Custom', shoulder: 'Custom', length: 'Custom' },
  ];

  const isWomen = gender === 'women';
  const womenData = unit === 'inches' ? womenMeasurementsInches : womenMeasurementsCm;
  const menData = unit === 'inches' ? menMeasurementsInches : menMeasurementsCm;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="relative bg-[#240E14] text-monarch-ivory rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-monarch-gold/40 shadow-2xl z-10 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-monarch-gold/25 pb-4">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-monarch-gold" />
            <h3 className="font-serif text-2xl text-monarch-ivory">Royal Atelier Size Guide</h3>
          </div>
          <button
            onClick={onClose}
            className="text-monarch-beige hover:text-monarch-ivory p-1 rounded-full border border-monarch-gold/30 hover:border-monarch-gold transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-monarch-beige/80 font-sans">
            All measurements denote garment specifications. For lehengas and sherwanis, we recommend choosing &lsquo;Custom Bespoke&rsquo; for complimentary master fitting.
          </p>
          <div className="flex items-center gap-1 bg-monarch-burgundy p-1 rounded-lg border border-monarch-gold/30 shrink-0 ml-4">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 rounded text-xs font-nav uppercase transition-colors ${
                unit === 'inches' ? 'bg-monarch-gold text-monarch-burgundy font-semibold' : 'text-monarch-beige'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded text-xs font-nav uppercase transition-colors ${
                unit === 'cm' ? 'bg-monarch-gold text-monarch-burgundy font-semibold' : 'text-monarch-beige'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Measurement Table */}
        <div className="overflow-x-auto border border-monarch-gold/25 rounded-xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-monarch-burgundy border-b border-monarch-gold/30 text-monarch-gold font-nav uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">{isWomen ? 'Bust' : 'Chest'}</th>
                <th className="py-3 px-4">Waist</th>
                <th className="py-3 px-4">Hip</th>
                <th className="py-3 px-4">Shoulder</th>
                {!isWomen && <th className="py-3 px-4">Length</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-monarch-gold/15 font-sans">
              {isWomen
                ? womenData.map((row) => (
                    <tr key={row.size} className="hover:bg-monarch-maroon/20">
                      <td className="py-3 px-4 font-serif text-sm font-semibold text-monarch-gold-light">
                        {row.size}
                      </td>
                      <td className="py-3 px-4 text-monarch-beige">{row.bust}</td>
                      <td className="py-3 px-4 text-monarch-beige">{row.waist}</td>
                      <td className="py-3 px-4 text-monarch-beige">{row.hip}</td>
                      <td className="py-3 px-4 text-monarch-beige">{row.shoulder}</td>
                    </tr>
                  ))
                : menData.map((row) => (
                    <tr key={row.size} className="hover:bg-monarch-maroon/20">
                      <td className="py-3 px-4 font-serif text-sm font-semibold text-monarch-gold-light">
                        {row.size}
                      </td>
                      <td className="py-3 px-4 text-monarch-beige">{row.chest}</td>
                      <td className="py-3 px-4 text-monarch-beige">{row.waist}</td>
                      <td className="py-3 px-4 text-monarch-beige">{row.hip}</td>
                      <td className="py-3 px-4 text-monarch-beige">{row.shoulder}</td>
                      <td className="py-3 px-4 text-monarch-beige">{row.length}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Bespoke Fit Note */}
        <div className="bg-monarch-maroon/40 border border-monarch-gold/30 p-4 rounded-xl flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-monarch-gold shrink-0 mt-0.5" />
          <div className="text-xs font-sans text-monarch-beige space-y-1">
            <h5 className="font-serif text-sm text-monarch-ivory font-medium">Complimentary Custom Tailoring</h5>
            <p>
              Once your order is placed with &lsquo;Custom Bespoke&rsquo;, our head master karigar will contact you via WhatsApp / video consultation to guide exact measurement recordings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
