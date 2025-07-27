# Enterprise Banking Portal - Micro Frontend Architecture

## 🏗️ Overview

A modern Enterprise Banking Portal built using Micro Frontend architecture with Module Federation. The application consists of multiple independent, deployable micro frontends that communicate seamlessly to provide a unified banking experience.

## 🎯 Architecture

### Micro Frontend Components

1. **Host App** (`packages/host-app`) - Main shell application
2. **Account Overview** (`packages/account-overview`) - Customer account summary
3. **Transaction Details** (`packages/transaction-details`) - Transaction history and details
4. **UI Kit** (`packages/ui-kit`) - Shared component library

### Technology Stack

- **Framework**: React 18 with TypeScript
- **Cross-Platform**: React Native with react-native-web
- **Module Federation**: Webpack 5 Module Federation
- **State Management**: Apollo Client for GraphQL
- **Styling**: React Native StyleSheet (cross-platform)
- **Build Tools**: Webpack 5, TypeScript, ts-loader

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- GraphQL backend running on port 4000

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd enterprise-banking-portal
   ```

2. **Install dependencies for all packages**
   ```bash
   # Install all dependencies
   npm install

   # Or install each package individually
   cd packages/ui-kit && npm install
   cd ../host-app && npm install
   cd ../account-overview && npm install
   cd ../transaction-details && npm install
   ```

3. **Build the UI Kit**
   ```bash
   cd packages/ui-kit
   npm run build
   ```

4. **Start all services**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```

   **Terminal 2 - Account Overview:**
   ```bash
   cd packages/account-overview
   npm start
   ```

   **Terminal 3 - Transaction Details:**
   ```bash
   cd packages/transaction-details
   npm start
   ```

   **Terminal 4 - Host App:**
   ```bash
   cd packages/host-app
   npm start
   ```

5. **Access the application**
   - **Desktop**: http://localhost:3000
   - **Mobile**: http://YOUR_IP_ADDRESS:3000

## 🏛️ Micro Frontend Architecture

### Host App (Shell)
- **Port**: 3000
- **Role**: Application shell and router
- **Features**:
  - Navigation between micro frontends
  - Global state management
  - Event bus for inter-MF communication
  - Apollo Client setup

### Account Overview MF
- **Port**: 3001
- **Role**: Account summary and recent transactions
- **Features**:
  - Customer account information
  - Account balance display
  - Last 3 recent transactions
  - Transaction selection events

### Transaction Details MF
- **Port**: 3002
- **Role**: Detailed transaction management
- **Features**:
  - Complete transaction history
  - Individual transaction details
  - Platform-specific actions (CSV download/Mobile share)
  - Cross-platform compatibility

### UI Kit
- **Role**: Shared component library
- **Components**:
  - View, Text, Card, Button
  - Cross-platform React Native components
  - Consistent styling and theming

## 📱 Cross-Platform Support

### React Native Primitives
All micro frontends use React Native primitives for true cross-platform compatibility:

```typescript
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Card, Button } from '@bank-portal/ui-kit';
```

### Platform-Specific Features

**Desktop (Web):**
- CSV download functionality
- Browser-specific APIs
- Mouse interactions

**Mobile (React Native Web):**
- Native share sheets
- Touch interactions
- Mobile-optimized layouts

### Platform Detection
```typescript
// Automatic platform detection
const isMobile = useMobileDetection();

// Platform-specific rendering
{isMobile ? (
  <Button title="Share (Mobile)" onPress={handleMobileShare} />
) : (
  <Button title="Download CSV (Desktop)" onPress={handleDownloadCSV} />
)}
```

## 🔄 Inter-Micro Frontend Communication

### Event Bus System
Micro frontends communicate through a global event bus:

```typescript
// Account Overview - Emit event
eventBus.emit('transaction:select', transaction);

// Transaction Details - Listen for event
eventBus.on('transaction:select', handleTransactionSelect);
```

### Events
- `transaction:select` - Navigate to transaction details

## 📊 Data Fetching

### GraphQL Integration
All micro frontends use Apollo Client for data fetching:

```typescript
// Custom hooks for data fetching
const { account, recentTransactions, loading, error } = useAccountData('1');
const { transactions, loading, error } = useTransactionData();
```

### API Endpoints
- **Desktop**: `http://localhost:4000/graphql`
- **Mobile**: `http://YOUR_IP_ADDRESS:4000/graphql`

## 🧩 Module Federation Configuration

### Host App Configuration
```javascript
new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    accountOverview: 'accountOverview@http://localhost:3001/remoteEntry.js',
    transactionDetails: 'transactionDetails@http://localhost:3002/remoteEntry.js',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
    '@apollo/client': { singleton: true },
    '@bank-portal/ui-kit': { singleton: true },
  },
})
```

### Micro Frontend Configuration
```javascript
new ModuleFederationPlugin({
  name: 'accountOverview',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App.tsx',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
    '@bank-portal/ui-kit': { singleton: true },
  },
})
```

## 🎨 Component Architecture

### Atomic Design Pattern
```
Components/
├── transaction-components/
│   ├── TransactionListHeader.tsx
│   ├── TransactionListItem.tsx
│   └── TransactionDetails.tsx
├── hooks/
│   ├── useMobileDetection.ts
│   ├── usePlatformActions.ts
│   └── useTransactionData.ts
└── utils/
    └── eventBus.ts
```

### Custom Hooks
- `useMobileDetection()` - Platform detection
- `usePlatformActions()` - Platform-specific functionality
- `useAccountData()` - Account information fetching
- `useTransactionData()` - Transaction data fetching

## 📱 Mobile Development

### Setup for Mobile Testing

1. **Configure network access**
   ```bash
   # Host app with network IP
   cd packages/host-app
   HOST_IP=192.168.1.100 npm start
   ```

2. **Update backend for network access**
   ```javascript
   // Backend server.js
   app.listen(4000, '0.0.0.0', () => {
     console.log('Server running on http://0.0.0.0:4000');
   });
   ```

3. **Test on mobile browser**
   - Connect phone to same WiFi
   - Navigate to `http://YOUR_IP_ADDRESS:3000`

### Mobile-Specific Features
- **Touch interactions** - Tap, swipe, scroll
- **Responsive design** - Adapts to screen sizes
- **Native sharing** - Web Share API integration
- **Platform detection** - Automatic mobile/desktop detection

## 🧪 Testing

### Component Testing
```bash
# Run tests for specific micro frontend
cd packages/account-overview
npm test

cd packages/transaction-details
npm test
```

### Integration Testing
1. Start all services
2. Test navigation between micro frontends
3. Verify event bus communication
4. Test platform-specific features

### Mobile Testing
1. Test on actual mobile devices
2. Verify touch interactions
3. Test platform-specific features
4. Check responsive design

## 🚀 Deployment
CI/CD Implications
1. Independent Deployment Cycles

Each micro frontend can be deployed independently
Reduces deployment risk and complexity
Enables faster feature delivery
Allows different teams to have different release schedules

2. Dependency Management

UI Kit updates require careful version management
Breaking changes need migration strategies
Shared dependencies must be coordinated

3. Testing Strategy
typescript// Integration testing across micro frontends
describe('Micro Frontend Integration', () => {
  test('should communicate between MFs via event bus', async () => {
    // Test event bus communication
    // Test shared state management
    // Test API integration
  });
});
4. Monitoring and Observability

Each MF needs independent monitoring
Distributed tracing across micro frontends
Performance monitoring for Module Federation
Error tracking and alerting

⚠️ Known Limitations/Issues & Future Improvements
Current Limitations
1. Development Complexity
Issue: Setting up and running multiple micro frontends locally is complex

Requires starting 4+ separate services
Network configuration needed for mobile testing
Dependency synchronization challenges

Impact: Developer onboarding takes longer, debugging is more complex
Mitigation:

Docker Compose setup for local development
Automated setup scripts
Comprehensive documentation


### Development
```bash
# Start all services
npm run dev:all
```

### Production Build
```bash
# Build all micro frontends
npm run build:all

# Deploy each micro frontend independently
npm run deploy:host
npm run deploy:account-overview
npm run deploy:transaction-details
```

### Docker Deployment
```dockerfile
# Example Dockerfile for micro frontend
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

## 🔧 Configuration

### Environment Variables
Create `.env` files for each micro frontend:

**Host App (.env):**
```env
HOST_IP=192.168.1.100
GRAPHQL_URL=http://192.168.1.100:4000/graphql
```

**Account Overview (.env):**
```env
GRAPHQL_URL=http://192.168.1.100:4000/graphql
```

### Development vs Production
- **Development**: All services run locally
- **Production**: Each micro frontend deployed independently
- **CDN**: Host static assets on CDN for better performance

## 🐛 Troubleshooting

### Common Issues

**Module Federation Loading Errors:**
```bash
# Check if remote micro frontends are running
curl http://localhost:3001/remoteEntry.js
curl http://localhost:3002/remoteEntry.js
```

**UI Kit Import Errors:**
```bash
# Rebuild UI kit
cd packages/ui-kit
npm run build

# Check exports
cat dist/index.js | head -20
```

**Mobile Access Issues:**
- Verify firewall settings
- Check network IP configuration
- Ensure all services bind to 0.0.0.0

### Debug Commands
```bash
# Check what's listening on ports
netstat -an | findstr :3000
netstat -an | findstr :3001
netstat -an | findstr :3002

# Clear webpack cache
rm -rf .webpack_cache node_modules/.cache
```

## 📊 Performance Optimization

### Code Splitting
- Each micro frontend loads independently
- Shared dependencies cached via Module Federation
- Dynamic imports for better performance

### Bundle Analysis
```bash
# Analyze bundle size
npm run analyze

# Check shared dependencies
npm run federation:analyze
```

## 🔒 Security

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' http://localhost:*">
```

### CORS Configuration
- Development: Allow all origins
- Production: Restrict to specific domains

## 📚 Documentation

### API Documentation
- GraphQL schema available at http://localhost:4000/graphql
- Component documentation in each package

### Architecture Decisions
- Why Micro Frontends: Independent deployment, team autonomy
- Why Module Federation: Runtime integration, shared dependencies
- Why React Native: Cross-platform code reuse

## 🤝 Contributing

### Development Workflow
1. Create feature branch
2. Make changes to specific micro frontend
3. Test integration with other MFs
4. Submit pull request

### Code Standards
- TypeScript for type safety
- React Native primitives for cross-platform
- ESLint + Prettier for code formatting
- Component testing with Jest



## 📄 License

This project is licensed under the MIT License.

## 🔗 Useful Links

- [Module Federation Documentation](https://webpack.js.org/concepts/module-federation/)
- [React Native Web](https://necolas.github.io/react-native-web/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Micro Frontend Architecture](https://micro-frontends.org/)