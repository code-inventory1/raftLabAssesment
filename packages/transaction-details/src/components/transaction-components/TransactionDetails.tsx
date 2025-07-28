import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { View, Card, Text, Button } from '@bank-portal/ui-kit';

interface Transaction {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  date: string;
  accountId: string;
}

interface TransactionDetailsProps {
  transaction: Transaction;
  isMobile: boolean;
  onBack: () => void;
  onDownloadCSV: () => void;
  onMobileShare: () => void;
  formatCurrency: (amount: number) => string;
  formatDateTime: (dateString: string) => { date: string; time: string };
}

export const TransactionDetailsData: React.FC<TransactionDetailsProps> = ({
  transaction,
  isMobile,
  onBack,
  onDownloadCSV,
  onMobileShare,
  formatCurrency,
  formatDateTime
}) => {
  const { date, time } = formatDateTime(transaction.date);

  return (
    <View style={styles.container}>
      <Card style={styles.headerCard}>
        <Button
          title="← Back to List"
          onPress={onBack}
          variant="outline"
          style={styles.backButton}
        />
      </Card>

      <Card style={styles.detailsCard}>
        <Text variant="heading" style={styles.title}>Transaction Details</Text>

        <View style={styles.amountSection}>
          <Text
            variant="heading"
            style={[
              styles.amount,
              transaction.type === 'CREDIT' ? styles.creditAmount : styles.debitAmount
            ]}
          >
            {transaction.type === 'CREDIT' ? '+' : '-'}
            {formatCurrency(Math.abs(transaction.amount))}
          </Text>
          <Text variant="subheading" style={styles.type}>
            {transaction.type === 'CREDIT' ? 'Credit' : 'Debit'}
          </Text>
        </View>

        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <Text variant="body" style={styles.label}>Description:</Text>
            <Text variant="body" style={styles.value}>{transaction.description}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text variant="body" style={styles.label}>Date:</Text>
            <Text variant="body" style={styles.value}>{date}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text variant="body" style={styles.label}>Time:</Text>
            <Text variant="body" style={styles.value}>{time}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text variant="body" style={styles.label}>Transaction ID:</Text>
            <Text variant="body" style={styles.value}>{transaction.id}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text variant="body" style={styles.label}>Account ID:</Text>
            <Text variant="body" style={styles.value}>{transaction.accountId}</Text>
          </View>
        </View>

        {/* Platform-specific Actions */}
        <Card style={styles.actionsCard}>
          <Text variant="subheading" style={styles.actionsTitle}>
            Actions ({isMobile ? 'Mobile' : 'Desktop'})
          </Text>
          <View style={styles.actionButtons}>
            {/* Desktop-only: CSV Download */}
            {!isMobile && (
              <Button
                title="Download CSV (Desktop)"
                onPress={onDownloadCSV}
                variant="primary"
                style={styles.actionButton}
              />
            )}

            {/* Mobile-only: Native Share */}
            {isMobile && (
              <Button
                title="Share (Mobile)"
                onPress={onMobileShare}
                variant="primary"
                style={styles.actionButton}
              />
            )}

            <Button
              title="Report Issue"
              onPress={() => {
                Alert.alert(
                  'Report Issue',
                  `Report issue for transaction ${transaction.id}?`,
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Report', onPress: () => console.log('Issue reported') }
                  ]
                );
              }}
              variant="outline"
              style={styles.actionButton}
            />
          </View>
        </Card>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerCard: {
    marginBottom: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    minWidth: 120,
  },
  detailsCard: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 16,
  },
  amountSection: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    marginBottom: 20,
  },
  amount: {
    fontSize: 32,
    fontWeight: '700',
  },
  creditAmount: {
    color: '#28A745',
  },
  debitAmount: {
    color: '#DC3545',
  },
  type: {
    marginTop: 8,
    color: '#6C757D',
  },
  detailsSection: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontWeight: '600',
    color: '#495057',
  },
  value: {
    color: '#212529',
    flex: 1,
    textAlign: 'right',
    marginLeft: 16,
  },
  actionsCard: {
    marginTop: 16,
  },
  actionsTitle: {
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: 120,
  },
});