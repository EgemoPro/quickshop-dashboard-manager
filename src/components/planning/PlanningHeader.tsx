
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
    <CardHeader className="pb-3">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <CardTitle>Calendrier des Publications</CardTitle>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onFocusCalendar}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Aujourd'hui
          </Button>
          <Button variant="default" size="sm" onClick={onAddPublication}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle Publication
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default PlanningHeader;
