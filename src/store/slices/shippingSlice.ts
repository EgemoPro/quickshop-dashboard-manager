
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShippingCarrier {
  id: string;
  name: string;
  logo: string;
  isActive: boolean;
  deliveryTimeRange: {
    min: number;
    max: number;
  };
  trackingUrl: string;
  pricing: {
    base: number;
    perKg: number;
  };
}

interface ShipmentZone {
  id: string;
  name: string;
  countries: string[];
  priceMultiplier: number;
}

interface ShipmentPackage {
  id: string;
  name: string;
  dimensions: {
    width: number;
    height: number;
    length: number;
  };
  maxWeight: number;
  price: number;
}

interface Shipment {
  id: string;
  orderId: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "failed";
  carrier: string;
  trackingNumber: string;
  shipDate: string;
  estimatedDelivery: string;
  actualDelivery: string | null;
  recipientAddress: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  packageDetails: {
    weight: number;
    dimensions: {
      width: number;
      height: number;
      length: number;
    };
    packageType: string;
  };
  shippingCost: number;
}

interface ShippingState {
  carriers: ShippingCarrier[];
  zones: ShipmentZone[];
  packages: ShipmentPackage[];
  shipments: Shipment[];
  activeCarriers: number;
  pendingShipments: number;
  averageDeliveryTime: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: ShippingState = {
  carriers: [
    {
      id: "carrier-001",
      name: "QuickExpress",
      logo: "/placeholder.svg",
      isActive: true,
      deliveryTimeRange: {
        min: 1,
        max: 3,
      },
      trackingUrl: "https://tracking.quickexpress.com/{{trackingNumber}}",
      pricing: {
        base: 5.99,
        perKg: 1.5,
      },
    },
    {
      id: "carrier-002",
      name: "GlobalShip",
      logo: "/placeholder.svg",
      isActive: true,
      deliveryTimeRange: {
        min: 3,
        max: 7,
      },
      trackingUrl: "https://globalship.com/track/{{trackingNumber}}",
      pricing: {
        base: 8.99,
        perKg: 2.0,
      },
    },
  ],
  zones: [
    {
      id: "zone-001",
      name: "France Métropolitaine",
      countries: ["France"],
      priceMultiplier: 1.0,
    },
    {
      id: "zone-002",
      name: "Europe",
      countries: ["Germany", "Spain", "Italy", "Belgium", "Netherlands", "Luxembourg"],
      priceMultiplier: 1.5,
    },
    {
      id: "zone-003",
      name: "Niger",
      countries: ["Niamey", "Dosso", "Tahoua", "Tillabery", "Zinder", "Agadez", "Maradi","Diffa"],
      priceMultiplier: 1.8,
    },
  ],
  packages: [
    {
      id: "package-001",
      name: "Enveloppe Standard",
      dimensions: {
        width: 25,
        height: 35,
        length: 1,
      },
      maxWeight: 0.5,
      price: 2.99,
    },
    {
      id: "package-002",
      name: "Boîte Petite",
      dimensions: {
        width: 20,
        height: 15,
        length: 10,
      },
      maxWeight: 2,
      price: 4.99,
    },
    {
      id: "package-003",
      name: "Boîte Grande",
      dimensions: {
        width: 40,
        height: 30,
        length: 20,
      },
      maxWeight: 4,
      price: 9.95,
    },
  ],
  shipments: [
    {
      id: "ship-001",
      orderId: "order-125",
      status: "shipped",
      carrier: "carrier-001",
      trackingNumber: "QE7823456789",
      shipDate: "2023-11-20",
      estimatedDelivery: "2023-11-23",
      actualDelivery: null,
      recipientAddress: {
        name: "Sophie Martin",
        address: "15 Rue de Paris",
        city: "Lyon",
        postalCode: "69002",
        country: "France",
        phone: "+33 6 12 34 56 78",
      },
      packageDetails: {
        weight: 1.2,
        dimensions: {
          width: 20,
          height: 15,
          length: 10,
        },
        packageType: "package-002",
      },
      shippingCost: 7.79,
    },
    {
      id: "ship-002",
      orderId: "order-126",
      status: "pending",
      carrier: "carrier-002",
      trackingNumber: "QE8823456789",
      shipDate: "2024-11-20",
      estimatedDelivery: "2024-11-23",
      actualDelivery: null,
      recipientAddress: {
        name: "Paul Gao",
        address: "15 Rue de Solidarité",
        city: "Libreville",
        postalCode: "69012",
        country: "Gabon",
        phone: "+33 6 12 34 56 78",
      },
      packageDetails: {
        weight: 1.2,
        dimensions: {
          width: 20,
          height: 15,
          length: 10,
        },
        packageType: "package-002",
      },
      shippingCost: 30_000,
    },
  ],
  activeCarriers: 2,
  pendingShipments: 3,
  averageDeliveryTime: 2.5,
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
    
    // Carrier actions
    addCarrier: (state, action: PayloadAction<Omit<ShippingCarrier, "id">>) => {
      const newId = `carrier-${state.carriers.length + 1}`.padStart(10, '0');
      state.carriers.push({
        ...action.payload,
        id: newId,
      });
      state.activeCarriers = state.carriers.filter(c => c.isActive).length;
    },
    updateCarrier: (state, action: PayloadAction<Partial<ShippingCarrier> & { id: string }>) => {
      const index = state.carriers.findIndex(carrier => carrier.id === action.payload.id);
      if (index !== -1) {
        state.carriers[index] = {
          ...state.carriers[index],
          ...action.payload,
        };
      }
      state.activeCarriers = state.carriers.filter(c => c.isActive).length;
    },
    deleteCarrier: (state, action: PayloadAction<string>) => {
      state.carriers = state.carriers.filter(carrier => carrier.id !== action.payload);
      state.activeCarriers = state.carriers.filter(c => c.isActive).length;
    },
    
    // Zone actions
    addZone: (state, action: PayloadAction<Omit<ShipmentZone, "id">>) => {
      const newId = `zone-${state.zones.length + 1}`.padStart(7, '0');
      state.zones.push({
        ...action.payload,
        id: newId,
      });
    },
    updateZone: (state, action: PayloadAction<Partial<ShipmentZone> & { id: string }>) => {
      const index = state.zones.findIndex(zone => zone.id === action.payload.id);
      if (index !== -1) {
        state.zones[index] = {
          ...state.zones[index],
          ...action.payload,
        };
      }
    },
    deleteZone: (state, action: PayloadAction<string>) => {
      state.zones = state.zones.filter(zone => zone.id !== action.payload);
    },
    
    // Package actions
    addPackage: (state, action: PayloadAction<Omit<ShipmentPackage, "id">>) => {
      const newId = `package-${state.packages.length + 1}`.padStart(9, '0');
      state.packages.push({
        ...action.payload,
        id: newId,
      });
    },
    updatePackage: (state, action: PayloadAction<Partial<ShipmentPackage> & { id: string }>) => {
      const index = state.packages.findIndex(pkg => pkg.id === action.payload.id);
      if (index !== -1) {
        state.packages[index] = {
          ...state.packages[index],
          ...action.payload,
        };
      }
    },
    deletePackage: (state, action: PayloadAction<string>) => {
      state.packages = state.packages.filter(pkg => pkg.id !== action.payload);
    },
    
    // Shipment actions
    addShipment: (state, action: PayloadAction<Omit<Shipment, "id">>) => {
      const newId = `ship-${state.shipments.length + 1}`.padStart(7, '0');
      state.shipments.push({
        ...action.payload,
        id: newId,
      });
      state.pendingShipments = state.shipments.filter(s => s.status === "pending").length;
    },
    updateShipment: (state, action: PayloadAction<Partial<Shipment> & { id: string }>) => {
      const index = state.shipments.findIndex(shipment => shipment.id === action.payload.id);
      if (index !== -1) {
        state.shipments[index] = {
          ...state.shipments[index],
          ...action.payload,
        };
      }
      state.pendingShipments = state.shipments.filter(s => s.status === "pending").length;
      
      // Calculate average delivery time if we have delivered shipments
      const deliveredShipments = state.shipments.filter(s => s.status === "delivered" && s.actualDelivery);
      if (deliveredShipments.length > 0) {
        const totalDays = deliveredShipments.reduce((total, s) => {
          const shipDate = new Date(s.shipDate);
          const deliveryDate = new Date(s.actualDelivery as string);
          const days = Math.floor((deliveryDate.getTime() - shipDate.getTime()) / (1000 * 60 * 60 * 24));
          return total + days;
        }, 0);
        state.averageDeliveryTime = totalDays / deliveredShipments.length;
      }
    },
    deleteShipment: (state, action: PayloadAction<string>) => {
      state.shipments = state.shipments.filter(shipment => shipment.id !== action.payload);
      state.pendingShipments = state.shipments.filter(s => s.status === "pending").length;
    },
    updateShipmentStatus: (state, action: PayloadAction<{ id: string, status: Shipment["status"], actualDelivery?: string }>) => {
      const index = state.shipments.findIndex(shipment => shipment.id === action.payload.id);
      if (index !== -1) {
        state.shipments[index].status = action.payload.status;
        if (action.payload.status === "delivered" && action.payload.actualDelivery) {
          state.shipments[index].actualDelivery = action.payload.actualDelivery;
        }
      }
      state.pendingShipments = state.shipments.filter(s => s.status === "pending").length;
    },
    
    // Stats actions
    setActiveCarriers: (state, action: PayloadAction<number>) => {
      state.activeCarriers = action.payload;
    },
    setPendingShipments: (state, action: PayloadAction<number>) => {
      state.pendingShipments = action.payload;
    },
    setAverageDeliveryTime: (state, action: PayloadAction<number>) => {
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
  addZone,
  updateZone,
  deleteZone,
  addPackage,
  updatePackage,
  deletePackage,
  addShipment,
  updateShipment,
  deleteShipment,
  updateShipmentStatus,
  setActiveCarriers,
  setPendingShipments,
  setAverageDeliveryTime,
} = shippingSlice.actions;

export default shippingSlice.reducer;
