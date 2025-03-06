
import React from "react";
import { Button } from "@/components/ui/button";
import { Package2, MessageCircle, Clock, RefreshCw, Plus, BarChart3, ShoppingBag } from "lucide-react";
import { ScheduledEvent } from "@/store/slices/planningSlice";

interface PlanningStatsProps {
  events: ScheduledEvent[];
  isLoading: boolean;
  onAddEvent: () => void;
  onResetFilters: () => void;
}

const PlanningStats: React.FC<PlanningStatsProps> = ({ 
  events, 
  isLoading, 
  onAddEvent, 
  onResetFilters 
}) => {
  const productEvents = events.filter(event => event.type === "product").length;
  const messageEvents = events.filter(event => event.type === "message").length;
  const marketingEvents = events.filter(event => event.type === "marketing").length;
  const orderEvents = events.filter(event => event.type === "order").length;
  
  const upcomingEvents = events.filter(event => new Date(event.start) > new Date()).length;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center p-3 border rounded-md">
          <Package2 className="h-5 w-5 text-blue-500 mb-1" />
          <div className="text-2xl font-bold">{productEvents}</div>
          <div className="text-xs text-gray-500">Produits</div>
        </div>
        <div className="flex flex-col items-center p-3 border rounded-md">
          <MessageCircle className="h-5 w-5 text-green-500 mb-1" />
          <div className="text-2xl font-bold">{messageEvents}</div>
          <div className="text-xs text-gray-500">Messages</div>
        </div>
        <div className="flex flex-col items-center p-3 border rounded-md">
          <BarChart3 className="h-5 w-5 text-purple-500 mb-1" />
          <div className="text-2xl font-bold">{marketingEvents}</div>
          <div className="text-xs text-gray-500">Marketing</div>
        </div>
        <div className="flex flex-col items-center p-3 border rounded-md">
          <ShoppingBag className="h-5 w-5 text-orange-500 mb-1" />
          <div className="text-2xl font-bold">{orderEvents}</div>
          <div className="text-xs text-gray-500">Commandes</div>
        </div>
      </div>
      
      <div className="flex items-center p-3 border rounded-md">
        <Clock className="h-5 w-5 text-primary mr-2" />
        <div>
          <div className="text-lg font-bold">{upcomingEvents}</div>
          <div className="text-xs text-gray-500">Événements à venir</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Button className="w-full" onClick={onAddEvent}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un événement
        </Button>
        <Button variant="outline" className="w-full" onClick={onResetFilters}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Réinitialiser les filtres
        </Button>
      </div>
    </div>
  );
};

export default PlanningStats;
