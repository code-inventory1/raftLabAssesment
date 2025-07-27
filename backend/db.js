module.exports = {
    customers: [
      { id: '1', name: 'John Doe', email: 'john.doe@email.com' },
      { id: '2', name: 'Jane Smith', email: 'jane.smith@email.com' },
      { id: '3', name: 'Bob Johnson', email: 'bob.johnson@email.com' }
    ],
    accounts: [
      { id: '1', customerId: '1', accountNumber: '1234567890', balance: 5000.50, currency: 'USD' },
      { id: '2', customerId: '1', accountNumber: '0987654321', balance: 2500.75, currency: 'USD' },
      { id: '3', customerId: '2', accountNumber: '1122334455', balance: 10000.00, currency: 'USD' }
    ],
    transactions: [
      { id: '1', accountId: '1', type: 'CREDIT', amount: 1000.00, description: 'Salary Deposit', date: '2024-01-15T10:00:00Z' },
      { id: '2', accountId: '1', type: 'DEBIT', amount: 250.00, description: 'Grocery Store', date: '2024-01-14T15:30:00Z' },
      { id: '3', accountId: '1', type: 'DEBIT', amount: 50.00, description: 'ATM Withdrawal', date: '2024-01-13T09:15:00Z' },
      { id: '4', accountId: '1', type: 'CREDIT', amount: 500.00, description: 'Tax Refund', date: '2024-01-12T14:45:00Z' },
      { id: '5', accountId: '2', type: 'DEBIT', amount: 1200.00, description: 'Rent Payment', date: '2024-01-10T08:00:00Z' },
      { id: '6', accountId: '2', type: 'CREDIT', amount: 2000.00, description: 'Investment Dividend', date: '2024-01-09T11:30:00Z' }
    ]
  };