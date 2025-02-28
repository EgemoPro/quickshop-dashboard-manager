
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Settings } from "lucide-react";

interface WelcomeSectionProps {
  darkMode: boolean;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ darkMode }) => {
  return (
    <section className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Bonjour, Alex Dupont 👋</h1>
          <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Voici les performances de votre boutique</p>
        </div>
        
        <div className="flex mt-4 sm:mt-0 space-x-2 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none">
            <Button variant="outline" className="w-full sm:w-auto">
              <HelpCircle className="h-4 w-4 mr-2" />
              Aide
            </Button>
          </div>
          <div className="flex-1 sm:flex-none">
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default WelcomeSection;
