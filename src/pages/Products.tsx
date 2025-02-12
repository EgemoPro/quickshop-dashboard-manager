
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package2, Plus, Edit, Trash2 } from "lucide-react";

const products = [
  { id: 1, name: "T-shirt Premium", price: "29,99 €", stock: 45, status: "En stock" },
  { id: 2, name: "Jeans Classique", price: "79,99 €", stock: 12, status: "Stock faible" },
  { id: 3, name: "Chaussures de Sport", price: "99,99 €", stock: 0, status: "Rupture" },
  { id: 4, name: "Veste d'Hiver", price: "149,99 €", stock: 28, status: "En stock" },
  { id: 5, name: "Sac à Main", price: "59,99 €", stock: 15, status: "En stock" },
];

const Products = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Produits</h1>
              <p className="text-gray-600 mt-1">Gérez votre catalogue de produits</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un produit
            </Button>
          </div>
        </header>

        <Card className="p-6">
          <ScrollArea className="h-[600px]">
            <div className="grid gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Package2 className="h-8 w-8 text-gray-400" />
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-500">Prix: {product.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={
                          product.status === "En stock"
                            ? "default"
                            : product.status === "Stock faible"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {product.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </motion.div>
    </div>
  );
};

export default Products;
