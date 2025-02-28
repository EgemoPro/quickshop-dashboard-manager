
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  id: string;
  customer: string;
  avatar: string;
  message: string;
  time: string;
  date: string;
  isNew: boolean;
}

interface MessagesState {
  recentMessages: Message[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

const generateRecentMessages = (): Message[] => {
  const messages = [
    "Bonjour, est-ce que ce produit est disponible en rouge ?",
    "J'ai un problème avec ma commande, pourriez-vous m'aider ?",
    "Est-ce que vous livrez à l'international ?",
    "Quand sera disponible ce produit ?",
    "Merci pour votre service rapide !",
  ];
  
  const names = ["Jean Dupont", "Marie Martin", "Pierre Durand", "Sophie Dubois", "Thomas Bernard"];
  
  return Array.from({ length: 3 }, (_, i) => {
    const id = Math.random().toString(36).substring(2, 11);
    const date = new Date();
    date.setHours(date.getHours() - Math.floor(Math.random() * 48));
    
    return {
      id,
      customer: names[Math.floor(Math.random() * names.length)],
      avatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70) + 1}`,
      message: messages[Math.floor(Math.random() * messages.length)],
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: date.toLocaleDateString(),
      isNew: Math.random() > 0.5,
    };
  });
};

const countUnread = (messages: Message[]): number => {
  return messages.filter(message => message.isNew).length;
};

const initialState: MessagesState = {
  recentMessages: generateRecentMessages(),
  unreadCount: 0,
  isLoading: false,
  error: null,
};

initialState.unreadCount = countUnread(initialState.recentMessages);

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.recentMessages = action.payload;
      state.unreadCount = countUnread(action.payload);
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.recentMessages.unshift(action.payload);
      if (action.payload.isNew) {
        state.unreadCount += 1;
      }
      state.recentMessages = state.recentMessages.slice(0, 3); // Keep only 3 most recent
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const message = state.recentMessages.find(msg => msg.id === action.payload);
      if (message && message.isNew) {
        message.isNew = false;
        state.unreadCount -= 1;
      }
    },
    markAllAsRead: (state) => {
      state.recentMessages.forEach(message => {
        message.isNew = false;
      });
      state.unreadCount = 0;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setMessages, addMessage, markAsRead, markAllAsRead, setLoading, setError } = messagesSlice.actions;
export default messagesSlice.reducer;
