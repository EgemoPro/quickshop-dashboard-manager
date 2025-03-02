
import React from "react";
import { motion } from "framer-motion";
import { Provider } from "react-redux";
import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react";
import { store } from "@/store/store";
import { useAppSelector } from "@/store/hooks";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import StatsCard from "@/components/dashboard/StatsCard";
import SalesChart from "@/components/dashboard/SalesChart";
import RecentOrders from "@/components/dashboard/RecentOrders";
import ProductPerformance from "@/components/dashboard/ProductPerformance";
import LowStockProducts from "@/components/dashboard/LowStockProducts";
import RecentMessages from "@/components/dashboard/RecentMessages";
import ModuleSystem from "@/components/dashboard/ModuleSystem";

const DashboardContent = () => {
  const stats = useAppSelector(state => state.stats);
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <>
      {/* Welcome Section */}
      <WelcomeSection darkMode={false} />

      {/* Stats Cards */}
      <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <motion.div 
          custom={0}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <StatsCard 
            title="Ventes Totales" 
            value={stats.totalSales} 
            growth={stats.salesGrowth} 
            icon={<DollarSign className="h-5 w-5 text-blue-500" />}
            darkMode={false}
            isCurrency={true}
          />
        </motion.div>

        <motion.div 
          custom={1}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <StatsCard 
            title="Nouveaux Clients" 
            value={stats.newCustomers} 
            growth={stats.customerGrowth} 
            icon={<Users className="h-5 w-5 text-purple-500" />}
            darkMode={false}
          />
        </motion.div>

        <motion.div 
          custom={2}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <StatsCard 
            title="Commandes en attente" 
            value={stats.pendingOrders} 
            growth={stats.orderGrowth} 
            icon={<ShoppingCart className="h-5 w-5 text-orange-500" />}
            darkMode={false}
          />
        </motion.div>

        <motion.div 
          custom={3}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <StatsCard 
            title="Valeur moyenne" 
            value={stats.avgOrderValue} 
            growth={stats.valueGrowth} 
            icon={<TrendingUp className="h-5 w-5 text-green-500" />}
            darkMode={false}
            isCurrency={true}
          />
        </motion.div>
      </section>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sales Chart */}
          <SalesChart darkMode={false} />

          {/* Orders Section */}
          <RecentOrders darkMode={false} />
        </div>

        {/* Right Column - Sidebar Modules */}
        <div className="space-y-6">
          {/* Product Performance */}
          <ProductPerformance darkMode={false} />

          {/* Low Stock Alert */}
          <LowStockProducts darkMode={false} />

          {/* Module System - NEW */}
          <ModuleSystem darkMode={false} />

          {/* Recent Messages */}
          <RecentMessages darkMode={false} />
        </div>
      </div>
    </>
  );
};

const Dashboard = () => {
  return (
    <Provider store={store}>
      <DashboardContent />
    </Provider>
  );
};

export default Dashboard;
