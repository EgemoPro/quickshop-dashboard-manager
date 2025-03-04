
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Filter } from "lucide-react";
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
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
        <span>Chargement...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span>Publications totales</span>
        <span className="font-bold">{events.length}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Produits</span>
        <span className="font-bold">{events.filter(e => e.type === "product").length}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Messages</span>
        <span className="font-bold">{events.filter(e => e.type === "message").length}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Ce mois-ci</span>
        <span className="font-bold">
          {events.filter(e => e.start.getMonth() === new Date().getMonth()).length}
        </span>
      </div>
      
      <div className="border-t pt-4 mt-6">
        <h4 className="font-medium mb-3">Actions rapides</h4>
        <div className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={onAddEvent}
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un événement
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={onResetFilters}
          >
            <Filter className="h-4 w-4 mr-2" />
            Réinitialiser les filtres
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanningStats;
