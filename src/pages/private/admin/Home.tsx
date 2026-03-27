import { Users, BookOpen, TrendingUp, AlertTriangle, Calendar } from 'lucide-react';
import StatCard from '@/components/private/admin/Dashboard/StatCard';
import ActivityChart from '@/components/private/admin/Dashboard/ActivityChart';
import TopStudents from '@/components/private/admin/Dashboard/TopStudents';
import RecentActivity from '@/components/private/admin/Dashboard/RecentActivity';
import DifficultTopics from '@/components/private/admin/Dashboard/DifficultTopics';

const AdminHome = () => {
  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      {/* Header with date */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-3xl md:text-4xl font-black text-[#1D2939] tracking-tight">Bosh sahifa</h2>
        <div className="bg-white px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl border border-[#F2F4F7] flex items-center gap-2 md:gap-3 shadow-sm group cursor-default w-full sm:w-auto overflow-hidden">
          <Calendar className="w-4 h-4 md:w-5 md:h-5 text-primary group-hover:scale-110 transition-transform shrink-0" />
          <span className="text-xs md:text-sm font-bold text-[#667085] whitespace-nowrap">
            Bugun: <span className="text-[#1D2939] font-black underline decoration-primary/30 underline-offset-4">M03 21</span>
          </span>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        <StatCard 
          label="Jami Talabalar" 
          value="156" 
          trend={{ value: "+12", isUp: true }} 
          icon={Users} 
          color="orange"
        />
        <StatCard 
          label="Faol Darslar" 
          value="24" 
          trend={{ value: "+3", isUp: true }} 
          icon={BookOpen} 
          color="navy"
        />
        <StatCard 
          label="O'rtacha Ball" 
          value="74" 
          trend={{ value: "+5%", isUp: true }} 
          icon={TrendingUp} 
          color="green"
        />
        <StatCard 
          label="Qiyin Mavzular" 
          value="5" 
          trend={{ value: "-2", isUp: false }} 
          icon={AlertTriangle} 
          color="red"
        />
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-8">
        <div className="xl:col-span-2">
          <ActivityChart />
        </div>
        <div className="xl:col-span-1">
          <TopStudents />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8 pb-10">
        <RecentActivity />
        <DifficultTopics />
      </div>
    </div>
  );
};

export default AdminHome;
