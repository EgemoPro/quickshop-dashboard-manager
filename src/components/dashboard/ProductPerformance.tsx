
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";
import ProductPerformanceChart from "./ProductPerformanceChart";
import { selectProductPerformance } from "@/store/slices/productsSlice";

interface ProductPerformanceProps {
  darkMode: boolean;
}

const ProductPerformance: React.FC<ProductPerformanceProps> = ({ darkMode }) => {
  const chartData = useAppSelector(selectProductPerformance);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <Card className={`border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-colors duration-300`}>
        <CardHeader>
          <CardTitle>Performance des catégories</CardTitle>
          <CardDescription className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
            Répartition des ventes par catégorie
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ProductPerformanceChart darkMode={darkMode} data={chartData} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductPerformance;
