import { useGrammarMastery } from '@/hooks/useAnalytics';

const GrammarLevelList = () => {
  const { data: grammarTopics, isLoading } = useGrammarMastery();

  return (
    <div className="bg-white p-8 rounded-[32px] border border-[#F2F4F7] shadow-sm space-y-8">
      <h3 className="text-lg font-bold text-[#141F38]">Grammatika darajasi</h3>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="w-6 h-6 border-3 border-surface-tint border-t-transparent rounded-full animate-spin" />
        </div>
      ) : !grammarTopics || grammarTopics.length === 0 ? (
        <p className="text-[#98A2B3] text-sm font-semibold text-center py-8">Ma'lumot mavjud emas</p>
      ) : (
        <div className="space-y-6">
          {grammarTopics.map((item) => (
            <div key={item.id} className="space-y-2 group cursor-pointer">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                <span className="text-[#141F38] group-hover:text-surface-tint transition-colors">{item.topic}</span>
                <span className="text-[#98A2B3]">{Math.round(item.mastery_percentage)}%</span>
              </div>
              <div className="h-2 w-full bg-[#F2F4F7] rounded-full overflow-hidden">
                <div
                  className="h-full bg-surface-tint transition-all duration-1000 group-hover:brightness-110"
                  style={{ width: `${item.mastery_percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GrammarLevelList;
