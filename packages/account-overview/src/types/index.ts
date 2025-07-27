export interface Customer {
  id: string;
  name: string;
  email: string;
}

export interface Account {
  id: string;
  customerId: string;
  accountNumber: string;
  balance: number;
  currency: string;
  customer?: Customer;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  date: string;
  account?: Account;
}

export interface AccountData {
  account: Account | null;
  recentTransactions: Transaction[];
  loading: boolean;
  error: Error | null;
}
