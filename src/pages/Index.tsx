
import  { useMemo } from "react";
import { motion } from "framer-motion";
import { Provider } from "react-redux";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DollarSign, Users, ShoppingCart, TrendingUp, Undo2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { store } from "@/store/store";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { resetLayout, DASHBOARD_CARDS } from "@/store/slices/dashboardLayoutSlice";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import StatsCard from "@/components/dashboard/StatsCard";
import SalesChart from "@/components/dashboard/SalesChart";
import RecentOrders from "@/components/dashboard/RecentOrders";
import ProductPerformance from "@/components/dashboard/ProductPerformance";
import LowStockProducts from "@/components/dashboard/LowStockProducts";
import RecentMessages from "@/components/dashboard/RecentMessages";
import ModuleSystem from "@/components/dashboard/ModuleSystem";
import UserProfile from "@/components/dashboard/UserProfile";
import DraggableCard from "@/components/dashboard/DraggableCard";

const DashboardContent = () => {
  const stats = useAppSelector(state => state.stats);
  const { cardPositions } = useAppSelector(state => state.dashboardLayout);
  const dispatch = useAppDispatch();
  
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

  // Organize cards by column
  const columnCards = useMemo(() => {
    const columns: { [key: number]: { id: string, order: number }[] } = {};
    
    cardPositions.forEach(card => {
      if (!columns[card.column]) {
        columns[card.column] = [];
      }
      columns[card.column].push({ id: card.id, order: card.order });
    });
    
    // Sort cards within each column by order
    Object.keys(columns).forEach(column => {
      columns[Number(column)].sort((a, b) => a.order - b.order);
    });
    
    return columns;
  }, [cardPositions]);

  // Render a specific card by ID
  const renderCard = (cardId: string, index: number, column: number) => {
    switch (cardId) {
      case DASHBOARD_CARDS.WELCOME:
        return (
          // <DraggableCard key={cardId} id={cardId} index={index} column={column}>
            <WelcomeSection darkMode={false} />
          // </DraggableCard> 
        );
      case DASHBOARD_CARDS.SALES_CHART:
        return (
          <DraggableCard key={cardId} id={cardId} index={index} column={column}>
            <SalesChart darkMode={false} />
          </DraggableCard>
        );
      case DASHBOARD_CARDS.RECENT_ORDERS:
        return (
          <DraggableCard key={cardId} id={cardId} index={index} column={column}>
            <RecentOrders darkMode={false} />
          </DraggableCard>
        );
      case DASHBOARD_CARDS.USER_PROFILE:
        return (
          <DraggableCard key={cardId} id={cardId} index={index} column={column}>
            <UserProfile darkMode={false} />
          </DraggableCard>
        );
      case DASHBOARD_CARDS.PRODUCT_PERFORMANCE:
        return (
          <DraggableCard key={cardId} id={cardId} index={index} column={column}>
            <ProductPerformance darkMode={false} />
          </DraggableCard>
        );
      case DASHBOARD_CARDS.LOW_STOCK:
        return (
          <DraggableCard key={cardId} id={cardId} index={index} column={column}>
            <LowStockProducts darkMode={false} />
          </DraggableCard>
        );
      case DASHBOARD_CARDS.MODULE_SYSTEM:
        return (
          <DraggableCard key={cardId} id={cardId} index={index} column={column}>
            <ModuleSystem darkMode={false} />
          </DraggableCard>
        );
      case DASHBOARD_CARDS.RECENT_MESSAGES:
        return (
          <DraggableCard key={cardId} id={cardId} index={index} column={column}>
            <RecentMessages darkMode={false} />
          </DraggableCard>
        );
      default:
        return null;
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <>
        {/* Stats Cards */}
        <section className="mb-8 grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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

        {/* Reset Layout Button */}
        <div className="flex justify-end mb-4 space-x-2">
        <Button 
            variant="outline" 
            size="sm" 
            onClick={() => dispatch(resetLayout())}
            className="flex items-center gap-1"
          >
            <Undo2 className="h-4 w-4" />
            {/* Réinitialiser disposition avec une popover */}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => dispatch(resetLayout())}
            className="flex items-center gap-1"
          >
            <MoreHorizontal className="h-4 w-4" />
            {/* Réinitialiser disposition avec une popover */}
          </Button>
        </div>

        {/* Main Dashboard Content - Draggable Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts (Column 0) */}
          <div className="lg:col-span-2 space-y-0">
            {columnCards[0]?.map((card, index) => 
              renderCard(card.id, index, 0)
            )}
          </div>

          {/* Right Column - Sidebar Modules (Column 1) */}
          <div className="space-y-0">
            {columnCards[1]?.map((card, index) => 
              renderCard(card.id, index, 1)
            )}
          </div>
        </div>
      </>
    </DndProvider>
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
