
import React from "react";
import { Package, FileText, Banknote, Truck, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const OrdersManagementCard = () => {
  const { recentOrders } = useAppSelector((state) => state.orders);
  const navigate = useNavigate();
  
  const pendingOrders = recentOrders.filter(order => order.status === "En attente").length;
  const processingOrders = recentOrders.filter(order => order.status === "En cours").length;

  return (
    <Card className="p-6 border-none shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-primary/10 p-2 rounded-full">
          <Package className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Gestion des Commandes</h2>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-blue-700">Commandes en attente</p>
          </div>
          <Badge variant={pendingOrders > 0 ? "secondary" : "outline"} className="bg-blue-100 text-blue-700 hover:bg-blue-200">
            {pendingOrders}
          </Badge>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-orange-700">Commandes en cours</p>
          </div>
          <Badge variant={processingOrders > 0 ? "secondary" : "outline"} className="bg-orange-100 text-orange-700 hover:bg-orange-200">
            {processingOrders}
          </Badge>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-700">Total des commandes</p>
          </div>
          <Badge variant="outline" className="bg-gray-100 hover:bg-gray-200">
            {recentOrders.length}
          </Badge>
        </div>
        
        <div className="grid gap-2 pt-4">
          <Button 
            variant="default" 
            className="w-full justify-between items-center group"
            onClick={() => navigate("/orders")}
          >
            <div className="flex items-center">
              <Package className="h-4 w-4 mr-2" />
              Gérer les commandes
            </div>
            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
          </Button>
        </div>
        
        <div className="grid gap-2">
          <Button variant="outline" className="w-full justify-between items-center group hover:bg-gray-100">
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Générer des factures
            </div>
            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
          </Button>
        </div>
        
        <div className="grid gap-2">
          <Button variant="outline" className="w-full justify-between items-center group hover:bg-gray-100">
            <div className="flex items-center">
              <Truck className="h-4 w-4 mr-2" />
              Assigner aux livreurs
            </div>
            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OrdersManagementCard;
