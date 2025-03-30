
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { User } from "lucide-react";
import { motion } from "framer-motion";
import { useAppSelector } from "@/store/hooks";

interface WelcomeSectionProps {
  darkMode: boolean;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ darkMode }) => {
  const {user} = useAppSelector(state => state.auth);
  const orderLength = useAppSelector(state => state.orders.recentOrders.reduce((acc, order) => order.status === 'En attente' ? acc + 1 : acc, 0));
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(currentDate);
  
  const getTimeOfDay = () => {
    const hour = currentDate.getHours();
    if (hour < 12) return "Bonjour";
    if (hour < 18) return "Bon après-midi";
    return "Bonsoir";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-colors duration-300`}>
        <CardHeader className="flex flex-row items-center space-x-4 space-y-0">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User className={`w-7 h-7 ${darkMode ? 'text-white' : 'text-primary'}`} />
          </div>
          <div>
            <CardTitle>{getTimeOfDay()}, {user.fullName}</CardTitle>
            <CardDescription className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              {formattedDate}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Bienvenue dans votre tableau de bord. Vous avez <span className="font-bold text-primary">3 tâches</span> à accomplir aujourd'hui et <span className="font-bold text-primary">{orderLength} commandes</span> en attente.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WelcomeSection;
