
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface ProductFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus
}) => {
  return (
    <div className="mt-6 flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Rechercher un produit..."
          className="pl-10 border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Select value={filterStatus} onValueChange={setFilterStatus}>
        <SelectTrigger className="w-full md:w-[200px] border-gray-200">
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2 text-gray-500" />
            <SelectValue placeholder="Tous les statuts" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les statuts</SelectItem>
          <SelectItem value="instock" className="text-green-600 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            En stock
          </SelectItem>
          <SelectItem value="lowstock" className="text-amber-600 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
            Stock faible
          </SelectItem>
          <SelectItem value="outofstock" className="text-red-600 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            Rupture
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductFilters;
