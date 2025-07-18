
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Event types
export type EventType = "product" | "message" | "marketing" | "order";

export interface ScheduledEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: EventType;
  description?: string;
  productId?: string;
  campaignId?: string;
  orderId?: string;
}

interface PlanningState {
  events: ScheduledEvent[];
  isLoading: boolean;
  error: string | null;
  activeTab: string;
  searchTerm: string;
}

// Generate sample events
const generateSampleEvents = (): ScheduledEvent[] => {
  const today = new Date();
  
  return [
    {
      id: "1",
      title: "Promotion T-shirt Premium",
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 10, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 11, 0),
      type: "product",
      productId: "PRD-12345"
    },
    {
      id: "2",
      title: "Annonce Nouvelle Collection",
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 14, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 15, 0),
      type: "message",
      description: "Message pour annoncer l'arrivée de la nouvelle collection d'été"
    },
    {
      id: "3",
      title: "Promotion Jean Classique",
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 9, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 10, 0),
      type: "product",
      productId: "PRD-23456"
    },
    {
      id: "4",
      title: "Campagne Marketing Soldes d'Été",
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 12, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 13, 0),
      type: "marketing",
      campaignId: "camp-001",
      description: "Lancement de la campagne promotionnelle pour les soldes d'été"
    },
    {
      id: "5",
      title: "Livraison Commande #ORD-582791",
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4, 8, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4, 9, 0),
      type: "order",
      orderId: "ORD-582791",
      description: "Livraison prévue pour la commande de Jean Dupont"
    }
  ];
};

const initialState: PlanningState = {
  events: generateSampleEvents(),
  isLoading: false,
  error: null,
  activeTab: "all",
  searchTerm: ""
};

// Helper function to ensure dates are properly handled
const ensureDate = (date: string | Date): Date => {
  return typeof date === 'string' ? new Date(date) : date;
};

export const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<ScheduledEvent[]>) => {
      state.events = action.payload.map(event => ({
        ...event,
        start: ensureDate(event.start),
        end: ensureDate(event.end)
      }));
    },
    addEvent: (state, action: PayloadAction<ScheduledEvent>) => {
      const newEvent = {
        ...action.payload,
        start: ensureDate(action.payload.start),
        end: ensureDate(action.payload.end)
      };
      
      // Validation
      if (newEvent.start >= newEvent.end) {
        state.error = "La date de fin doit être postérieure à la date de début";
        return;
      }
      
      // Check for duplicate IDs
      if (state.events.some(event => event.id === newEvent.id)) {
        state.error = "Un événement avec cet ID existe déjà";
        return;
      }
      
      state.events.push(newEvent);
      state.error = null;
    },
    updateEvent: (state, action: PayloadAction<ScheduledEvent>) => {
      const updatedEvent = {
        ...action.payload,
        start: ensureDate(action.payload.start),
        end: ensureDate(action.payload.end)
      };
      
      // Validation
      if (updatedEvent.start >= updatedEvent.end) {
        state.error = "La date de fin doit être postérieure à la date de début";
        return;
      }
      
      const index = state.events.findIndex(event => event.id === updatedEvent.id);
      if (index !== -1) {
        state.events[index] = updatedEvent;
        state.error = null;
      } else {
        state.error = "Événement non trouvé";
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      const initialLength = state.events.length;
      state.events = state.events.filter(event => event.id !== action.payload);
      
      if (state.events.length === initialLength) {
        state.error = "Événement non trouvé";
      } else {
        state.error = null;
      }
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
      state.error = null;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { 
  setEvents, 
  addEvent, 
  updateEvent, 
  deleteEvent, 
  setActiveTab, 
  setSearchTerm,
  setLoading,
  setError,
  clearError
} = planningSlice.actions;

export default planningSlice.reducer;
