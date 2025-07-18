import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Loader2 } from "lucide-react";
import { ScheduledEvent } from "@/store/slices/planningSlice";
import EventComponent from "./EventComponent";

// Simple localizer without external date-fns dependency
const localizer = dateFnsLocalizer({
  format: (date: Date, formatStr: string) => {
    if (formatStr === 'HH:mm') {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }
    if (formatStr === 'dd/MM/yyyy') {
      return date.toLocaleDateString('fr-FR');
    }
    return date.toLocaleDateString('fr-FR');
  },
  parse: (str: string, formatStr: string) => {
    return new Date(str);
  },
  startOfWeek: (date: Date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Monday
    return new Date(start.setDate(diff));
  },
  getDay: (date: Date) => date.getDay(),
  locales: { fr: {} }
});

interface CalendarComponentProps {
  events: ScheduledEvent[];
  isLoading: boolean;
  onSelectEvent: (event: ScheduledEvent) => void;
  onSelectSlot: ({ start, end }: { start: Date; end: Date }) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = React.memo(({ 
  events, 
  isLoading, 
  onSelectEvent, 
  onSelectSlot 
}) => {
  // Memoize event prop getter for performance with semantic color tokens
  const eventPropGetter = React.useCallback((event: ScheduledEvent) => {
    let className = "";
    
    switch (event.type) {
      case "product":
        className = "bg-primary/20 border-primary/50 text-primary-foreground";
        break;
      case "message":
        className = "bg-secondary/20 border-secondary/50 text-secondary-foreground";
        break;
      case "marketing":
        className = "bg-accent/20 border-accent/50 text-accent-foreground";
        break;
      case "order":
        className = "bg-orange-100 border-orange-300 text-orange-800 dark:bg-orange-900 dark:border-orange-700 dark:text-orange-200";
        break;
      default:
        className = "bg-muted/20 border-muted/50 text-muted-foreground";
    }
    
    return { 
      className: `${className} rounded-md border-l-4 px-2 py-1 shadow-sm hover:shadow-md transition-shadow duration-200`,
      style: {
        fontWeight: '500',
        fontSize: '0.875rem'
      }
    };
  }, []);

  // Memoize calendar messages for performance
  const messages = React.useMemo(() => ({
    next: "Suivant",
    previous: "Précédent",
    today: "Aujourd'hui",
    month: "Mois",
    week: "Semaine",
    day: "Jour",
    agenda: "Agenda",
    date: "Date",
    time: "Heure",
    event: "Événement",
    noEventsInRange: "Aucun événement dans cette période",
    showMore: (total: number) => `+${total} de plus`
  }), []);

  // Memoize components object for performance
  const calendarComponents = React.useMemo(() => ({
    event: EventComponent as any,
  }), []);

  return (
    <div className="h-[500px] sm:h-[600px] lg:h-[700px] relative bg-gradient-to-br from-background to-muted/20 rounded-xl border-2 border-border/50 shadow-lg overflow-hidden">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-md z-10 rounded-xl">
          <div className="flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-8 bg-card rounded-lg shadow-lg border">
            <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 animate-spin text-primary" />
            <span className="text-sm sm:text-base font-semibold text-foreground text-center">Chargement du calendrier...</span>
            <div className="w-24 sm:w-32 h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      ) : null}
      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        components={calendarComponents}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable
        eventPropGetter={eventPropGetter}
        messages={messages}
        popup
        step={30}
        timeslots={2}
        defaultView="month"
        views={window.innerWidth < 768 ? ['month', 'agenda'] : ['month', 'week', 'day', 'agenda']}
        formats={{
          timeGutterFormat: (date: Date) => 
            date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) => {
            const startTime = start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            const endTime = end.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            return `${startTime} - ${endTime}`;
          },
          agendaTimeFormat: (date: Date) =>
            date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          agendaDateFormat: (date: Date) =>
            date.toLocaleDateString('fr-FR'),
        }}
        className="calendar-modern h-full"
      />
    </div>
  );
});

CalendarComponent.displayName = "CalendarComponent";

export default CalendarComponent;