
import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Package2, MessageCircle, Edit, Trash2, Loader2 } from "lucide-react";
import { ScheduledEvent } from "@/store/slices/planningSlice";

interface ScheduledEventsListProps {
  events: ScheduledEvent[];
  isLoading: boolean;
  onEditEvent: (event: ScheduledEvent) => void;
  onDeleteEvent: (event: ScheduledEvent) => void;
}

const ScheduledEventsList: React.FC<ScheduledEventsListProps> = ({ 
  events, 
  isLoading, 
  onEditEvent, 
  onDeleteEvent 
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
        <span>Chargement des publications...</span>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center p-6 text-gray-500">
        Aucune publication programmée correspondant à vos critères.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map(event => (
        <div key={event.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className={`rounded-md p-2 ${event.type === "product" ? "bg-blue-100" : "bg-green-100"}`}>
              {event.type === "product" ? (
                <Package2 className="h-5 w-5" />
              ) : (
                <MessageCircle className="h-5 w-5" />
              )}
            </div>
            <div>
              <h3 className="font-medium">{event.title}</h3>
              <p className="text-sm text-gray-500">
                {format(event.start, "EEEE d MMMM yyyy, HH:mm", { locale: fr })}
              </p>
              {event.description && (
                <p className="text-sm text-gray-500 truncate max-w-xs">
                  {event.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onEditEvent(event)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Modifier
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-red-500 hover:text-red-700"
              onClick={() => onDeleteEvent(event)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Supprimer
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduledEventsList;
