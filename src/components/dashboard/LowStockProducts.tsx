
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { useCurrency } from "@/hooks/use-currency";

interface LowStockProductsProps {
  darkMode: boolean;
}

const LowStockProducts: React.FC<LowStockProductsProps> = ({ darkMode }) => {
  const { lowStockProducts } = useAppSelector(state => state.products);
  const { formatCurrency } = useCurrency();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <Card className={`border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-colors duration-300`}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Stock faible</CardTitle>
              <CardDescription className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                Produits à réapprovisionner
              </CardDescription>
            </div>
            <Button size="sm" variant="outline">
              Tout voir
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lowStockProducts.map((product) => {
              // Extraire le prix sans la devise pour le formater correctement
              const priceValue = product.price.replace(/[^\d,.]/g, '');
              
              return (
                <div 
                  key={product.id}
                  className={`p-3 rounded-lg border ${
                    darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'
                  } transition-colors duration-200`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                        {product.category} • {formatCurrency(priceValue)}
                      </p>
                    </div>
                    <Badge variant="destructive" className="mt-1">
                      Stock: {product.stock}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LowStockProducts;
