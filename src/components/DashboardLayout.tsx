
import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import DashboardHeader from "./dashboard/DashboardHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { productsApiRequestHandler } from "@/store/slices/productsSlice";
import { useAppDispatch } from "@/store/hooks";
// import { productsApiRequestHandlerType } from "@/types/productSlicesTypes";
import Navigation from "./Navigation";
import { ScrollArea } from "./ui/scroll-area";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch()

  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    dispatch(productsApiRequestHandler({
      limit: 10,
      page: 1
    }))

  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`max-h-screen flex transition-colors duration-300 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-50/90 text-gray-800'}`}>
      <Navigation />
      <main className={` flex flex-row flex-wrap  w-full h-  ${isMobile ? 'pl-0 pb-20 w-full' : ''} transition-all duration-300 backdrop-blur-sm`}>
        <DashboardHeader
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <div className="flex w-full h-full -mt-16 -z-10" >
          <ScrollArea className="h-screen w-full sm:px-6 pt-10 ">
            <div className="mt-10 h-full w-full">
            {children}
            </div>
          </ScrollArea>
              

        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
