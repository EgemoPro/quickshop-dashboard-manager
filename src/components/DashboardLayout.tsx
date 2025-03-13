
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardHeader from "./dashboard/DashboardHeader";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  if (location.pathname === "/landing") {
    return <>{children}</>;
  }
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-50/90 text-gray-800'}`}>
      <DashboardHeader 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      <main className={`pt-16 ${isMobile ? 'pl-0 pb-20' : 'pl-16'} transition-all duration-300 backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
