
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { useCurrency } from "@/hooks/use-currency";
import { formatCurrency } from "@/lib/format-numbers";

interface StatsCardProps {
  title: string;
  value: string;
  growth: string;
  icon: React.ReactNode;
  darkMode: boolean;
  isCurrency?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  growth, 
  icon, 
  darkMode,
  isCurrency = false
}) => {
  const { formatCurrency } = useCurrency();
  
  // Formater la valeur si elle est une devise
  const displayValue = isCurrency ? formatCurrency(value) : value;
  
  return (
    <Card className={`border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-colors duration-300 h-full`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</CardTitle>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-baseline">
          <div className="text-2xl font-bold">{displayValue}</div>
          <div className="flex items-center text-green-500">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{growth}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">vs mois précédent</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
