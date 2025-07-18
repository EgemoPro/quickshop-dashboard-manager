
import React from "react";
import { formatDate } from "@/utils/formatDate";
import { Button } from "@/components/ui/button";
import { Package2, MessageCircle, Edit, Trash2, Loader2, BarChart3, ShoppingBag } from "lucide-react";
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

  const getEventIcon = (event: ScheduledEvent) => {
    switch (event.type) {
      case "product":
        return <Package2 className="h-5 w-5" />;
      case "message":
        return <MessageCircle className="h-5 w-5" />;
      case "marketing":
        return <BarChart3 className="h-5 w-5" />;
      case "order":
        return <ShoppingBag className="h-5 w-5" />;
      default:
        return <MessageCircle className="h-5 w-5" />;
    }
  };

  const getEventBgClass = (event: ScheduledEvent) => {
    switch (event.type) {
      case "product":
        return "bg-blue-100";
      case "message":
        return "bg-green-100";
      case "marketing":
        return "bg-purple-100";
      case "order":
        return "bg-orange-100";
      default:
        return "bg-gray-100";
    }
  };

  const getEventIdInfo = (event: ScheduledEvent) => {
    if (event.productId) {
      return `Produit: ${event.productId}`;
    } else if (event.campaignId) {
      return `Campagne: ${event.campaignId}`;
    } else if (event.orderId) {
      return `Commande: ${event.orderId}`;
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {events.map(event => (
        <div key={event.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className={`rounded-md p-2 ${getEventBgClass(event)}`}>
              {getEventIcon(event)}
            </div>
            <div>
              <h3 className="font-medium">{event.title}</h3>
              <p className="text-sm text-gray-500">
                {formatDate(event.start, 'datetime')}
              </p>
              {event.description && (
                <p className="text-sm text-gray-500 truncate max-w-xs">
                  {event.description}
                </p>
              )}
              {getEventIdInfo(event) && (
                <p className="text-xs text-gray-400 mt-1">
                  {getEventIdInfo(event)}
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
