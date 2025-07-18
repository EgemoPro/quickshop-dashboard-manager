
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Plus } from "lucide-react";

interface PlanningHeaderProps {
  onFocusCalendar: () => void;
  onAddPublication: () => void;
}

const PlanningHeader: React.FC<PlanningHeaderProps> = ({ onFocusCalendar, onAddPublication }) => {
  return (
    <CardHeader className="pb-3 px-3 sm:px-6">
      <div className="flex justify-between items-center flex-col sm:flex-row gap-3 sm:gap-4">
        <CardTitle className="text-lg sm:text-xl">Calendrier des Publications</CardTitle>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onFocusCalendar}
            className="flex-1 sm:flex-none"
          >
            <CalendarIcon className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Aujourd'hui</span>
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={onAddPublication}
            className="hidden sm:flex flex-1 sm:flex-none"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle Publication
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default PlanningHeader;
