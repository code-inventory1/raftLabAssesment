import React, { useState, useEffect, Suspense } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Layout } from './components/Layout';
import { eventBus } from './utils/eventBus';

const AccountOverview = React.lazy(() => import('accountOverview/App'));
const TransactionDetails = React.lazy(() => import('transactionDetails/App'));

// ✅ Better environment variable handling with fallbacks
const getGraphQLUrl = () => {
  // Check if we have the full URL from environment
  if (process.env.BACKEND_GRAPHQL_URL) {
    return `${process.env.BACKEND_GRAPHQL_URL}/graphql`;
  }

  // Fallback: build URL from parts
  const protocol = process.env.PROTOCOL || 'http';
  const hostIP = process.env.HOST_IP || 'localhost';
  const port = process.env.BACKEND_PORT || '4000';

  return `${protocol}://${hostIP}:${port}/graphql`;
};

const GRAPHQL_URL = getGraphQLUrl();


const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
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