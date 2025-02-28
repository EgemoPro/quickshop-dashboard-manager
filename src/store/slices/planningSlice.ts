
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Event types
export type EventType = "product" | "message";

export interface ScheduledEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: EventType;
  description?: string;
  productId?: string;
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

export const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<ScheduledEvent[]>) => {
      state.events = action.payload;
    },
    addEvent: (state, action: PayloadAction<ScheduledEvent>) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action: PayloadAction<ScheduledEvent>) => {
      const index = state.events.findIndex(event => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
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
  setError
} = planningSlice.actions;

export default planningSlice.reducer;
