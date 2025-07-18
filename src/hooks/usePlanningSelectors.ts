
import { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { ScheduledEvent } from '@/store/slices/planningSlice';

export const usePlanningSelectors = () => {
  const { events, activeTab, searchTerm, isLoading, error } = useAppSelector(state => state.planning);

  // Memoized filtered events
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesType =
        activeTab === "all" ||
        (activeTab === "products" && event.type === "product") ||
        (activeTab === "messages" && event.type === "message") ||
        (activeTab === "marketing" && event.type === "marketing") ||
        (activeTab === "orders" && event.type === "order");

      const matchesSearch =
        searchTerm === "" ||
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesType && matchesSearch;
    });
  }, [events, activeTab, searchTerm]);

  // Memoized event statistics
  const eventStats = useMemo(() => {
    const stats = {
      total: events.length,
      products: 0,
      messages: 0,
      marketing: 0,
      orders: 0,
      upcoming: 0
    };

    const now = new Date();

    events.forEach(event => {
      switch (event.type) {
        case "product":
          stats.products++;
          break;
        case "message":
          stats.messages++;
          break;
        case "marketing":
          stats.marketing++;
          break;
        case "order":
          stats.orders++;
          break;
      }

      if (new Date(event.start) > now) {
        stats.upcoming++;
      }
    });

    return stats;
  }, [events]);

  // Memoized upcoming events (next 7 days)
  const upcomingEvents = useMemo(() => {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    return events
      .filter(event => {
        const eventDate = new Date(event.start);
        return eventDate >= now && eventDate <= nextWeek;
      })
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  }, [events]);

  return {
    events,
    filteredEvents,
    eventStats,
    upcomingEvents,
    activeTab,
    searchTerm,
    isLoading,
    error
  };
};
