
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded" | "partially_refunded";
  paymentMethod: string;
  paymentId: string;
  createdAt: string;
  updatedAt: string;
  customerInfo: {
    name: string;
    email: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  refunds: Array<{
    id: string;
    amount: number;
    reason: string;
    createdAt: string;
    status: "pending" | "completed" | "failed";
  }>;
}

interface PaymentAccount {
  id: string;
  type: "bank" | "paypal" | "stripe" | "other";
  name: string;
  status: "active" | "inactive" | "pending";
  balance: number;
  currency: string;
  lastUpdated: string;
  accountDetails: {
    [key: string]: string;
  };
}

interface WithdrawalRequest {
  id: string;
  amount: number;
  currency: string;
  destinationAccount: string;
  status: "pending" | "processing" | "completed" | "rejected";
  requestDate: string;
  completionDate: string | null;
  notes: string;
}

interface PaymentState {
  transactions: Transaction[];
  paymentAccounts: PaymentAccount[];
  withdrawalRequests: WithdrawalRequest[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  transactions: [
    {
      id: "trans-001",
      orderId: "ORD-123456",
      amount: 89.95,
      currency: "EUR",
      status: "completed",
      paymentMethod: "credit_card",
      paymentId: "pi_3NkLmJDp7csJG1wV1O9meYmS",
      createdAt: "2023-11-24T14:30:00Z",
      updatedAt: "2023-11-24T14:30:45Z",
      customerInfo: {
        name: "Jean Dupont",
        email: "jean.dupont@example.com",
      },
      billingAddress: {
        street: "45 Avenue de la République",
        city: "Lyon",
        state: "Auvergne-Rhône-Alpes",
        postalCode: "69001",
        country: "France",
      },
      refunds: [],
    },
  ],
  paymentAccounts: [
    {
      id: "acct-001",
      type: "bank",
      name: "Compte Bancaire Principal",
      status: "active",
      balance: 12456.78,
      currency: "EUR",
      lastUpdated: "2023-11-25T12:00:00Z",
      accountDetails: {
        bankName: "Crédit Agricole",
        accountNumber: "****3456",
        routingNumber: "****7890",
      },
    },
    {
      id: "acct-002",
      type: "paypal",
      name: "Compte PayPal Business",
      status: "active",
      balance: 2345.67,
      currency: "EUR",
      lastUpdated: "2023-11-25T12:00:00Z",
      accountDetails: {
        email: "business@quickshop.com",
      },
    },
  ],
  withdrawalRequests: [
    {
      id: "with-001",
      amount: 5000,
      currency: "EUR",
      destinationAccount: "acct-001",
      status: "completed",
      requestDate: "2023-11-15T10:15:00Z",
      completionDate: "2023-11-17T14:30:00Z",
      notes: "Retrait mensuel",
    },
  ],
  isLoading: false,
  error: null,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    // Transaction management
    addTransaction: (state, action: PayloadAction<Omit<Transaction, "id" | "refunds">>) => {
      const newId = `trans-${state.transactions.length + 1}`.padStart(7, '0');
      state.transactions.push({
        ...action.payload,
        id: newId,
        refunds: [],
      });
    },
    updateTransactionStatus: (state, action: PayloadAction<{ id: string; status: Transaction["status"] }>) => {
      const index = state.transactions.findIndex(transaction => transaction.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index].status = action.payload.status;
        state.transactions[index].updatedAt = new Date().toISOString();
      }
    },
    addRefund: (state, action: PayloadAction<{ 
      transactionId: string; 
      amount: number; 
      reason: string;
    }>) => {
      const index = state.transactions.findIndex(transaction => transaction.id === action.payload.transactionId);
      if (index !== -1) {
        const refundId = `ref-${state.transactions[index].refunds.length + 1}`.padStart(7, '0');
        state.transactions[index].refunds.push({
          id: refundId,
          amount: action.payload.amount,
          reason: action.payload.reason,
          createdAt: new Date().toISOString(),
          status: "pending",
        });
        
        // Update transaction status
        const totalRefundedAmount = state.transactions[index].refunds.reduce(
          (sum, refund) => sum + (refund.status !== "failed" ? refund.amount : 0), 
          0
        );
        
        if (totalRefundedAmount >= state.transactions[index].amount) {
          state.transactions[index].status = "refunded";
        } else if (totalRefundedAmount > 0) {
          state.transactions[index].status = "partially_refunded";
        }
        
        state.transactions[index].updatedAt = new Date().toISOString();
      }
    },
    updateRefundStatus: (state, action: PayloadAction<{ 
      transactionId: string; 
      refundId: string; 
      status: "pending" | "completed" | "failed";
    }>) => {
      const transactionIndex = state.transactions.findIndex(
        transaction => transaction.id === action.payload.transactionId
      );
      
      if (transactionIndex !== -1) {
        const refundIndex = state.transactions[transactionIndex].refunds.findIndex(
          refund => refund.id === action.payload.refundId
        );
        
        if (refundIndex !== -1) {
          state.transactions[transactionIndex].refunds[refundIndex].status = action.payload.status;
          
          // Update transaction status based on refunds
          const totalRefundedAmount = state.transactions[transactionIndex].refunds.reduce(
            (sum, refund) => sum + (refund.status === "completed" ? refund.amount : 0), 
            0
          );
          
          if (totalRefundedAmount >= state.transactions[transactionIndex].amount) {
            state.transactions[transactionIndex].status = "refunded";
          } else if (totalRefundedAmount > 0) {
            state.transactions[transactionIndex].status = "partially_refunded";
          }
          
          state.transactions[transactionIndex].updatedAt = new Date().toISOString();
        }
      }
    },
    
    // Payment account management
    addPaymentAccount: (state, action: PayloadAction<Omit<PaymentAccount, "id" | "lastUpdated">>) => {
      const newId = `acct-${state.paymentAccounts.length + 1}`.padStart(7, '0');
      state.paymentAccounts.push({
        ...action.payload,
        id: newId,
        lastUpdated: new Date().toISOString(),
      });
    },
    updatePaymentAccount: (state, action: PayloadAction<Partial<PaymentAccount> & { id: string }>) => {
      const index = state.paymentAccounts.findIndex(account => account.id === action.payload.id);
      if (index !== -1) {
        state.paymentAccounts[index] = {
          ...state.paymentAccounts[index],
          ...action.payload,
          lastUpdated: new Date().toISOString(),
        };
      }
    },
    deletePaymentAccount: (state, action: PayloadAction<string>) => {
      state.paymentAccounts = state.paymentAccounts.filter(account => account.id !== action.payload);
    },
    updateAccountBalance: (state, action: PayloadAction<{ id: string; balance: number }>) => {
      const index = state.paymentAccounts.findIndex(account => account.id === action.payload.id);
      if (index !== -1) {
        state.paymentAccounts[index].balance = action.payload.balance;
        state.paymentAccounts[index].lastUpdated = new Date().toISOString();
      }
    },
    
    // Withdrawal request management
    createWithdrawalRequest: (state, action: PayloadAction<{
      amount: number;
      currency: string;
      destinationAccount: string;
      notes: string;
    }>) => {
      const newId = `with-${state.withdrawalRequests.length + 1}`.padStart(7, '0');
      state.withdrawalRequests.push({
        id: newId,
        amount: action.payload.amount,
        currency: action.payload.currency,
        destinationAccount: action.payload.destinationAccount,
        status: "pending",
        requestDate: new Date().toISOString(),
        completionDate: null,
        notes: action.payload.notes,
      });
      
      // Optionally: update account balance when withdrawal is created (or this could be done later)
    },
    updateWithdrawalStatus: (state, action: PayloadAction<{ 
      id: string; 
      status: WithdrawalRequest["status"];
      completionDate?: string;
    }>) => {
      const index = state.withdrawalRequests.findIndex(request => request.id === action.payload.id);
      if (index !== -1) {
        state.withdrawalRequests[index].status = action.payload.status;
        
        if (action.payload.status === "completed") {
          state.withdrawalRequests[index].completionDate = action.payload.completionDate || new Date().toISOString();
          
          // Update account balance if withdrawal is completed
          const accountId = state.withdrawalRequests[index].destinationAccount;
          const accountIndex = state.paymentAccounts.findIndex(account => account.id === accountId);
          
          if (accountIndex !== -1) {
            // This is simplified; in reality you would handle the actual bank transfer confirmation
            state.paymentAccounts[accountIndex].lastUpdated = new Date().toISOString();
          }
        }
      }
    },
    deleteWithdrawalRequest: (state, action: PayloadAction<string>) => {
      // Only allow deletion of pending requests
      const index = state.withdrawalRequests.findIndex(
        request => request.id === action.payload && request.status === "pending"
      );
      
      if (index !== -1) {
        state.withdrawalRequests = state.withdrawalRequests.filter(request => request.id !== action.payload);
      }
    },
  },
});

export const {
  setLoading,
  setError,
  addTransaction,
  updateTransactionStatus,
  addRefund,
  updateRefundStatus,
  addPaymentAccount,
  updatePaymentAccount,
  deletePaymentAccount,
  updateAccountBalance,
  createWithdrawalRequest,
  updateWithdrawalStatus,
  deleteWithdrawalRequest,
} = paymentSlice.actions;

export default paymentSlice.reducer;
