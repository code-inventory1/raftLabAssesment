import { useQuery, gql } from '@apollo/client';

const GET_TRANSACTIONS = gql`
  query GetTransactions {
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

export const useTransactionData = () => {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS, {
    errorPolicy: 'all', // Show partial results even if there are errors
  });

  const transactions = data?.allTransactions
    ?.slice()
    ?.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    transactions: transactions || [],
    loading,
    error,
  };
};