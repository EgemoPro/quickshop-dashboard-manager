
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Package2, ImageIcon, Tag, ShoppingBag } from "lucide-react";
import { Product } from "@/store/slices/productsSlice";

interface ProductCardProps {
  product: Product;
  getProductStatus: (stock: number) => { text: string; variant: "default" | "secondary" | "destructive" };
  currencySymbol: string;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  getProductStatus, 
  currencySymbol, 
  onEdit, 
  onDelete 
}) => {
  const status = getProductStatus(product.stock);
  
  return (
    <Card className="overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 bg-white border-none shadow-sm">
      <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
        {product.images && product.images.length > 0 ? (
          <img 
            src={product.images[0].url} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <Package2 className="h-16 w-16 text-gray-300" />
          </div>
        )}
        
        <Badge 
          variant={status.variant} 
          className="absolute top-3 right-3 shadow-sm"
        >
          {status.text}
        </Badge>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
        </div>
        
        <div className="space-y-2 mb-4 flex-1">
          <div className="flex items-center text-sm text-gray-500 gap-1">
            <Tag className="h-3.5 w-3.5" />
            <span>Catégorie: {product.category}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 gap-1">
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Stock: {product.stock} unités</span>
          </div>
          
          {product.images && product.images.length > 0 && (
            <div className="flex items-center text-xs text-gray-400">
              <ImageIcon className="h-3 w-3 mr-1" /> 
              {product.images.length} image{product.images.length > 1 ? 's' : ''}
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div className="font-bold text-lg text-primary">{product.price}</div>
          
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onEdit(product)}
              className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onDelete(product.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
