
import React from "react";
import { Package, FileText, Banknote, Truck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { Badge } from "@/components/ui/badge";

const OrdersManagementCard = () => {
  const { recentOrders } = useAppSelector((state) => state.orders);
  
  const pendingOrders = recentOrders.filter(order => order.status === "En attente").length;
  const processingOrders = recentOrders.filter(order => order.status === "En cours").length;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Package className="h-6 w-6 text-gray-500" />
        <h2 className="text-xl font-semibold">Gestion des Commandes</h2>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Commandes en attente</p>
          <Badge variant={pendingOrders > 0 ? "warning" : "outline"}>
            {pendingOrders}
          </Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Commandes en cours</p>
          <Badge variant={processingOrders > 0 ? "info" : "outline"}>
            {processingOrders}
          </Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Total des commandes</p>
          <Badge variant="outline">{recentOrders.length}</Badge>
        </div>
        
        <div className="grid gap-2 pt-4">
          <Button variant="outline" className="w-full justify-start">
            <Package className="h-4 w-4 mr-2" />
            Gérer les commandes
          </Button>
        </div>
        
        <div className="grid gap-2">
          <Button variant="outline" className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2" />
            Générer des factures
          </Button>
        </div>
        
        <div className="grid gap-2">
          <Button variant="outline" className="w-full justify-start">
            <Truck className="h-4 w-4 mr-2" />
            Assigner aux livreurs
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OrdersManagementCard;
