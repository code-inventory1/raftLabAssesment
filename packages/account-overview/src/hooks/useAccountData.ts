import { useQuery, gql } from '@apollo/client';

const GET_ACCOUNT_WITH_TRANSACTIONS = gql`
  query GetAccountWithTransactions($accountId: ID!, $customerId: ID!) {
    Account(id: $accountId) {
      id
      accountNumber
      balance
      currency
      customerId
    }
    Customer(id: $customerId) {
      id
      name
      email
    }
    allTransactions {
      id
      accountId
      type
      amount
      description
      date
    }
  }
`;

export const useAccountData = (accountId: string = '1') => {
  const { data, loading, error } = useQuery(GET_ACCOUNT_WITH_TRANSACTIONS, {
    variables: {
      accountId,
      customerId: '1' // In a real app, you'd get this from the account data
    },
    errorPolicy: 'all',
  });

  // Filter transactions for this account and get recent ones
  const accountTransactions = data?.allTransactions?.filter(
    (transaction: any) => transaction.accountId === accountId
  );

  const recentTransactions = accountTransactions
    ?.slice()
    ?.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    ?.slice(0, 3);

  // Combine account and customer data
  const account = data?.Account ? {
    ...data.Account,
    customer: data.Customer
  } : null;

  return {
    account,
    recentTransactions,
    loading,
    error,
  };
};