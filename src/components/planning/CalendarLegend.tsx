
import React from "react";
import { Package2, MessageCircle, BarChart3, ShoppingBag } from "lucide-react";

const CalendarLegend: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 mt-2 justify-center text-sm text-gray-600">
      <div className="flex items-center">
        <div className="w-3 h-3 bg-blue-100 rounded mr-1"></div>
        <Package2 className="h-3 w-3 mr-1" />
        <span>Produits</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-green-100 rounded mr-1"></div>
        <MessageCircle className="h-3 w-3 mr-1" />
        <span>Messages</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-purple-100 rounded mr-1"></div>
        <BarChart3 className="h-3 w-3 mr-1" />
        <span>Marketing</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-orange-100 rounded mr-1"></div>
        <ShoppingBag className="h-3 w-3 mr-1" />
        <span>Commandes</span>
      </div>
    </div>
  );
};

export default CalendarLegend;
