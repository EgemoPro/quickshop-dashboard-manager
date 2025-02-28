
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Settings, Moon, Sun, Bell, UserCircle } from "lucide-react";

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
  return (
    <header className={`sticky top-0 z-30 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm px-4 sm:px-6 py-3 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className="sr-only">Ouvrir le menu</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>

        <div className="hidden md:flex items-center space-x-4">
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
          
          <div className="hidden sm:flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <UserCircle className="h-7 w-7" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Alex Dupont</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Vendeur Pro</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
