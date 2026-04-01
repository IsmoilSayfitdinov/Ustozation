import { X, Trophy, Sparkles, AlertTriangle, TrendingUp, Bell, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications, type Notification } from '@/hooks/useNotifications';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ICON_MAP = {
  points: { icon: TrendingUp, bg: 'bg-[#E8FFF0]', color: 'text-[#22C55E]' },
  insight: { icon: Sparkles, bg: 'bg-[#FFF6ED]', color: 'text-[#F97316]' },
  achievement: { icon: Trophy, bg: 'bg-[#FFFBEB]', color: 'text-[#EAB308]' },
  warning: { icon: AlertTriangle, bg: 'bg-[#FFF0F0]', color: 'text-[#F04438]' },
};

function NotificationItem({ notification }: { notification: Notification }) {
  const config = ICON_MAP[notification.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#F9FAFB] dark:hover:bg-white/5 transition-all cursor-pointer group"
    >
      <div className={`w-10 h-10 rounded-xl ${config.bg} dark:bg-opacity-20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
        <Icon className={`w-5 h-5 ${config.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-black text-[#141F38] dark:text-white truncate">{notification.title}</h4>
          <span className="text-[10px] font-bold text-[#98A2B3] whitespace-nowrap">{notification.time}</span>
        </div>
        <p className="text-xs font-medium text-[#667085] dark:text-white/50 mt-1 line-clamp-2 leading-relaxed">{notification.description}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-[#D0D5DD] shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}

const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  const { notifications, unreadCount } = useNotifications();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
            className="fixed top-4 right-4 md:top-6 md:right-8 w-[calc(100%-2rem)] max-w-[420px] bg-white dark:bg-[#1a1a1a] rounded-[28px] shadow-2xl shadow-black/10 dark:shadow-black/40 border border-[#F2F4F7] dark:border-white/10 z-[101] overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#141F38] dark:text-white">Bildirishnomalar</h3>
                  {unreadCount > 0 && (
                    <p className="text-[11px] font-bold text-[#98A2B3]">{unreadCount} ta yangi</p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-[#F9FAFB] dark:bg-white/10 flex items-center justify-center hover:bg-[#F2F4F7] dark:hover:bg-white/15 transition-colors"
              >
                <X className="w-4 h-4 text-[#98A2B3]" />
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#F2F4F7] dark:bg-white/8 mx-4" />

            {/* Notifications List */}
            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar px-2 py-2">
              {notifications.length > 0 ? (
                <div className="space-y-1">
                  {notifications.map((n, idx) => (
                    <NotificationItem key={n.id} notification={n} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="w-16 h-16 rounded-full bg-[#F9FAFB] dark:bg-white/5 flex items-center justify-center mb-4">
                    <Bell className="w-7 h-7 text-[#D0D5DD]" />
                  </div>
                  <p className="text-sm font-bold text-[#98A2B3] text-center">Hozircha bildirishnomalar yo'q</p>
                  <p className="text-xs font-medium text-[#D0D5DD] text-center mt-1">Test topshiring va natijalarni kuzating</p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <>
                <div className="h-px bg-[#F2F4F7] dark:bg-white/8 mx-4" />
                <div className="p-4">
                  <button
                    onClick={onClose}
                    className="w-full py-3 rounded-xl bg-[#F9FAFB] dark:bg-white/5 text-[#667085] dark:text-white/50 font-bold text-sm hover:bg-[#F2F4F7] dark:hover:bg-white/10 transition-colors"
                  >
                    Barchasini o'qilgan deb belgilash
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel;
