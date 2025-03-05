
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useIsMobile } from "./hooks/use-mobile";
import { 
  Home, 
  Package2, 
  ShoppingCart, 
  Settings as SettingsIcon, 
  MessageCircle, 
  Send, 
  BarChart3, 
  MousePointerClick, 
  Wallet,
  Truck,
  Store,
  ChevronDown,
  ChevronUp,
  Calendar,
  ChartCandlestick
} from "lucide-react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useState, useEffect, useRef } from "react";
import DashboardLayout from "./components/DashboardLayout";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import Chat from "./pages/Chat";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import ProductPlanning from "./pages/ProductPlanning";
import Marketing from "./pages/Marketing";
import Marketplace from "./pages/Marketplace";
import Analytics from "./pages/Analytics";
import Payments from "./pages/Payments";
import Shipping from "./pages/Shipping";

const queryClient = new QueryClient();

interface SubNavigationItem {
  to: string;
  label: string;
  icon: React.ElementType;
}

interface NavigationItemProps {
  to?: string;
  icon: React.ElementType;
  label: string;
  subItems?: SubNavigationItem[];
  showLabels: boolean;
  closeAllExpanded: () => void;
}

const NavigationItem = ({ to, icon: Icon, label, subItems, showLabels, closeAllExpanded }: NavigationItemProps) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const navItemRef = useRef<HTMLDivElement>(null);
  
  // Check if this item or any of its subitems is active
  const isActive = to 
    ? location.pathname === to 
    : subItems?.some(item => location.pathname === item.to);
  
  useEffect(() => {
    // Reset when closeAllExpanded is called
    if (!showLabels) {
      setIsExpanded(false);
    }
  }, [showLabels]);

  // If this is a dropdown (has subItems)
  if (subItems && subItems.length > 0) {
    return (
      <div className="w-full" ref={navItemRef}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center justify-between gap-2 p-2 rounded-sm transition-colors w-full ${
            isActive
              ? "text-primary border-l-4 border-l-black"
              : "border-l-4 border-transparent hover:bg-primary/5"
          }`}
        >
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 block" />
            {showLabels && (
              <motion.span 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm font-medium whitespace-nowrap"
              >
                {label}
              </motion.span>
            )}
          </div>
          {showLabels && (
            isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )
          )}
        </button>
        
        {isExpanded && showLabels && (
          <div className="pl-7 mt-1 space-y-1">
            {subItems.map((subItem) => (
              <Link
                key={subItem.to}
                to={subItem.to}
                className={`flex items-center gap-2 text-xs p-1.5 rounded-md ${
                  location.pathname === subItem.to
                    ? "text-primary bg-primary/10"
                    : "text-gray-500 hover:text-primary hover:bg-primary/5"
                }`}
              >
                <subItem.icon className="h-4 w-4" />
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  // Regular navigation item (no subItems)
  return (
    <Link
      to={to || "#"}
      className={`flex items-center gap-2 rounded p-2 transition-colors w-full relative ${
        isActive
          ? "text-primary border-l-4 border-l-black"
          : "border-l-4 border-transparent text-gray-500 hover:text-primary hover:bg-primary/5"
      }`}
    >
      <Icon className="h-5 w-5" />
      {showLabels && (
        <motion.span 
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm font-medium whitespace-nowrap"
        >
          {label}
        </motion.span>
      )}
    </Link>
  );
};

const Navigation = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  
  const closeAllExpanded = () => {
    setIsExpanded(false);
  };
  
  if (location.pathname === "/landing") {
    return null;
  }

  // Handle mouse leave event to close submenus
  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  // Refactored navigation items with combined pages where appropriate
  const navigationItems = [
    { to: "/dashboard", icon: Home, label: "Accueil" },
    { to: "/products", icon: Package2, label: "Produits" },
    { to: "/orders", icon: ShoppingCart, label: "Commandes" },
    // Combined Planning and Marketing under "Campagnes"
    { 
      icon: MousePointerClick, 
      label: "Campagnes",
      subItems: [
        { to: "/planning", label: "Planning", icon: Calendar },
        { to: "/marketing", label: "Marketing", icon: ChartCandlestick },
      ]
    },
    { to: "/analytics", icon: BarChart3, label: "Analytique" },
    // Combined Payments and Shipping under "Opérations"
    {
      icon: Truck,
      label: "Opérations",
      subItems: [
        { to: "/payments", label: "Paiements", icon: Wallet },
        { to: "/shipping", label: "Expéditions", icon: Send }
      ]
    },
    { to: "/chat", icon: MessageCircle, label: "Chat" },
    { to: "/marketplace", icon: Store, label: "Marketplace" },
    { to: "/settings", icon: SettingsIcon, label: "Paramètres" },
  ];

  if (isMobile) {
    // For mobile, we show only the main items (first 5) without submenus
    // We'll use the first destination of subitems for combined items
    const mobileItems = navigationItems.slice(0, 5).map(item => ({
      to: item.to || (item.subItems && item.subItems.length > 0 ? item.subItems[0].to : "#"),
      icon: item.icon,
      label: item.label
    }));

    return (
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10"
      >
        <nav className="grid grid-cols-5 w-full">
          {mobileItems.map((item, index) => (
            <NavigationItem 
              key={index} 
              to={item.to} 
              icon={item.icon} 
              label={item.label}
              showLabels={false}
              closeAllExpanded={closeAllExpanded}
            />
          ))}
        </nav>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 bottom-0 w-16 hover:w-64 bg-white border-r border-gray-200 pt-16 shadow-lg z-10 overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={handleMouseLeave}
      ref={navRef}
    >
      <nav className="flex flex-col p-1 gap-1 mt-4">
        {navigationItems.map((item, index) => (
          <NavigationItem 
            key={index} 
            to={item.to} 
            icon={item.icon} 
            label={item.label} 
            subItems={item.subItems}
            showLabels={isExpanded}
            closeAllExpanded={closeAllExpanded}
          />
        ))}
      </nav>
    </motion.div>
  );
};

const AppContent = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const isLandingPage = location.pathname === "/landing";
  
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="/dashboard" element={<DashboardLayout><Index /></DashboardLayout>} />
        <Route path="/products" element={<DashboardLayout><Products /></DashboardLayout>} />
        <Route path="/orders" element={<DashboardLayout><Orders /></DashboardLayout>} />
        <Route path="/planning" element={<DashboardLayout><ProductPlanning /></DashboardLayout>} />
        <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
        <Route path="/chat" element={<DashboardLayout><Chat /></DashboardLayout>} />
        <Route path="/marketing" element={<DashboardLayout><Marketing /></DashboardLayout>} />
        <Route path="/marketplace" element={<DashboardLayout><Marketplace /></DashboardLayout>} />
        <Route path="/analytics" element={<DashboardLayout><Analytics /></DashboardLayout>} />
        <Route path="/payments" element={<DashboardLayout><Payments /></DashboardLayout>} />
        <Route path="/shipping" element={<DashboardLayout><Shipping /></DashboardLayout>} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isLandingPage && <Navigation />}
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
