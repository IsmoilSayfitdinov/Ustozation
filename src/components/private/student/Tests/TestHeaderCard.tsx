import React from 'react';
import { ClipboardCheck, ArrowRight } from 'lucide-react';

const TestHeaderCard = () => {
  return (
    <div className="bg-white p-8 md:p-10 rounded-[40px] border border-[#F2F4F7] shadow-sm flex flex-col md:flex-row items-center gap-8 group hover:shadow-xl transition-all duration-500">
      {/* Icon */}
      <div className="w-20 h-20 rounded-[28px] bg-[#141F38] flex items-center justify-center shrink-0 shadow-lg shadow-[#141F3833] group-hover:scale-110 transition-transform duration-500">
        <ClipboardCheck className="w-10 h-10 text-white" />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-2 text-center md:text-left">
        <h3 className="text-2xl font-black text-[#141F38] tracking-tight">To'liq daraja testi</h3>
        <p className="text-[#667085] font-semibold text-sm md:text-base leading-relaxed max-w-xl">
          Test orqali o'z bilim darajangizni tekshiring. Natijalar AI tomonidan tahlil qilinadi.
        </p>
      </div>

      {/* Action Button */}
      <button className="w-full md:w-auto px-8 py-4 bg-[#F97316] text-white rounded-2xl font-headline font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-[#F973164D] hover:-translate-y-1 active:scale-95 transition-all duration-300 whitespace-nowrap border-none cursor-pointer">
        Testni boshlash
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TestHeaderCard;
