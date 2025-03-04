
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface PlanningFiltersProps {
  activeTab: string;
  searchTerm: string;
  onTabChange: (value: string) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PlanningFilters: React.FC<PlanningFiltersProps> = ({ 
  activeTab, 
  searchTerm, 
  onTabChange, 
  onSearchChange 
}) => {
  return (
    <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full sm:w-auto">
        <TabsList>
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="products">Produits</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex w-full sm:w-auto">
        <Input
          placeholder="Rechercher..."
          className="max-w-sm"
          value={searchTerm}
          onChange={onSearchChange}
        />
        <Button variant="ghost" size="icon" className="ml-2">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PlanningFilters;
