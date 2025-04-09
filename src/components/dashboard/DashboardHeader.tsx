
import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Bell, UserCircle, Menu, Settings, LogOut, HelpCircle } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  darkMode, 
  toggleDarkMode, 
  mobileMenuOpen, 
  setMobileMenuOpen 
}) => {
  const {
    isLoading,
    user
  } = useAppSelector(state => state.auth);

  return (
    <header className={`fixed z-20 w-full top-0 left-0 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-sm px-4 sm:px-6 py-3 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className="sr-only">Ouvrir le menu</span>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="hidden md:flex items-center ml-16 space-x-4">
          <h1 className="text-xl font-bold">QuickShop Dashboard</h1>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="relative">
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          
          <div className="hidden sm:flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 px-3 py-2 -mr-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <UserCircle className="h-7 w-7" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{user?.fullName}</p>
                    {user.storeInfo?.verified && <p className="text-xs text-gray-500 dark:text-gray-400">Vendeur Pro</p>}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center cursor-pointer">
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center cursor-pointer">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Aide</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
