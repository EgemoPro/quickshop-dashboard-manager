
import React from "react";
import { BarChart, LineChart, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { Badge } from "@/components/ui/badge";

const AnalyticsCard = () => {
  const { topSellingProducts, customerRetentionRate, conversionRate } = useAppSelector(
    (state) => state.stats
  );

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <BarChart className="h-6 w-6 text-gray-500" />
        <h2 className="text-xl font-semibold">Analyse & Rapports</h2>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Produits phares</p>
          <Badge variant="outline">{topSellingProducts.length}</Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Taux de fidélisation</p>
          <Badge variant={parseFloat(customerRetentionRate) > 60 ? "success" : "warning"}>
            {customerRetentionRate}
          </Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Taux de conversion</p>
          <Badge variant={parseFloat(conversionRate) > 2 ? "success" : "warning"}>
            {conversionRate}
          </Badge>
        </div>
        
        <div className="grid gap-2 pt-4">
          <Button variant="outline" className="w-full justify-start">
            <BarChart className="h-4 w-4 mr-2" />
            Tendances de ventes
          </Button>
        </div>
        
        <div className="grid gap-2">
          <Button variant="outline" className="w-full justify-start">
            <Users className="h-4 w-4 mr-2" />
            Comportement clients
          </Button>
        </div>
        
        <div className="grid gap-2">
          <Button variant="outline" className="w-full justify-start">
            <LineChart className="h-4 w-4 mr-2" />
            Télécharger rapports
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AnalyticsCard;
