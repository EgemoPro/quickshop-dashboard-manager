
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useIsMobile } from "./hooks/use-mobile";
import { Home, Package2, ShoppingCart, Settings } from "lucide-react";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const NavigationItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors ${
        isActive
          ? "text-primary bg-primary/10"
          : "text-gray-500 hover:text-primary hover:bg-primary/5"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
};

const Navigation = () => {
  const isMobile = useIsMobile();

  const navigationItems = [
    { to: "/", icon: Home, label: "Accueil" },
    { to: "/products", icon: Package2, label: "Produits" },
    { to: "/orders", icon: ShoppingCart, label: "Commandes" },
    { to: "/settings", icon: Settings, label: "Paramètres" },
  ];

  if (isMobile) {
    return (
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2"
      >
        <nav className="flex justify-around items-center">
          {navigationItems.map((item) => (
            <NavigationItem key={item.to} {...item} />
          ))}
        </nav>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 bottom-0 w-16 bg-white border-r border-gray-200 py-4"
    >
      <nav className="flex flex-col items-center gap-4">
        {navigationItems.map((item) => (
          <NavigationItem key={item.to} {...item} />
        ))}
      </nav>
    </motion.div>
  );
};

const AppContent = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`min-h-screen bg-gray-50 ${isMobile ? "pb-20" : "pl-16"}`}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Navigation />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
