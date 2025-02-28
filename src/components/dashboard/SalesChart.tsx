
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setPeriod } from "@/store/slices/salesSlice";

interface SalesChartProps {
  darkMode: boolean;
}

const SalesChart: React.FC<SalesChartProps> = ({ darkMode }) => {
  const dispatch = useAppDispatch();
  const { period } = useAppSelector(state => state.sales);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <Card className={`border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-colors duration-300`}>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
            <div>
              <CardTitle>Évolution des ventes</CardTitle>
              <CardDescription className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                Vue d'ensemble des performances de vente
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant={period === "week" ? "default" : "outline"}
                onClick={() => dispatch(setPeriod("week"))}
              >
                Semaine
              </Button>
              <Button 
                size="sm" 
                variant={period === "month" ? "default" : "outline"}
                onClick={() => dispatch(setPeriod("month"))}
              >
                Mois
              </Button>
              <Button 
                size="sm" 
                variant={period === "year" ? "default" : "outline"}
                onClick={() => dispatch(setPeriod("year"))}
              >
                Année
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {/* Recharts Line Chart sera inséré ici */}
            <div className="w-full h-full rounded-lg bg-gradient-to-b from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-gray-800 flex items-center justify-center p-4">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-blue-500 dark:text-blue-400" />
                <p className="text-sm text-gray-600 dark:text-gray-300">Graphique d'évolution des ventes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SalesChart;
