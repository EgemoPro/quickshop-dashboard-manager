
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useIsMobile } from "./hooks/use-mobile";
import { Home, Package2, ShoppingCart, Settings as SettingsIcon, MessageCircle, Calendar } from "lucide-react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import Chat from "./pages/Chat";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import ProductPlanning from "./pages/ProductPlanning";

const queryClient = new QueryClient();

const NavigationItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors w-full ${
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
  const location = useLocation();
  
  if (location.pathname === "/landing") {
    return null;
  }

  const navigationItems = [
    { to: "/dashboard", icon: Home, label: "Accueil" },
    { to: "/products", icon: Package2, label: "Produits" },
    { to: "/orders", icon: ShoppingCart, label: "Commandes" },
    { to: "/planning", icon: Calendar, label: "Planning" },
    { to: "/settings", icon: SettingsIcon, label: "Paramètres" },
  ];

  const mobileNavigationItems = [
    ...navigationItems.slice(0, 4),
    { to: "/chat", icon: MessageCircle, label: "Chat" },
  ];

  if (isMobile) {
    return (
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10"
      >
        <nav className="grid grid-cols-5 w-full">
          {mobileNavigationItems.map((item) => (
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
      className="fixed left-0 top-0 bottom-0 w-16 bg-white border-r border-gray-200 py-4 shadow-lg z-10"
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
  const location = useLocation();
  
  const isLandingPage = location.pathname === "/landing";
  const contentClass = isLandingPage 
    ? "min-h-screen bg-white" 
    : `min-h-screen bg-gray-50 ${isMobile ? "pb-20" : "pl-16"} transition-all duration-300`;
  
  return (
    <div className={contentClass}>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="/dashboard" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/planning" element={<ProductPlanning />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Navigation />
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
