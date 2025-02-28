
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";

interface ProductPerformanceProps {
  darkMode: boolean;
}

const ProductPerformance: React.FC<ProductPerformanceProps> = ({ darkMode }) => {
  const { productPerformance } = useAppSelector(state => state.products);

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
          <div className="h-[200px] w-full">
            {/* Recharts Pie Chart sera inséré ici */}
            <div className="w-full h-full rounded-lg bg-gradient-to-b from-purple-100 to-purple-50 dark:from-purple-900/20 dark:to-gray-800 flex items-center justify-center p-4">
              <div className="text-center">
                <div className="h-16 w-16 mx-auto mb-2 rounded-full border-8 border-purple-200 dark:border-purple-800/30 border-t-purple-500 animate-spin" />
                <p className="text-sm text-gray-600 dark:text-gray-300">Graphique de répartition des catégories</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductPerformance;
