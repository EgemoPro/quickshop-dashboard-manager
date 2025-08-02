import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Bell, UserCircle, Menu, LogOut, HelpCircle, PanelRight, PanelLeft } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import SearchInputModal from "../SearchDialog";
import { cn } from "@/lib/utils";
// import { is } from "date-fns/locale";


interface DashboardHeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  darkMode,
  toggleDarkMode,
  mobileMenuOpen,
  setMobileMenuOpen,
  isExpanded,
  setIsExpanded
}) => {
  const {
    isLoading,
    user
  } = useAppSelector(state => state.auth);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchModalRef = useRef<HTMLDialogElement>(null);
  const isMobile = useIsMobile()

  useEffect(() => {
    // Any side effects or initializations can be done here
    const handleKeyDown = (event: KeyboardEvent) => {
      // console.log(event.key)
      if (event.key === "/") {
        setIsSearchOpen(true);
      }
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLogout = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      try {
        dispatch(logout());
        navigate("/", { replace: true });
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
      }
    }
  }


  return (
    <header className={`w-full h-14  ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-sm px-2 sm:px-3 py-2 transition-colors duration-300`}>
      {!isMobile &&
        <Button className="absolute" onClick={() => setIsExpanded(!isExpanded)} variant="secondary"  >
          <PanelLeft className={`transform ${isExpanded ? "rotate-180" : ""} duration-150`} />
        </Button>
      }
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className="sr-only">Ouvrir le menu</span>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {!isMobile && <div className={cn("hidden md:flex  items-center justify-between",isExpanded ? "ml-10" : "")}>
          <SearchInputModal ref={searchModalRef} onOpen={isSearchOpen} />
        </div>}

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
                {/* <DropdownMenuItem className="flex items-center cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem> */}
                <DropdownMenuItem className="flex items-center cursor-pointer">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Aide</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600 cursor-pointer">
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
