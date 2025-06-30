import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CreditCard, ShoppingCart, BarChart2, DollarSign, Repeat } from 'lucide-react';

export default function Loader() {
  const [progress, setProgress] = useState(0);
  
  // Couleurs modernes
  const colors = {
    primary: "#6d28d9",   // Violet foncé
    secondary: "#8b5cf6", // Violet clair
    accent: "#a78bfa",    // Violet plus clair
    background: "#f5f3ff", // Fond violet très pâle
    success: "#10b981",   // Vert
    warning: "#f59e0b",   // Orange
    info: "#3b82f6"       // Bleu
  };
  
  // Animation de progression automatique
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
    
    return () => clearInterval(timer);
  }, []);
  
  // Variants d'animation pour Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const progressVariants = {
    initial: { width: 0 },
    animate: { 
      width: `${progress}%`,
      transition: { 
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };
  
  const circleVariants = {
    animate: {
      scale: [0.8, 1.1, 0.8],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingIconVariants = {
    animate: (custom) => ({
      y: [0, -8, 0],
      x: custom.x,
      opacity: [0.7, 1, 0.7],
      scale: [0.9, 1, 0.9],
      transition: {
        duration: custom.duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: custom.delay
      }
    })
  };
  
  // Générer les 3 cercles pulsants
  const renderPulsingCircles = () => {
    return [colors.primary, colors.secondary, colors.accent].map((color, index) => (
      <motion.div
        key={index}
        className="rounded-full w-3 h-3"
        style={{ backgroundColor: color }}
        variants={circleVariants}
        animate="animate"
        custom={index}
        transition={{
          delay: index * 0.2
        }}
      />
    ));
  };

  // Génération de mini-graphiques pour le dashboard
  const generateMiniGraph = (color, height = "h-8", width = "w-16") => {
    return (
      <div className={`${width} ${height} flex items-end space-x-1`}>
        {[3, 5, 2, 6, 4, 7, 3].map((value, index) => (
          <motion.div
            key={index}
            className={`w-1 bg-opacity-80 rounded-t`}
            style={{ backgroundColor: color, height: `${value * 10}%` }}
            initial={{ height: 0 }}
            animate={{ height: `${value * 10}%` }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    );
  };
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="w-80 bg-white rounded-xl shadow-lg p-6 flex flex-col space-y-4 relative overflow-hidden"
    >
      {/* Titre et indicateurs */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Traitement des transactions</h3>
        <div className="flex space-x-2">
          {renderPulsingCircles()}
        </div>
      </div>
      
      {/* Barre de progression */}
      <div className="flex items-center space-x-2">
        <div className="text-sm font-medium text-gray-600">{progress}%</div>
        <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: colors.primary }}
            variants={progressVariants}
            initial="initial"
            animate="animate"
          />
        </div>
      </div>
      
      {/* Mini dashboard avec indicateurs */}
      <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
        <div className="flex flex-col items-center">
          <div className="text-xs text-gray-500 mb-1">Ventes</div>
          {generateMiniGraph(colors.success, "h-6", "w-12")}
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xs text-gray-500 mb-1">Achats</div>
          {generateMiniGraph(colors.warning, "h-6", "w-12")}
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xs text-gray-500 mb-1">Transactions</div>
          {generateMiniGraph(colors.info, "h-6", "w-12")}
        </div>
      </div>
      
      {/* Icônes flottantes */}
      <motion.div
        className="absolute"
        style={{ top: '25%', left: '15%' }}
        variants={floatingIconVariants}
        animate="animate"
        custom={{ duration: 3, delay: 0.2, x: [0, 5, 0] }}
      >
        <CreditCard size={16} color={colors.primary} />
      </motion.div>
      
      <motion.div
        className="absolute"
        style={{ top: '50%', right: '20%' }}
        variants={floatingIconVariants}
        animate="animate"
        custom={{ duration: 4, delay: 0.5, x: [0, -5, 0] }}
      >
        <ShoppingCart size={16} color={colors.success} />
      </motion.div>
      
      <motion.div
        className="absolute"
        style={{ bottom: '30%', left: '25%' }}
        variants={floatingIconVariants}
        animate="animate"
        custom={{ duration: 3.5, delay: 1, x: [0, 7, 0] }}
      >
        <TrendingUp size={16} color={colors.info} />
      </motion.div>
      
      <motion.div
        className="absolute"
        style={{ top: '40%', right: '30%' }}
        variants={floatingIconVariants}
        animate="animate"
        custom={{ duration: 3.2, delay: 0.7, x: [0, -7, 0] }}
      >
        <DollarSign size={16} color={colors.warning} />
      </motion.div>
      
      {/* Icône de synchronisation rotative */}
      <div className="flex justify-center">
        <motion.div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: colors.background }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="flex items-center justify-center">
            <Repeat size={20} color={colors.primary} />
          </div>
        </motion.div>
      </div>
      
      {/* Texte d'information */}
      <div className="text-xs text-center text-gray-500">
        Synchronisation des données financières en cours...
      </div>
    </motion.div>
  );
}