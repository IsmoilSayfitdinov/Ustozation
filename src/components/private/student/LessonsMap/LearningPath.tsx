import React from 'react';
import { Check, Lock } from 'lucide-react';

interface PathNode {
  id: number;
  status: 'completed' | 'current' | 'locked';
  label?: string;
}

interface LearningPathProps {
  nodes: PathNode[];
}

const LearningPath = ({ nodes }: LearningPathProps) => {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-[#F2F4F7] shadow-sm">
      <h2 className='text-2xl font-bold text-[#141F38] mb-8'>O'quv yo'li</h2>
      <div className="relative flex items-center justify-between">
        {/* Connection Line */}
        <div className="absolute left-20 right-20 h-[2px] bg-[#F2F4F7] top-1/2 -translate-y-1/2 z-0" />
        
        {nodes.map((node, index) => (
          <div key={node.id} className="relative z-10 flex flex-col items-center">
            <div 
              className={`w-[56px] h-[56px] rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                node.status === 'completed' 
                  ? 'bg-[#22C55E] text-white shadow-[#22C55E33]' 
                  : node.status === 'current'
                    ? 'bg-[#F97316] text-white shadow-[#F9731633] scale-110'
                    : 'bg-[#F2F4F7] text-[#98A2B3]'
              }`}
            >
              {node.status === 'completed' ? (
                <Check className="w-6 h-6" />
              ) : node.status === 'current' ? (
                <span className="text-xl font-black">{node.id}</span>
              ) : (
                <Lock className="w-6 h-6" />
              )}
            </div>
            {node.label && (
              <span className="absolute -bottom-8 whitespace-nowrap text-sm font-semibold text-[#667085]">
                {node.label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 flex items-center gap-8 text-sm font-semibold">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
          <span className="text-[#667085]">Tugallangan</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-surface-tint" />
          <span className="text-[#667085]">Joriy dars</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#F2F4F7]" />
          <span className="text-[#667085]">Qulflangan</span>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
