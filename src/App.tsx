
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
  Calendar, 
  BarChart3, 
  MousePointerClick, 
  DollarSign,
  Truck,
  Store,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useState } from "react";
import DashboardHeader from "./components/dashboard/DashboardHeader";
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
}

interface NavigationItemProps {
  to?: string;
  icon: any;
  label: string;
  subItems?: SubNavigationItem[];
}

const NavigationItem = ({ to, icon: Icon, label, subItems }: NavigationItemProps) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Check if this item or any of its subitems is active
  const isActive = to 
    ? location.pathname === to 
    : subItems?.some(item => location.pathname === item.to);
  
  // If this is a dropdown (has subItems)
  if (subItems && subItems.length > 0) {
    return (
      <div className="w-full">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center justify-between gap-1 p-2 rounded-lg transition-colors w-full ${
            isActive
              ? "text-primary bg-primary/10"
              : "text-gray-500 hover:text-primary hover:bg-primary/5"
          }`}
        >
          <div className="flex items-center">
            <Icon className="h-8 w-5 p-.5" />
            {/* <span className="text-xs font-medium">{label}</span> */}
          </div>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        
        {isExpanded && (
          <div className="pl-7 mt-1 space-y-1">
            {subItems.map((subItem) => (
              <Link
                key={subItem.to}
                to={subItem.to}
                className={`block text-xs p-1.5 rounded-md ${
                  location.pathname === subItem.to
                    ? "text-primary bg-primary/10"
                    : "text-gray-500 hover:text-primary hover:bg-primary/5"
                }`}
              >
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
      className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors w-full ${
        isActive
          ? "text-primary bg-primary/10"
          : "text-gray-500 hover:text-primary hover:bg-primary/5"
      }`}
    >
      <Icon className="h-8 w-5 p-.5" />
      {/* <span className="text-xs font-medium">{label}</span> */}
    </Link>
  );
};

const Navigation = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  if (location.pathname === "/landing") {
    return null;
  }

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
        { to: "/planning", label: "Planning" },
        { to: "/marketing", label: "Marketing" },
      ]
    },
    { to: "/analytics", icon: BarChart3, label: "Analytique" },
    // Combined Payments and Shipping under "Opérations"
    {
      icon: Truck,
      label: "Opérations",
      subItems: [
        { to: "/payments", label: "Paiements" },
        { to: "/shipping", label: "Expéditions" }
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
            <NavigationItem key={index} to={item.to} icon={item.icon} label={item.label} />
          ))}
        </nav>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 bottom-0 w-16 bg-white border-r border-gray-200 py-4 shadow-lg z-10 overflow-y-auto"
    >
      <nav className="flex flex-col items-center gap-2 p-1">
        {navigationItems.map((item, index) => (
          <NavigationItem 
            key={index} 
            to={item.to} 
            icon={item.icon} 
            label={item.label} 
            subItems={item.subItems}
          />
        ))}
      </nav>
    </motion.div>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  if (location.pathname === "/landing") {
    return <>{children}</>;
  }
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <DashboardHeader 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
};

const AppContent = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const isLandingPage = location.pathname === "/landing";
  const contentClass = isLandingPage 
    ? "min-h-screen bg-white" 
    : `min-h-screen bg-gray-50 ${isMobile ? "pb-20" : "pl-16 md:pl-52"} transition-all duration-300`;
  
  return (
    <div className={contentClass}>
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
