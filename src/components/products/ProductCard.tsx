
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Package2, ImageIcon, Tag, ShoppingBag, Star, Hash, Palette, Ruler, Weight } from "lucide-react";
import { Product } from "@/types/productSlicesTypes";

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
            alt={product.images[0].alt || product.name}
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

        {product.images && product.images.length > 1 && (
          <Badge className="absolute top-3 left-3 bg-black/50 text-white text-xs">
            <ImageIcon className="h-3 w-3 mr-1" />
            {product.images.length}
          </Badge>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        {/* Header with name and SKU */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
            {product.sku && (
              <div className="flex items-center text-xs text-gray-400 mt-1">
                <Hash className="h-3 w-3 mr-1" />
                <span>{product.sku}</span>
              </div>
            )}
          </div>
        </div>

        {/* Brand */}
        {product.brand && (
          <div className="text-sm font-medium text-gray-600 mb-2">
            {product.brand}
          </div>
        )}

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="space-y-2 mb-4 flex-1">
          {/* Category */}
          <div className="flex items-center text-sm text-gray-500 gap-1">
            <Tag className="h-3.5 w-3.5" />
            <span>Catégorie: {product.category}</span>
          </div>
          
          {/* Stock */}
          <div className="flex items-center text-sm text-gray-500 gap-1">
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Stock: {product.stock} unités</span>
          </div>

          {/* Reviews */}
          {product.reviews && product.reviews > 0 && (
            <div className="flex items-center text-sm text-gray-500 gap-1">
              <Star className="h-3.5 w-3.5" />
              <span>{product.reviews} avis</span>
            </div>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center text-sm text-gray-500 gap-1">
              <Palette className="h-3.5 w-3.5" />
              <div className="flex gap-1">
                {product.colors.slice(0, 3).map((color, index) => (
                  <div
                    key={index}
                    className="w-3 h-3 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                {product.colors.length > 3 && (
                  <span className="text-xs">+{product.colors.length - 3}</span>
                )}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex items-center text-sm text-gray-500 gap-1">
              <Ruler className="h-3.5 w-3.5" />
              <div className="flex flex-wrap gap-1">
                {product.sizes.slice(0, 3).map((size, index) => (
                  <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                    {size.name}
                  </Badge>
                ))}
                {product.sizes.length > 3 && (
                  <span className="text-xs">+{product.sizes.length - 3}</span>
                )}
              </div>
            </div>
          )}

          {/* Dimensions */}
          {product.dimensions && (
            <div className="flex items-center text-sm text-gray-500 gap-1">
              <Ruler className="h-3.5 w-3.5" />
              <span>Dimensions: {product.dimensions}</span>
            </div>
          )}

          {/* Weight */}
          {product.weight && (
            <div className="flex items-center text-sm text-gray-500 gap-1">
              <Weight className="h-3.5 w-3.5" />
              <span>Poids: {product.weight}</span>
            </div>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {product.tags.slice(0, 2).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {product.tags.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{product.tags.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
        
        {/* Price Section */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div className="flex flex-col">
            <div className="font-bold text-lg text-primary">{product.price} {currencySymbol}</div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-sm text-gray-400 line-through">
                {product.originalPrice} {currencySymbol}
              </div>
            )}
          </div>
          
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
