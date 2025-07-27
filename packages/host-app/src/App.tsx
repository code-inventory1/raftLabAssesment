import React, { useState, useEffect, Suspense } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Layout } from './components/Layout';
import { eventBus } from './utils/eventBus';

const AccountOverview = React.lazy(() => import('accountOverview/App'));
const TransactionDetails = React.lazy(() => import('transactionDetails/App'));

const client = new ApolloClient({
  uri: 'http://192.168.31.185:4000/graphql',
  cache: new InMemoryCache(),
});

export const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('overview');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    const handleTransactionSelect = (transaction: any) => {
      console.log('Host App: Received transaction selection:', transaction);
      setSelectedTransaction(transaction);
      setCurrentSection('transactions');
    };

    eventBus.on('transaction:select', handleTransactionSelect);

    return () => {
      eventBus.off('transaction:select', handleTransactionSelect);
    };
  }, []);

  const handleNavigate = (section: string) => {
    console.log('Host App: Navigating to section:', section);
    setCurrentSection(section);
    // Clear selected transaction when navigating away from transactions
    if (section !== 'transactions') {
      setSelectedTransaction(null);
    }
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'overview':
        return (
          <Suspense fallback={<div style={{ padding: '20px', textAlign: 'center' }}>Loading Account Overview...</div>}>
            <AccountOverview />
          </Suspense>
        );
      case 'transactions':
        return (
          <Suspense fallback={<div style={{ padding: '20px', textAlign: 'center' }}>Loading Transactions...</div>}>
            <TransactionDetails selectedTransaction={selectedTransaction} />
          </Suspense>
        );
      default:
        return <div style={{ padding: '20px', textAlign: 'center' }}>Select a section from the navigation</div>;
    }
  };

  return (
    <ApolloProvider client={client}>
      <Layout
        currentSection={currentSection}
        onNavigate={handleNavigate}
      >
        {renderContent()}
      </Layout>
    </ApolloProvider>
  );
};