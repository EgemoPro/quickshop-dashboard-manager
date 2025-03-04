
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DashboardCardPosition {
  id: string;
  order: number;
  column: number;
}

// Define card IDs for each component
export const DASHBOARD_CARDS = {
  WELCOME: "welcome",
  SALES_CHART: "salesChart",
  RECENT_ORDERS: "recentOrders",
  USER_PROFILE: "userProfile",
  PRODUCT_PERFORMANCE: "productPerformance",
  LOW_STOCK: "lowStock",
  MODULE_SYSTEM: "moduleSystem",
  RECENT_MESSAGES: "recentMessages",
};

// Define initial positions - default layout
const defaultPositions: DashboardCardPosition[] = [
  { id: DASHBOARD_CARDS.WELCOME, order: 0, column: 0 },
  { id: DASHBOARD_CARDS.SALES_CHART, order: 1, column: 0 },
  { id: DASHBOARD_CARDS.RECENT_ORDERS, order: 2, column: 0 },
  { id: DASHBOARD_CARDS.USER_PROFILE, order: 0, column: 1 },
  { id: DASHBOARD_CARDS.PRODUCT_PERFORMANCE, order: 1, column: 1 },
  { id: DASHBOARD_CARDS.LOW_STOCK, order: 2, column: 1 },
  { id: DASHBOARD_CARDS.MODULE_SYSTEM, order: 3, column: 1 },
  { id: DASHBOARD_CARDS.RECENT_MESSAGES, order: 4, column: 1 },
];

interface DashboardLayoutState {
  cardPositions: DashboardCardPosition[];
}

const initialState: DashboardLayoutState = {
  cardPositions: defaultPositions,
};

export const dashboardLayoutSlice = createSlice({
  name: "dashboardLayout",
  initialState,
  reducers: {
    updateCardPosition: (
      state,
      action: PayloadAction<{ id: string; newPosition: Partial<DashboardCardPosition> }>
    ) => {
      const { id, newPosition } = action.payload;
      const cardIndex = state.cardPositions.findIndex((card) => card.id === id);
      
      if (cardIndex !== -1) {
        state.cardPositions[cardIndex] = {
          ...state.cardPositions[cardIndex],
          ...newPosition,
        };
      }
    },
    moveCard: (
      state,
      action: PayloadAction<{ 
        dragId: string; 
        hoverId: string;
        dragColumn?: number;
        hoverColumn?: number;
      }>
    ) => {
      const { dragId, hoverId, dragColumn, hoverColumn } = action.payload;
      
      // Find positions of dragged and hover cards
      const dragIndex = state.cardPositions.findIndex(card => card.id === dragId);
      const hoverIndex = state.cardPositions.findIndex(card => card.id === hoverId);
      
      if (dragIndex === -1 || hoverIndex === -1) return;
      
      const dragCard = state.cardPositions[dragIndex];
      const hoverCard = state.cardPositions[hoverIndex];
      
      // If moving between columns
      if (dragColumn !== undefined && hoverColumn !== undefined && dragColumn !== hoverColumn) {
        // Update column for the dragged card
        state.cardPositions[dragIndex].column = hoverColumn;
        
        // Adjust orders in the target column
        const targetColumnCards = state.cardPositions
          .filter(card => card.id !== dragId && card.column === hoverColumn)
          .sort((a, b) => a.order - b.order);
        
        // Insert at proper position
        let insertIndex = targetColumnCards.findIndex(card => card.id === hoverId);
        if (insertIndex === -1) {
          insertIndex = targetColumnCards.length;
        }
        
        // Update orders in target column
        targetColumnCards.forEach((card, idx) => {
          const cardIdx = state.cardPositions.findIndex(c => c.id === card.id);
          if (idx >= insertIndex) {
            state.cardPositions[cardIdx].order = idx + 1;
          } else {
            state.cardPositions[cardIdx].order = idx;
          }
        });
        
        // Set order for dragged card
        state.cardPositions[dragIndex].order = insertIndex;
        
        // Reorder source column
        const sourceColumnCards = state.cardPositions
          .filter(card => card.id !== dragId && card.column === dragColumn)
          .sort((a, b) => a.order - b.order);
        
        sourceColumnCards.forEach((card, idx) => {
          const cardIdx = state.cardPositions.findIndex(c => c.id === card.id);
          state.cardPositions[cardIdx].order = idx;
        });
      } 
      // If within the same column
      else {
        // Swap orders
        const dragOrder = dragCard.order;
        const hoverOrder = hoverCard.order;
        
        // Moving up
        if (dragOrder > hoverOrder) {
          state.cardPositions.forEach(card => {
            if (card.id !== dragId && card.column === dragCard.column && 
                card.order >= hoverOrder && card.order < dragOrder) {
              card.order += 1;
            }
          });
        } 
        // Moving down
        else if (dragOrder < hoverOrder) {
          state.cardPositions.forEach(card => {
            if (card.id !== dragId && card.column === dragCard.column && 
                card.order <= hoverOrder && card.order > dragOrder) {
              card.order -= 1;
            }
          });
        }
        
        // Set new order for dragged card
        state.cardPositions[dragIndex].order = hoverOrder;
      }
    },
    resetLayout: (state) => {
      state.cardPositions = defaultPositions;
    }
  },
});

export const { updateCardPosition, moveCard, resetLayout } = dashboardLayoutSlice.actions;

export default dashboardLayoutSlice.reducer;
