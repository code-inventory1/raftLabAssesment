# Enterprise Banking Portal - Backend API

## 🏦 Overview

GraphQL-based backend API for the Enterprise Banking Portal that provides banking data including account information, customer details, and transaction history. Built with Node.js, Express, and GraphQL.

## 🚀 Features

- **GraphQL API** - Single endpoint for all data operations
- **Account Management** - Customer account information and balances
- **Transaction History** - Complete transaction records with filtering
- **Real-time Data** - Live banking data simulation
- **CORS Support** - Cross-origin requests for micro frontend architecture
- **Mock Data** - Comprehensive test data for development

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🛠 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Verify the server is running**
   - GraphQL Playground: http://localhost:4000/graphql
   - Health Check: http://localhost:4000/health

## 📡 API Endpoints

### GraphQL Endpoint
- **URL**: `http://localhost:4000/graphql`
- **Method**: POST
- **Content-Type**: application/json

### Health Check
- **URL**: `http://localhost:4000/health`
- **Method**: GET
- **Response**: Server status and timestamp

## 🔍 GraphQL Schema

### Types

#### Account
```graphql
type Account {
  id: ID!
  accountNumber: String!
  balance: Float!
  currency: String!
  customer: Customer!
  transactions: [Transaction!]!
}
```

#### Customer
```graphql
type Customer {
  id: ID!
  name: String!
  email: String!
}
```

#### Transaction
```graphql
type Transaction {
  id: ID!
  accountId: String!
  type: TransactionType!
  amount: Float!
  description: String!
  date: String!
}
```

#### TransactionType
```graphql
enum TransactionType {
  CREDIT
  DEBIT
}
```

### Queries

#### Get Account by ID
```graphql
query GetAccount($accountId: ID!) {
  account(id: $accountId) {
    id
    accountNumber
    balance
    currency
    customer {
      id
      name
      email
    }
    transactions {
      id
      type
      amount
      description
      date
    }
  }
}
```

#### Get All Transactions
```graphql
query GetAllTransactions {
  allTransactions {
    id
    accountId
    type
    amount
    description
    date
  }
}
```

#### Get Recent Transactions
```graphql
query GetRecentTransactions($accountId: ID!, $limit: Int) {
  recentTransactions(accountId: $accountId, limit: $limit) {
    id
    type
    amount
    description
    date
  }
}
```

## 💾 Sample Data

The backend includes comprehensive mock data:

### Account Data
- **Account ID**: "1"
- **Account Number**: "1234567890"
- **Balance**: $15,750.25
- **Currency**: USD
- **Customer**: John Doe (john.doe@email.com)

### Transaction Data
- 15+ sample transactions
- Mix of CREDIT and DEBIT transactions
- Various amounts and descriptions
- Recent dates for testing

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:

```env
PORT=4000
NODE_ENV=development
GRAPHQL_PLAYGROUND=true
```

### CORS Configuration
The server is configured to accept requests from:
- `http://localhost:3000` (Host App)
- `http://localhost:3001` (Account Overview)
- `http://localhost:3002` (Transaction Details)
- Network IP addresses for mobile testing

## 🧪 Testing

### Using GraphQL Playground
1. Open http://localhost:4000/graphql
2. Use the built-in query explorer
3. Test different queries and mutations

### Sample Queries for Testing

**Get Account Information:**
```graphql
query {
  account(id: "1") {
    accountNumber
    balance
    currency
    customer {
      name
      email
    }
  }
}
```

**Get Recent Transactions:**
```graphql
query {
  recentTransactions(accountId: "1", limit: 3) {
    id
    type
    amount
    description
    date
  }
}
```

**Get All Transactions:**
```graphql
query {
  allTransactions {
    id
    accountId
    type
    amount
    description
    date
  }
}
```

## 📱 Mobile Development

For mobile testing, the server binds to all network interfaces:
- **Host**: `0.0.0.0` (accepts external connections)
- **Mobile Access**: `http://YOUR_IP_ADDRESS:4000/graphql`

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## 📦 Dependencies

### Core Dependencies
- **apollo-server-express** - GraphQL server implementation
- **express** - Web application framework
- **graphql** - GraphQL implementation
- **cors** - Cross-origin resource sharing

### Development Dependencies
- **nodemon** - Development server with auto-restart
- **@types/node** - TypeScript definitions

## 🔒 Security Considerations

- CORS is configured for development (allow all origins)
- In production, restrict CORS to specific domains
- Implement authentication and authorization
- Add rate limiting for API endpoints
- Validate and sanitize all inputs

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 4000
npx kill-port 4000
# Or change port in .env file
```

**CORS errors:**
- Verify CORS configuration includes your frontend URLs
- Check that origins match exactly (including protocol and port)

**GraphQL errors:**
- Use GraphQL Playground to test queries
- Check server logs for detailed error messages
- Verify query syntax and variable types

### Debug Mode
Enable detailed logging:
```bash
DEBUG=* npm run dev
```

## 📚 API Documentation

Full API documentation is available through GraphQL Playground's built-in schema explorer at http://localhost:4000/graphql

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.