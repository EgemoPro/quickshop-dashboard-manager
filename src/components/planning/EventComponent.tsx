
import React from "react";
import { Package2, MessageCircle, Trash2 } from "lucide-react";
import { ScheduledEvent } from "@/store/slices/planningSlice";

interface EventComponentProps {
  event: ScheduledEvent;
}

const EventComponent: React.FC<EventComponentProps> = ({ event }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    // This function is just a placeholder, the actual implementation will be passed via props
  };

  return (
    <div 
      className={`rounded px-2 py-1 ${event.type === "product" ? "bg-blue-100" : "bg-green-100"} flex items-center justify-between group`}
    >
      <div className="flex items-center gap-1">
        {event.type === "product" ? (
          <Package2 className="h-3 w-3" />
        ) : (
          <MessageCircle className="h-3 w-3" />
        )}
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
