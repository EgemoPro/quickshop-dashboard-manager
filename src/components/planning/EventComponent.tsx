
import React from "react";
import { Package2, MessageCircle, Trash2, BarChart3, ShoppingBag } from "lucide-react";
import { ScheduledEvent } from "@/store/slices/planningSlice";

interface EventComponentProps {
  event: ScheduledEvent;
}

const EventComponent: React.FC<EventComponentProps> = ({ event }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    // This function is just a placeholder, the actual implementation will be passed via props
  };

  const getEventIcon = () => {
    switch (event.type) {
      case "product":
        return <Package2 className="h-3 w-3" />;
      case "message":
        return <MessageCircle className="h-3 w-3" />;
      case "marketing":
        return <BarChart3 className="h-3 w-3" />;
      case "order":
        return <ShoppingBag className="h-3 w-3" />;
      default:
        return <MessageCircle className="h-3 w-3" />;
    }
  };

  const getEventClass = () => {
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

  return (
    <div 
      className={`rounded px-2 py-1 ${getEventClass()} flex items-center justify-between group`}
    >
      <div className="flex items-center gap-1">
        {getEventIcon()}
        <span className="text-xs font-medium truncate">
          {event.title}
        </span>
      </div>
      <div className="hidden group-hover:flex">
        <button 
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default EventComponent;
