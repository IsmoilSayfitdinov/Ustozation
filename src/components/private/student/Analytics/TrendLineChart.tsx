import React from 'react';

const TrendLineChart = () => {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-[#F2F4F7] shadow-sm space-y-8 h-full flex flex-col">
      <h3 className="text-lg font-bold text-[#141F38]">Qayta topshirish trendi</h3>
      
      <div className="flex-1 relative min-h-[160px] w-full mt-4">
        {/* Custom SVG Line Chart */}
        <svg viewBox="0 0 400 120" className="w-full h-full overflow-visible">
          {/* Gradient Define */}
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area under the line */}
          <path 
            d="M0,80 Q100,75 200,60 T400,30 L400,120 L0,120 Z" 
            fill="url(#lineGradient)" 
          />

          {/* Line */}
          <path 
            d="M0,80 Q100,75 200,60 T400,30" 
            fill="none" 
            stroke="#F97316" 
            strokeWidth="3" 
            strokeLinecap="round"
            className="drop-shadow-sm"
          />

          {/* Dots */}
          <circle cx="200" cy="60" r="4" fill="#F97316" stroke="white" strokeWidth="2" />
          <circle cx="400" cy="30" r="4" fill="#F97316" stroke="white" strokeWidth="2" />
        </svg>

        {/* Labels */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between text-[10px] font-bold text-[#98A2B3] px-1 uppercase tracking-widest">
          <div className="flex flex-col items-center">
            <span>2-hafta</span>
          </div>
          <div className="flex flex-col items-center">
            <span>3-hafta</span>
          </div>
          <div className="flex flex-col items-center">
            <span>4-hafta</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendLineChart;
