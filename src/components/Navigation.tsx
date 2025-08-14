import {
  Home,
  Package2,
  ShoppingCart,
  Settings as SettingsIcon,
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
  // Target,
  BlocksIcon,
  SquareChevronRight,
  MessageSquareDot,
  Users2,
  UserPlus2,
  DownloadIcon,
  PackagePlus,
  Megaphone,
  Waypoints,
  LinkIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavigationItemProps} from "../types/navigationTypes"



// Refactored navigation items with combined pages where appropriate
export const navigationItems = [
  { to: "/dashboard", icon: Home, label: "Accueil" },
  { to: "/products", icon: PackagePlus, label: "Produits" },
  { to: "/orders", icon: ShoppingCart, label: "Commandes" },
  // Combined Planning and Marketing under "Campagnes"
  {
    icon: Megaphone,
    label: "Campagnes",
    subItems: [
      { to: "/planning", label: "Planning", icon: Calendar },
      { to: "/marketing", label: "Marketing", icon: ChartCandlestick },
    ]
  },
  // Combined Payments and Shipping under "Opérations"
  {
    icon: Truck,
    label: "Opérations",
    subItems: [
      { to: "/shipping", label: "Expéditions", icon: Send },
      { to: "/payments", label: "Paiements", icon: Wallet },
    ]
  },
  {
    icon: Users2,
    label: "Clients",
    subItems: [
      { to: "/followers", icon: UserPlus2, label: "Followers" },
      { to: "/chat", icon: MessageSquareDot, label: "Chat" },
      // { to: "/shipping", label: "Expéditions", icon: Send },
      // { to: "/payments", label: "Paiements", icon: Wallet },
    ]
  },
  {
    icon: BlocksIcon,
    label: "Plugins",
    subItems: [
      { to: "/plugins", icon: DownloadIcon, label: "Store" },
      { to: "/analytics", icon: BarChart3, label: "Analytique" },
      // { to: "/shipping", label: "Expéditions", icon: Send },
      // { to: "/payments", label: "Paiements", icon: Wallet },
    ]
  },
  {
    label: "Tunnel de vente",
    icon: Waypoints,
    subItems: [
      { to: "/strategy", icon: Store, label: "Stratégie" },
      { to: "/sell-link", icon: LinkIcon, label: "Stratégie" },
    ]
  },
  { to: "/settings", icon: SettingsIcon, label: "Paramètres" },
];

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
      <div className="w-full duration-150" ref={navItemRef}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center justify-between gap-2 p-2 rounded transition-colors w-full ${isActive
            ? "text-primary border-l-4 border-l-black"
            : "border-l-4 border-transparent hover:bg-primary/5"
            }`}
        >
          <div className="flex items-center justify-center gap-2">
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



const Navigation = ({isExpanded, setIsExpanded}) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (location.pathname === "/landing") {
    return null;
  }


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
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-sm z-10"
      >
        <nav className={cn("grid grid-cols-5 w-full", isMobile ? "px-2" : "")}>
          {mobileItems.map((item, index) => (
            <NavigationItem
              key={index}
              to={item.to}
              icon={item.icon}
              label={item.label}
              showLabels={false}
              closeAllExpanded={handleToggleExpand}
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
      className={`h-screen left-0 top-0 bottom-0  ${isExpanded ? "w-60" :"w-16" } bg-white border-r border-gray-200 shadow-sm overflow-hidden transition-all duration-300`}
      ref={navRef}
    >
      <nav className="relative flex flex-col p-1.5 pr-1 gap-1">
        {/* logo avec un h-16 w-16 */}
        {navigationItems.map((item, index) => (
          <NavigationItem
            key={index}
            to={item.to}
            icon={item.icon}
            label={item.label}
            subItems={item.subItems}
            showLabels={isExpanded}
            closeAllExpanded={handleToggleExpand}
          />
        ))}
      </nav>
    </motion.div>
  );
};


export default Navigation;