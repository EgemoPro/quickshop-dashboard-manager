
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Package2, MessageCircle } from "lucide-react";

const CalendarLegend: React.FC = () => {
  return (
    <div className="flex gap-4 mt-4 justify-end">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="bg-blue-100">
          <Package2 className="h-3 w-3 mr-1" />
          Produit
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="bg-green-100">
          <MessageCircle className="h-3 w-3 mr-1" />
          Message
        </Badge>
      </div>
    </div>
  );
};

export default CalendarLegend;
