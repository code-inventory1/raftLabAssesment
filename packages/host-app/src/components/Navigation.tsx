import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { View, Button } from '@bank-portal/ui-kit';

interface NavigationProps {
  onNavigate?: (section: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    onNavigate?.(section);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Button
          title="Account Overview"
          onPress={() => handleNavigate('overview')}
          variant={activeSection === 'overview' ? 'primary' : 'outline'}
          style={styles.navButton}
        />
        <Button
          title="Transactions"
          onPress={() => handleNavigate('transactions')}
          variant={activeSection === 'transactions' ? 'primary' : 'outline'}
          style={styles.navButton}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  navButton: {
    marginRight: 12,
    minWidth: 120,
  },
});