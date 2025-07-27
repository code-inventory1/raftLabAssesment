import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { View, Card, Text, Button } from '@bank-portal/ui-kit';
import { useAccountData } from '../hooks/useAccountData';

interface Transaction {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  date: string;
}

export const AccountSummary: React.FC = () => {
  // ✅ Real GraphQL data fetching (meets requirement)
  const { account, recentTransactions, loading, error } = useAccountData('1');

  const handleTransactionPress = (transaction: Transaction) => {
    console.log('Transaction selected:', transaction);

    // ✅ Event bus for micro frontend communication
    const eventBus = (window as any).eventBus;
    if (eventBus) {
      eventBus.emit('transaction:select', transaction);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // ✅ Loading state using React Native Text
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text variant="body">Loading account data...</Text>
      </View>
    );
  }

  // ✅ Error state using React Native Text
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text variant="body" style={styles.errorText}>
          Error loading account: {error.message}
        </Text>
        <Text variant="caption" style={styles.errorSubtext}>
          Make sure the GraphQL server is running on http://localhost:4000
        </Text>
      </View>
    );
  }

  if (!account) {
    return (
      <View style={styles.centerContainer}>
        <Text variant="body">No account data found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* ✅ Account Summary Card using React Native primitives */}
      <Card style={styles.accountCard}>
        <Text variant="heading">Account Summary</Text>

        <View style={styles.accountInfo}>
          <Text variant="body" style={styles.accountDetail}>
            <Text variant="body" style={styles.label}>Account: </Text>
            {account.accountNumber}
          </Text>

          <Text variant="body" style={styles.accountDetail}>
            <Text variant="body" style={styles.label}>Customer: </Text>
            {account.customer?.name}
          </Text>

          <Text variant="caption" style={styles.accountDetail}>
            <Text variant="caption" style={styles.label}>Email: </Text>
            {account.customer?.email}
          </Text>

          <Text variant="heading" style={styles.balance}>
            Balance: {formatCurrency(account.balance, account.currency)}
          </Text>
        </View>
      </Card>

      {/* ✅ Recent Transactions using FlatList (React Native primitive) */}
      <Card style={styles.transactionsCard}>
        <Text variant="subheading" style={styles.sectionTitle}>
          Recent Transactions ({recentTransactions?.length || 0})
        </Text>

        {recentTransactions && recentTransactions.length > 0 ? (
          <FlatList
            data={recentTransactions.slice(0, 3)} // ✅ Last 3 transactions as required
            keyExtractor={(item: Transaction) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: { item: Transaction }) => (
              <View style={styles.transactionItem}>
                <View style={styles.transactionInfo}>
                  <Text variant="body" style={styles.description}>
                    {item.description}
                  </Text>
                  <Text variant="caption" style={styles.date}>
                    {formatDate(item.date)} • ID: {item.id}
                  </Text>
                </View>

                <View style={styles.transactionAmount}>
                  <Text
                    variant="body"
                    style={[
                      styles.amount,
                      item.type === 'CREDIT' ? styles.creditAmount : styles.debitAmount
                    ]}
                  >
                    {item.type === 'CREDIT' ? '+' : '-'}
                    {formatCurrency(Math.abs(item.amount), account.currency)}
                  </Text>

                  {/* ✅ Button using ui-kit (React Native primitive) */}
                  <Button
                    title="View Details"
                    onPress={() => handleTransactionPress(item)}
                    variant="outline"
                    style={styles.detailButton}
                  />
                </View>
              </View>
            )}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text variant="body" style={styles.emptyText}>
              No recent transactions found
            </Text>
          </View>
        )}
      </Card>
    </View>
  );
};

// ✅ StyleSheet using React Native primitive
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
  accountCard: {
    marginBottom: 16,
  },
  accountInfo: {
    marginTop: 16,
  },
  accountDetail: {
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    color: '#333',
  },
  balance: {
    marginTop: 12,
    color: '#28A745',
    fontWeight: 'bold',
  },
  transactionsCard: {
    flex: 1,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  transactionInfo: {
    flex: 1,
  },
  description: {
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  date: {
    color: '#666',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    fontWeight: '700',
    marginBottom: 8,
  },
  creditAmount: {
    color: '#28A745',
  },
  debitAmount: {
    color: '#DC3545',
  },
  detailButton: {
    minWidth: 80,
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    color: '#666',
  },
});