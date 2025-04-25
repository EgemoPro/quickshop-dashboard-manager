
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Link, Navigate, useNavigate } from "react-router-dom";
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
  ChartCandlestick,
  LineChart,
  // Target,
  BlocksIcon,
  UserPlus2
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
import Strategy from "./pages/Strategy";

import { cn } from "./lib/utils";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthForm from "@/components/auth/auth-form";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { checkAuth, login, registerUser } from "./store/slices/authSlice";
import FollowersDashboard from "./pages/followers-dashboard";

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
  isMobile?: boolean;
}

const NavigationItem = ({ to, icon: Icon, label, subItems, showLabels, closeAllExpanded, isMobile }: NavigationItemProps) => {
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
          className={`flex items-center justify-between gap-2 p-2 rounded transition-colors w-full ${isActive
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
                className={`flex items-center gap-2 text-xs p-1.5 rounded-md ${location.pathname === subItem.to
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
      className={cn(isMobile ? "justify-center" : "", `flex items-center gap-2 rounded p-2 transition-colors w-full relative ${isActive
        ? `text-primary border-l-4 ${!isMobile ? "border-l-black" : "border-l-0  border-b-4 rounded-none  border-b-black"}`
        : "border-l-4 border-transparent text-gray-500 hover:text-primary hover:bg-primary/5"
        }`)}
    >
      <Icon size={isMobile ? 25 : 19} />
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
    { to: "followers", icon: UserPlus2, label: "Followers" },
    { to: "/chat", icon: MessageCircle, label: "Chat" },
    { to: "/strategy", icon: Store, label: "Stratégie" },
    { to: "/plugins", icon: BlocksIcon, label: "Plugins" },
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
        <nav className={cn("grid grid-cols-5 w-full", isMobile ? "px-2" : "")}>
          {mobileItems.map((item, index) => (
            <NavigationItem
              key={index}
              to={item.to}
              icon={item.icon}
              label={item.label}
              showLabels={false}
              closeAllExpanded={closeAllExpanded}
              isMobile={isMobile}
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

interface UserData {
  email: string;
  password: string;
  fullname?: string;
  type: string;
  [key: string]: string | undefined;
}

const AppContent = () => {

  const { isLoading, user, token } = useAppSelector(state => state.auth)
  const [isAuthenticated, setIsAuthenticated] = useState(true); // 1
  const [userData, setUserData] = useState<UserData>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const isLandingPage = location.pathname === "/landing";
  const isLoginPage = location.pathname === "/login";

  const onSubmit = async (data: UserData, type: string) => {
    console.log(data, type)
    setUserData(prev => ({ ...prev, ...data, type }))
  }

  useEffect(() => {
    setIsAuthenticated(!!(token && user));
  }, [token, user]);

  useEffect(() => {
    if (isAuthenticated && isLoginPage) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!userData) return

    switch (userData?.type) {
      case 'register':
        dispatch(registerUser({ fullname: userData.fullname, email: userData.email, password: userData.password }));
        break;
      default:
        dispatch(login({ email: userData.email, password: userData.password }));
        break;
        console.log("No valid userData type provided");
    }
    console.log(userData);
  }, [userData]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

 
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<AuthForm onSubmit={onSubmit} />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/dashboard" element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}>
            <DashboardLayout>
              <Index />
            </DashboardLayout>
          </ProtectedRoute>}
        />
        <Route path="/products" element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}>
            <DashboardLayout>
              <Products />
            </DashboardLayout>
          </ProtectedRoute>}
        />
        <Route path="/followers" element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}>
            <DashboardLayout>
              <FollowersDashboard />
            </DashboardLayout>
          </ProtectedRoute>}
        />
        <Route path="/orders" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardLayout>
              <Orders />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/planning" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardLayout>
              <ProductPlanning />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/chat" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardLayout>
              <Chat />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/marketing" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardLayout>
              <Marketing />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/plugins" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardLayout>
              <Marketplace />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardLayout>
              <Analytics />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/payments" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardLayout>
              <Payments />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/shipping" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardLayout>
              <Shipping />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/strategy" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardLayout>
              <Strategy />
            </DashboardLayout>
          </ProtectedRoute>
        } />
      </Routes>
      {!isLandingPage && isAuthenticated ? <Navigation /> : null}
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
