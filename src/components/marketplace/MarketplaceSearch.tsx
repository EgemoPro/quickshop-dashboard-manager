
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface MarketplaceSearchProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MarketplaceSearch: React.FC<MarketplaceSearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex w-full sm:w-auto">
      <Input
        placeholder="Rechercher..."
        className="max-w-sm"
        value={searchTerm}
        onChange={onSearchChange}
      />
      <Button variant="ghost" size="icon" className="ml-2">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default MarketplaceSearch;
