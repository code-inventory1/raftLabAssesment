// import React from 'react';
// import { StyleSheet, Platform } from 'react-native';
// import { View, Text } from '@bank-portal/ui-kit';
// import { Navigation } from './Navigation';

// interface LayoutProps {
//   children: React.ReactNode;
// }

// export const Layout: React.FC<LayoutProps> = ({ children }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text variant="heading" style={styles.title}>
//           Enterprise Banking Portal
//         </Text>
//       </View>

//       <Navigation />

//       <View style={styles.content}>
//         {children}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F9FA',
//   },
//   header: {
//     backgroundColor: '#0066CC',
//     paddingVertical: Platform.OS === 'web' ? 20 : 40,
//     paddingHorizontal: 16,
//     paddingTop: Platform.OS === 'web' ? 20 : 60,
//   },
//   title: {
//     color: '#FFFFFF',
//     textAlign: 'center',
//   },
//   content: {
//     flex: 1,
//     padding: 16,
//   },
// });


import React, { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate?: (section: string) => void;
  currentSection?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, onNavigate, currentSection = 'overview' }) => {
  const handleNavigate = (section: string) => {
    onNavigate?.(section);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh' }}>
      <header style={{
        backgroundColor: '#0066CC',
        color: 'white',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1>Enterprise Banking Portal</h1>
      </header>

      <nav style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #E9ECEF',
        padding: '12px 16px',
        display: 'flex',
        gap: '12px'
      }}>
        <button
          onClick={() => handleNavigate('overview')}
          style={{
            padding: '8px 16px',
            backgroundColor: currentSection === 'overview' ? '#007bff' : 'transparent',
            color: currentSection === 'overview' ? 'white' : '#007bff',
            border: '1px solid #007bff',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Account Overview
        </button>
        <button
          onClick={() => handleNavigate('transactions')}
          style={{
            padding: '8px 16px',
            backgroundColor: currentSection === 'transactions' ? '#007bff' : 'transparent',
            color: currentSection === 'transactions' ? 'white' : '#007bff',
            border: '1px solid #007bff',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Transactions
        </button>
      </nav>

      <main style={{ padding: '16px', backgroundColor: '#F8F9FA', minHeight: 'calc(100vh - 140px)' }}>
        {children}
      </main>
    </div>
  );
};