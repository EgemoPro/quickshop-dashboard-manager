
import React from 'react';
import { Package2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddProduct: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddProduct }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
      <Package2 className="h-16 w-16 mb-4 text-gray-300" />
      <h3 className="text-xl font-medium text-gray-700 mb-2">Aucun produit trouvé</h3>
      <p className="text-gray-500 mb-6 max-w-md">
        Vous n'avez pas encore de produits ou aucun produit ne correspond à vos filtres de recherche.
      </p>
      <Button onClick={onAddProduct} className="bg-primary hover:bg-primary/90">
        <Plus className="h-4 w-4 mr-2" />
        Ajouter un produit
      </Button>
    </div>
  );
};

export default EmptyState;
