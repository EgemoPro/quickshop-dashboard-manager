
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  Truck,
  MessageSquare,
  Calendar,
  Store,
  Target,
  Zap
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';

const navigationItems = [
  { title: 'Tableau de bord', url: '/', icon: Home },
  { title: 'Produits', url: '/products', icon: Package },
  { title: 'Commandes', url: '/orders', icon: ShoppingCart },
  { title: 'Abonnés', url: '/followers-dashboard', icon: Users },
  { title: 'Analytics', url: '/analytics', icon: BarChart3 },
  { title: 'Marketing', url: '/marketing', icon: Zap },
  { title: 'Paiements', url: '/payments', icon: CreditCard },
  { title: 'Expédition', url: '/shipping', icon: Truck },
  { title: 'Messages', url: '/chat', icon: MessageSquare },
  { title: 'Planning', url: '/planning', icon: Calendar },
  { title: 'Marketplace', url: '/marketplace', icon: Store },
  { title: 'Stratégie', url: '/strategy', icon: Target },
  { title: 'Paramètres', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(path);
  };

  const getNavClassName = (path: string) => {
    return isActive(path) 
      ? "bg-blue-100 text-blue-700 font-medium dark:bg-blue-900 dark:text-blue-300" 
      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100";
  };

  return (
    <Sidebar className="border-r border-gray-200 dark:border-gray-800">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Store className="h-5 w-5 text-white" />
          </div>
          {state === "expanded" && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Shadow Dashboard
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Gestion de boutique
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${getNavClassName(item.url)}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {state === "expanded" && (
                        <span className="text-sm font-medium truncate">
                          {item.title}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
