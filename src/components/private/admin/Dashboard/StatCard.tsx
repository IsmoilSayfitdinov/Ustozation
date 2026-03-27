import { LucideIcon, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend: {
    value: string;
    isUp: boolean;
  };
  icon: LucideIcon;
  color: 'orange' | 'navy' | 'green' | 'red';
}

const StatCard = ({ label, value, trend, icon: Icon, color }: StatCardProps) => {
  const colorConfigs = {
    orange: {
      bg: 'bg-[#FFF4ED]',
      iconBg: 'bg-[#F97316]',
      text: 'text-[#F97316]',
      decoration: 'bg-[#F97316]/10'
    },
    navy: {
      bg: 'bg-[#F0F2F5]',
      iconBg: 'bg-[#002D5B]',
      text: 'text-[#002D5B]',
      decoration: 'bg-[#002D5B]/10'
    },
    green: {
      bg: 'bg-[#F0FDF4]',
      iconBg: 'bg-[#12B76A]',
      text: 'text-[#12B76A]',
      decoration: 'bg-[#12B76A]/10'
    },
    red: {
      bg: 'bg-[#FEF2F2]',
      iconBg: 'bg-[#F04438]',
      text: 'text-[#F04438]',
      decoration: 'bg-[#F04438]/10'
    }
  };

  const config = colorConfigs[color];

  return (
    <div className="bg-white p-4 md:p-6 rounded-3xl md:rounded-[32px] border border-[#F2F4F7] relative overflow-hidden group hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 hover:-translate-y-1 block">
      {/* Decorative background shape */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -mr-8 -mt-8 ${config.decoration} blur-2xl group-hover:scale-150 transition-transform duration-700`} />
      
      <div className="relative z-10 flex flex-col h-full justify-between min-h-[140px]">
        <div className="flex justify-between items-start">
          <div className="space-y-0.5 md:space-y-1">
            <p className="text-[10px] md:text-[11px] font-black text-[#98A2B3] uppercase tracking-[0.15em]">{label}</p>
            <h3 className="text-3xl md:text-4xl font-black text-[#1D2939] tracking-tight">{value}</h3>
          </div>
          
          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-[20px] md:rounded-full ${config.iconBg} flex shrink-0 items-center justify-center shadow-lg shadow-black/10 group-hover:rotate-12 transition-transform duration-500`}>
            <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-1.5">
            {trend.isUp ? (
              <TrendingUp className="w-4 h-4 text-[#12B76A]" />
            ) : (
              <TrendingDown className="w-4 h-4 text-[#F04438]" />
            )}
            <span className={`text-xs font-black ${trend.isUp ? 'text-[#12B76A]' : 'text-[#F04438]'}`}>
              {trend.value} <span className="text-[#98A2B3] ml-0.5">bu hafta</span>
            </span>
          </div>
          
          <ArrowRight className={`w-4 h-4 ${config.text} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
