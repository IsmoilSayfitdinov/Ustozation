import { useMemo } from 'react';
import { usePoints } from './useGamification';
import { useInsights } from './useAnalytics';

export interface Notification {
  id: string;
  type: 'points' | 'insight' | 'achievement' | 'warning';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return 'Hozirgina';
  if (diff < 3600) return `${Math.floor(diff / 60)} daqiqa oldin`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} soat oldin`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} kun oldin`;
  return new Date(dateStr).toLocaleDateString('uz');
}

export function useNotifications() {
  const { data: pointsData } = usePoints();
  const { data: insights } = useInsights();

  const notifications = useMemo<Notification[]>(() => {
    const items: Notification[] = [];

    // Points history → notifications
    if (pointsData?.history) {
      for (const entry of pointsData.history.slice(0, 8)) {
        const isPositive = entry.points > 0;
        items.push({
          id: `pt-${entry.created_at}`,
          type: isPositive ? 'points' : 'warning',
          title: isPositive ? `+${entry.points} ball qo'shildi` : `${entry.points} ball`,
          description: entry.reason,
          time: timeAgo(entry.created_at),
          read: false,
        });
      }
    }

    // AI Insights → notifications
    if (insights) {
      for (const insight of insights.slice(0, 4)) {
        const hasWeakAreas = insight.weak_areas.length > 0;
        items.push({
          id: `ai-${insight.id}`,
          type: hasWeakAreas ? 'warning' : 'achievement',
          title: hasWeakAreas ? 'AI tavsiya' : 'Yaxshi natija!',
          description: insight.insight_text.slice(0, 100) + (insight.insight_text.length > 100 ? '...' : ''),
          time: timeAgo(insight.created_at),
          read: false,
        });
      }
    }

    // Sort by most recent
    items.sort((a, b) => {
      if (a.time === 'Hozirgina') return -1;
      if (b.time === 'Hozirgina') return 1;
      return 0;
    });

    return items.slice(0, 10);
  }, [pointsData, insights]);

  return {
    notifications,
    unreadCount: notifications.length,
  };
}
