
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store/store";
import { useState, useEffect } from "react";
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
import FollowersDashboard from "./pages/followers-dashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import AuthForm from "@/components/auth/auth-form";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { checkAuth, login, registerUser } from "./store/slices/authSlice";
import Loader from "./components/ModernLoaderCard";

const queryClient = new QueryClient();

interface UserData {
  email: string;
  password: string;
  fullname?: string;
  type: string;
  [key: string]: string | undefined;
}

const AppContent = () => {

  const { isLoading, user, token } = useAppSelector(state => state.auth)
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [userData, setUserData] = useState<UserData>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  const onSubmit = async (data: UserData, type: string) => {
    console.log(data, type)
    setUserData(prev => ({ ...prev, ...data, type }))
  }

  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch])

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
        // console.log("No valid userData type provided");
    }
    console.log(userData);
  }, [userData]);

  console.log("isAuthenticated", isAuthenticated);
  console.log("token", token);
  console.log("user", user);
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen w-full">
      <Loader />
    </div>;
  }

 
  return (
    <div className="min-h-screen">
      <div>

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
      </div>
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
