
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/store/hooks";
import { useCurrency } from "@/hooks/use-currency";

interface RecentOrdersProps {
  darkMode: boolean;
}

const RecentOrders: React.FC<RecentOrdersProps> = ({ darkMode }) => {
  const { recentOrders } = useAppSelector(state => state.orders);
  const { formatCurrency } = useCurrency();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <Card className={`border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-colors duration-300`}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Commandes récentes</CardTitle>
              <CardDescription className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                {recentOrders.length} commandes récentes
              </CardDescription>
            </div>
            <Button size="sm" variant="outline">
              Voir toutes
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[320px] pr-4">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div 
                  key={order.id}
                  className={`p-4 rounded-lg border ${
                    darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'
                  } transition-colors duration-200`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">{order.id}</span>
                        <span className={`mx-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          • {order.date}
                        </span>
                      </div>
                      <div className="mt-1 text-sm">{order.customer}</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                        {order.products} produit{order.products > 1 ? 's' : ''}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <Badge 
                        variant={
                          order.status === "Livrée" ? "default" :
                          order.status === "En cours" ? "secondary" :
                          order.status === "En attente" ? "outline" : "destructive"
                        }
                        className="justify-center sm:justify-start"
                      >
                        {order.status}
                      </Badge>
                      <span className="font-medium text-right sm:text-left">{formatCurrency(order.amount)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentOrders;
