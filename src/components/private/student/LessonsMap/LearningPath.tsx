import React from 'react';

export interface PathNode {
  id: number;
  status: 'completed' | 'current' | 'locked';
  displayNumber: number;
}

interface LearningPathProps {
  nodes: PathNode[];
}

const LearningPath = ({ nodes }: LearningPathProps) => {
  return (
    <div className="bg-white p-5 md:p-8 rounded-[32px] md:rounded-[40px] border border-[#F2F4F7] shadow-sm">
      <h2 className='text-lg md:text-xl font-black text-[#141F38] mb-6'>O'quv yo'li</h2>
      
      <div className="flex flex-wrap gap-2 md:gap-3">
        {nodes.map((node) => {
          let boxClasses = "w-10 h-10 md:w-12 md:h-12 rounded-[12px] md:rounded-[14px] flex items-center justify-center text-sm md:text-base font-bold transition-all duration-300";
          
          if (node.status === 'completed') {
            boxClasses += " bg-primary text-white shadow-md shadow-primary/20 hover:scale-105 cursor-pointer";
          } else if (node.status === 'current') {
            boxClasses += " bg-primary/10 text-primary border border-primary/30 shadow-sm hover:scale-105 cursor-pointer";
          } else {
            boxClasses += " bg-[#F2F4F7] text-[#98A2B3]";
          }

          return (
            <div key={node.id} className={boxClasses}>
              {node.displayNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningPath;
