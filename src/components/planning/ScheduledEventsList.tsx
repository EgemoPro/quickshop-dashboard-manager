
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Package2, MessageCircle, Target, ShoppingCart, Edit, Trash2, Loader2 } from "lucide-react";
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
  const getEventIcon = (type: string) => {
    switch (type) {
      case "product":
        return <Package2 className="h-4 w-4" />;
      case "message":
        return <MessageCircle className="h-4 w-4" />;
      case "marketing":
        return <Target className="h-4 w-4" />;
      case "order":
        return <ShoppingCart className="h-4 w-4" />;
      default:
        return <Package2 className="h-4 w-4" />;
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "product":
        return "Produit";
      case "message":
        return "Message";
      case "marketing":
        return "Marketing";
      case "order":
        return "Commande";
      default:
        return "Événement";
    }
  };

  const getEventBadgeVariant = (type: string) => {
    switch (type) {
      case "product":
        return "default";
      case "message":
        return "secondary";
      case "marketing":
        return "outline";
      case "order":
        return "destructive";
      default:
        return "default";
    }
  };

  const formatEventDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isEventUpcoming = (event: ScheduledEvent) => {
    return event.start > new Date();
  };

  const isEventToday = (event: ScheduledEvent) => {
    const today = new Date();
    return event.start.toDateString() === today.toDateString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-sm font-medium">Chargement des événements...</span>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Package2 className="h-16 w-16 mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-medium mb-2">Aucune publication programmée</h3>
        <p className="text-sm">Commencez par ajouter votre première publication au calendrier.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id} className={`transition-all duration-200 hover:shadow-md ${
          isEventToday(event) ? "border-blue-200 bg-blue-50" : ""
        }`}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`rounded-md p-2 ${
                  event.type === "product" ? "bg-blue-100" :
                  event.type === "message" ? "bg-green-100" :
                  event.type === "marketing" ? "bg-purple-100" :
                  "bg-orange-100"
                }`}>
                  {getEventIcon(event.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-gray-900 truncate">{event.title}</h3>
                    <Badge variant={getEventBadgeVariant(event.type)} className="text-xs">
                      {getEventTypeLabel(event.type)}
                    </Badge>
                    {isEventToday(event) && (
                      <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700">
                        Aujourd'hui
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{formatEventDate(event.start)}</span>
                  </div>
                  
                  {event.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                  )}
                  
                  {/* Additional info based on event type */}
                  {event.type === "product" && event.productId && (
                    <p className="text-xs text-gray-500 mt-1">Produit ID: {event.productId}</p>
                  )}
                  {event.type === "marketing" && event.campaignId && (
                    <p className="text-xs text-gray-500 mt-1">Campagne ID: {event.campaignId}</p>
                  )}
                  {event.type === "order" && event.orderId && (
                    <p className="text-xs text-gray-500 mt-1">Commande ID: {event.orderId}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditEvent(event)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteEvent(event)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ScheduledEventsList;
