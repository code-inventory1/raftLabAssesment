import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Card, Text, Button } from '@bank-portal/ui-kit';

interface TransactionListHeaderProps {
  transactionCount: number;
  isMobile: boolean;
  onExport: () => void;
  onShare: () => void;
}

export const TransactionListHeader: React.FC<TransactionListHeaderProps> = ({
  transactionCount,
  isMobile,
  onExport,
  onShare
}) => {
  return (
    <Card style={styles.headerCard}>
      <View style={styles.headerRow}>
        <Text variant="heading" style={styles.title}>
          Transaction History & Details ({transactionCount})
        </Text>

        {/* Platform-specific action */}
        {!isMobile ? (
          <Button
            title="Export CSV"
            onPress={onExport}
            variant="outline"
            style={styles.exportButton}
          />
        ) : (
          <Button
            title="Share List"
            onPress={onShare}
            variant="outline"
            style={styles.exportButton}
          />
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  headerCard: {
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    marginBottom: 8,
    flex: 1,
  },
  exportButton: {
    minWidth: 100,
  },
});