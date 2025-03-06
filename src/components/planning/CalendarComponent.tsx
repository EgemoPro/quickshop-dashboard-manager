
import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { fr } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Loader2 } from "lucide-react";
import { ScheduledEvent } from "@/store/slices/planningSlice";
import EventComponent from "./EventComponent";

const locales = { fr };
// Create a proper localizer for react-big-calendar
const localizer = dateFnsLocalizer({
  format: (date, formatStr) => format(date, formatStr, { locale: fr }),
  parse: (str, formatStr) => parse(str, formatStr, new Date()),
  startOfWeek: (date) => startOfWeek(date, { locale: fr }),
  getDay,
  locales
});

interface CalendarComponentProps {
  events: ScheduledEvent[];
  isLoading: boolean;
  onSelectEvent: (event: ScheduledEvent) => void;
  onSelectSlot: ({ start, end }: { start: Date; end: Date }) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ 
  events, 
  isLoading, 
  onSelectEvent, 
  onSelectSlot 
}) => {
  // Function to determine the event background color based on event type
  const eventPropGetter = (event: ScheduledEvent) => {
    let backgroundColor = "";
    
    switch (event.type) {
      case "product":
        backgroundColor = "bg-blue-100";
        break;
      case "message":
        backgroundColor = "bg-green-100";
        break;
      case "marketing":
        backgroundColor = "bg-purple-100";
        break;
      case "order":
        backgroundColor = "bg-orange-100";
        break;
      default:
        backgroundColor = "bg-gray-100";
    }
    
    return { className: backgroundColor };
  };

  return (
    <div className="h-[600px] relative">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-sm font-medium">Chargement du calendrier...</span>
        </div>
      ) : null}
      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        components={{
          event: EventComponent as any,
        }}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable
        eventPropGetter={eventPropGetter}
        messages={{
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
        }}
      />
    </div>
  );
};

export default CalendarComponent;
