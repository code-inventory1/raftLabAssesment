import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { View, Card, Text } from '@bank-portal/ui-kit';
import { useTransactionData } from '../hooks/useTransactionData';
import { useMobileDetection } from '../hooks/useMobileDetection';
import { usePlatformActions } from '../hooks/usePlatformActions';
import { TransactionListHeader } from './transaction-components/TransactionListHeader';
import { TransactionListItem } from './transaction-components/TransactionListItem';
import { TransactionDetails } from './transaction-components/TransactionDetails';

interface Transaction {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  date: string;
  accountId: string;
}

interface TransactionListProps {
  selectedTransaction?: Transaction;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  selectedTransaction: initialSelected
}) => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(initialSelected || null);

  // Custom hooks
  const { transactions, loading, error } = useTransactionData();
  const isMobile = useMobileDetection();
  const { handleDownloadCSV, handleMobileShare } = usePlatformActions(transactions);

  // Event bus integration
  useEffect(() => {
    const handleTransactionSelect = (transaction: Transaction) => {
      setSelectedTransaction(transaction);
    };

    const eventBus = (window as any).eventBus;
    if (eventBus) {
      eventBus.on('transaction:select', handleTransactionSelect);
      return () => eventBus.off('transaction:select', handleTransactionSelect);
    }
  }, []);

  useEffect(() => {
    if (initialSelected) {
      setSelectedTransaction(initialSelected);
    }
  }, [initialSelected]);

  // Utility functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text variant="body">Loading transaction data...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text variant="body" style={styles.errorText}>
          Error loading transactions: {error.message}
        </Text>
        <Text variant="caption" style={styles.errorSubtext}>
          Make sure the GraphQL server is running
        </Text>
      </View>
    );
  }

  // Transaction Detail View
  if (selectedTransaction) {
    return (
      <TransactionDetails
        transaction={selectedTransaction}
        isMobile={isMobile}
        onBack={() => setSelectedTransaction(null)}
        onDownloadCSV={handleDownloadCSV}
        onMobileShare={handleMobileShare}
        formatCurrency={formatCurrency}
        formatDateTime={formatDateTime}
      />
    );
  }

  // Transaction List View
  return (
    <View style={styles.container}>
      <TransactionListHeader
        transactionCount={transactions.length}
        isMobile={isMobile}
        onExport={handleDownloadCSV}
        onShare={handleMobileShare}
      />

      <Card style={styles.listCard}>
        <FlatList
          data={transactions}
          keyExtractor={(item: Transaction) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: Transaction }) => (
            <TransactionListItem
              transaction={item}
              onViewDetails={setSelectedTransaction}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
            />
          )}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listCard: {
    flex: 1,
  },
  errorText: {
    color: '#DC3545',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    color: '#666',
    textAlign: 'center',
  },
});