import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button } from '@bank-portal/ui-kit';

interface Transaction {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  date: string;
  accountId: string;
}

interface TransactionListItemProps {
  transaction: Transaction;
  onViewDetails: (transaction: Transaction) => void;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
}

export const TransactionListItem: React.FC<TransactionListItemProps> = ({
  transaction,
  onViewDetails,
  formatCurrency,
  formatDate
}) => {
  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionInfo}>
        <Text variant="body" style={styles.description}>
          {transaction.description}
        </Text>
        <Text variant="caption" style={styles.date}>
          {formatDate(transaction.date)} • ID: {transaction.id}
        </Text>
      </View>

      <View style={styles.transactionAmount}>
        <Text
          variant="body"
          style={[
            styles.transactionAmountText,
            transaction.type === 'CREDIT' ? styles.creditAmount : styles.debitAmount
          ]}
        >
          {transaction.type === 'CREDIT' ? '+' : '-'}
          {formatCurrency(Math.abs(transaction.amount))}
        </Text>

        <Text variant="caption" style={[
          styles.typeLabel,
          transaction.type === 'CREDIT' ? styles.creditAmount : styles.debitAmount
        ]}>
          {transaction.type}
        </Text>

        <Button
          title="View Details"
          onPress={() => onViewDetails(transaction)}
          variant="outline"
          style={styles.viewButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  date: {
    color: '#666',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionAmountText: {
    fontWeight: '700',
    marginBottom: 4,
  },
  typeLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  viewButton: {
    minWidth: 80,
  },
  creditAmount: {
    color: '#28A745',
  },
  debitAmount: {
    color: '#DC3545',
  },
});