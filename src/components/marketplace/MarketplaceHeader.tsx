
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface MarketplaceHeaderProps {
  onAddApp: () => void;
}

const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({ onAddApp }) => {
  return (
    <CardHeader className="pb-3">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <CardTitle>Gestion de la Marketplace</CardTitle>
        <div className="flex gap-2">
          <Button variant="default" size="sm" onClick={onAddApp}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une App
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default MarketplaceHeader;
