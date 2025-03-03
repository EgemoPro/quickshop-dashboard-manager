import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Carrier {
  id: string;
  name: string;
  logo: string;
  trackingUrlTemplate: string;
  enabled: boolean;
  defaultShippingCost: number;
  estimatedDeliveryDays: {
    min: number;
    max: number;
  };
  supportedRegions: string[];
}

interface ShippingRate {
  id: string;
  carrierId: string;
  name: string;
  price: number;
  freeShippingThreshold: number | null;
  deliveryTimeMin: number;
  deliveryTimeMax: number;
  weightLimitMin: number | null;
  weightLimitMax: number | null;
  regions: string[];
  active: boolean;
}

interface Shipment {
  id: string;
  orderId: string;
  carrierId: string;
  trackingNumber: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "returned";
  createdAt: string;
  updatedAt: string;
  estimatedDeliveryDate: string;
  shippingCost: number;
  weight: number;
  packageDimensions: {
    length: number;
    width: number;
    height: number;
  };
  fromAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  toAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  events: Array<{
    timestamp: string;
    status: string;
    location: string;
    description: string;
  }>;
}

interface ShippingState {
  carriers: Carrier[];
  shippingRates: ShippingRate[];
  shipments: Shipment[];
  activeCarriers: Carrier[];
  pendingShipments: number;
  averageDeliveryTime: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: ShippingState = {
  carriers: [
    {
      id: "carrier-001",
      name: "Colissimo",
      logo: "https://placehold.co/200x100/e2e8f0/1e293b?text=Colissimo",
      trackingUrlTemplate: "https://www.laposte.fr/outils/suivre-vos-envois?code={trackingNumber}",
      enabled: true,
      defaultShippingCost: 6.95,
      estimatedDeliveryDays: {
        min: 2,
        max: 4,
      },
      supportedRegions: ["France", "Europe"],
    },
    {
      id: "carrier-002",
      name: "Chronopost",
      logo: "https://placehold.co/200x100/e2e8f0/1e293b?text=Chronopost",
      trackingUrlTemplate: "https://www.chronopost.fr/tracking-no-cms/suivi-page?listeNumerosLT={trackingNumber}",
      enabled: true,
      defaultShippingCost: 12.95,
      estimatedDeliveryDays: {
        min: 1,
        max: 2,
      },
      supportedRegions: ["France", "Europe", "International"],
    },
  ],
  shippingRates: [
    {
      id: "rate-001",
      carrierId: "carrier-001",
      name: "Standard",
      price: 6.95,
      freeShippingThreshold: 50,
      deliveryTimeMin: 2,
      deliveryTimeMax: 4,
      weightLimitMin: 0,
      weightLimitMax: 5,
      regions: ["France"],
      active: true,
    },
    {
      id: "rate-002",
      carrierId: "carrier-002",
      name: "Express",
      price: 12.95,
      freeShippingThreshold: 100,
      deliveryTimeMin: 1,
      deliveryTimeMax: 2,
      weightLimitMin: 0,
      weightLimitMax: 5,
      regions: ["France"],
      active: true,
    },
  ],
  shipments: [
    {
      id: "ship-001",
      orderId: "ORD-123456",
      carrierId: "carrier-001",
      trackingNumber: "LP00123456789FR",
      status: "shipped",
      createdAt: "2023-11-25T10:30:00Z",
      updatedAt: "2023-11-25T15:45:00Z",
      estimatedDeliveryDate: "2023-11-28",
      shippingCost: 6.95,
      weight: 1.2,
      packageDimensions: {
        length: 30,
        width: 20,
        height: 10,
      },
      fromAddress: {
        name: "QuickShop Entrepôt",
        street: "123 Rue du Commerce",
        city: "Paris",
        state: "Île-de-France",
        postalCode: "75001",
        country: "France",
      },
      toAddress: {
        name: "Jean Dupont",
        street: "45 Avenue de la République",
        city: "Lyon",
        state: "Auvergne-Rhône-Alpes",
        postalCode: "69001",
        country: "France",
      },
      events: [
        {
          timestamp: "2023-11-25T10:30:00Z",
          status: "created",
          location: "Paris, France",
          description: "Colis préparé",
        },
        {
          timestamp: "2023-11-25T15:45:00Z",
          status: "shipped",
          location: "Paris, France",
          description: "Colis expédié",
        },
      ],
    },
  ],
  activeCarriers: [
    {
      id: "carrier-001",
      name: "Colissimo",
      logo: "https://placehold.co/200x100/e2e8f0/1e293b?text=Colissimo",
      trackingUrlTemplate: "https://www.laposte.fr/outils/suivre-vos-envois?code={trackingNumber}",
      enabled: true,
      defaultShippingCost: 6.95,
      estimatedDeliveryDays: {
        min: 2,
        max: 4,
      },
      supportedRegions: ["France", "Europe"],
    },
    {
      id: "carrier-002",
      name: "Chronopost",
      logo: "https://placehold.co/200x100/e2e8f0/1e293b?text=Chronopost",
      trackingUrlTemplate: "https://www.chronopost.fr/tracking-no-cms/suivi-page?listeNumerosLT={trackingNumber}",
      enabled: true,
      defaultShippingCost: 12.95,
      estimatedDeliveryDays: {
        min: 1,
        max: 2,
      },
      supportedRegions: ["France", "Europe", "International"],
    },
  ],
  pendingShipments: 3,
  averageDeliveryTime: "2-3 jours",
  isLoading: false,
  error: null,
};

export const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    addCarrier: (state, action: PayloadAction<Omit<Carrier, "id">>) => {
      const newId = `carrier-${state.carriers.length + 1}`.padStart(7, '0');
      state.carriers.push({
        ...action.payload,
        id: newId,
      });
    },
    updateCarrier: (state, action: PayloadAction<Partial<Carrier> & { id: string }>) => {
      const index = state.carriers.findIndex(carrier => carrier.id === action.payload.id);
      if (index !== -1) {
        state.carriers[index] = {
          ...state.carriers[index],
          ...action.payload,
        };
      }
    },
    deleteCarrier: (state, action: PayloadAction<string>) => {
      state.carriers = state.carriers.filter(carrier => carrier.id !== action.payload);
    },
    toggleCarrierStatus: (state, action: PayloadAction<string>) => {
      const index = state.carriers.findIndex(carrier => carrier.id === action.payload);
      if (index !== -1) {
        state.carriers[index].enabled = !state.carriers[index].enabled;
      }
    },
    
    addShippingRate: (state, action: PayloadAction<Omit<ShippingRate, "id">>) => {
      const newId = `rate-${state.shippingRates.length + 1}`.padStart(7, '0');
      state.shippingRates.push({
        ...action.payload,
        id: newId,
      });
    },
    updateShippingRate: (state, action: PayloadAction<Partial<ShippingRate> & { id: string }>) => {
      const index = state.shippingRates.findIndex(rate => rate.id === action.payload.id);
      if (index !== -1) {
        state.shippingRates[index] = {
          ...state.shippingRates[index],
          ...action.payload,
        };
      }
    },
    deleteShippingRate: (state, action: PayloadAction<string>) => {
      state.shippingRates = state.shippingRates.filter(rate => rate.id !== action.payload);
    },
    toggleShippingRateStatus: (state, action: PayloadAction<string>) => {
      const index = state.shippingRates.findIndex(rate => rate.id === action.payload);
      if (index !== -1) {
        state.shippingRates[index].active = !state.shippingRates[index].active;
      }
    },
    
    addShipment: (state, action: PayloadAction<Omit<Shipment, "id" | "events">>) => {
      const newId = `ship-${state.shipments.length + 1}`.padStart(7, '0');
      state.shipments.push({
        ...action.payload,
        id: newId,
        events: [{
          timestamp: new Date().toISOString(),
          status: "created",
          location: action.payload.fromAddress.city + ", " + action.payload.fromAddress.country,
          description: "Colis préparé",
        }],
      });
    },
    updateShipment: (state, action: PayloadAction<Partial<Shipment> & { id: string }>) => {
      const index = state.shipments.findIndex(shipment => shipment.id === action.payload.id);
      if (index !== -1) {
        state.shipments[index] = {
          ...state.shipments[index],
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    updateShipmentStatus: (state, action: PayloadAction<{ 
      id: string; 
      status: Shipment["status"];
      location: string;
      description: string;
    }>) => {
      const index = state.shipments.findIndex(shipment => shipment.id === action.payload.id);
      if (index !== -1) {
        state.shipments[index].status = action.payload.status;
        state.shipments[index].updatedAt = new Date().toISOString();
        state.shipments[index].events.push({
          timestamp: new Date().toISOString(),
          status: action.payload.status,
          location: action.payload.location,
          description: action.payload.description,
        });
      }
    },
    deleteShipment: (state, action: PayloadAction<string>) => {
      state.shipments = state.shipments.filter(shipment => shipment.id !== action.payload);
    },
    
    setActiveCarriers: (state, action: PayloadAction<Carrier[]>) => {
      state.activeCarriers = action.payload;
    },
    setPendingShipments: (state, action: PayloadAction<number>) => {
      state.pendingShipments = action.payload;
    },
    setAverageDeliveryTime: (state, action: PayloadAction<string>) => {
      state.averageDeliveryTime = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  addCarrier,
  updateCarrier,
  deleteCarrier,
  toggleCarrierStatus,
  addShippingRate,
  updateShippingRate,
  deleteShippingRate,
  toggleShippingRateStatus,
  addShipment,
  updateShipment,
  updateShipmentStatus,
  deleteShipment,
  setActiveCarriers,
  setPendingShipments,
  setAverageDeliveryTime,
} = shippingSlice.actions;

export default shippingSlice.reducer;
