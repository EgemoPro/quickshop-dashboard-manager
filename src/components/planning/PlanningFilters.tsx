
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
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-4">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full sm:w-auto">
        <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full sm:w-auto h-auto sm:h-10 p-1">
          <TabsTrigger value="all" className="text-xs sm:text-sm py-1.5 sm:py-2">Tous</TabsTrigger>
          <TabsTrigger value="products" className="text-xs sm:text-sm py-1.5 sm:py-2">Produits</TabsTrigger>
          <TabsTrigger value="messages" className="text-xs sm:text-sm py-1.5 sm:py-2 col-span-2 sm:col-span-1">Messages</TabsTrigger>
          <TabsTrigger value="marketing" className="text-xs sm:text-sm py-1.5 sm:py-2">Marketing</TabsTrigger>
          <TabsTrigger value="orders" className="text-xs sm:text-sm py-1.5 sm:py-2 col-span-2 sm:col-span-1">Commandes</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex w-full sm:w-auto max-w-xs">
        <Input
          placeholder="Rechercher..."
          className="flex-1 text-sm"
          value={searchTerm}
          onChange={onSearchChange}
        />
        <Button variant="ghost" size="icon" className="ml-2 flex-shrink-0">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PlanningFilters;
