import { Brain, Crown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StartTestCard = () => {
  return (
    <Link to="/student/tests" className="block bg-white p-5 rounded-[28px] border border-[#F2F4F7] shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#2D3142] rounded-full flex items-center justify-center shrink-0">
            <Brain className="w-6 h-6 text-pink-500" />
          </div>
          <div>
            <h3 className="text-sm font-black text-[#141F38] mb-0.5">Testni boshlash</h3>
            <p className="text-xs font-semibold text-[#8C94A3]">Bilimingizni sinab ko'ring — Vocabulary, Grammar</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-[#8C94A3] group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
};

interface OverallScoreCardProps {
  score: number;
}

export const OverallScoreCard = ({ score }: OverallScoreCardProps) => {
  return (
    <div className="bg-white p-5 rounded-[28px] border border-[#F2F4F7] shadow-sm hover:shadow-lg transition-all duration-300 mt-4 md:mt-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#E1F7E8] rounded-full flex items-center justify-center shrink-0">
          <Crown className="w-6 h-6 text-[#10B981]" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-black text-[#141F38] leading-none mb-1">{score}%</h3>
          <p className="text-xs font-semibold text-[#8C94A3]">Umumiy natija</p>
        </div>
      </div>
    </div>
  );
};
