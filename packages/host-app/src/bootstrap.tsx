import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { eventBus } from './utils/eventBus';

console.log('Bootstrap is running!');

// const App = () => {
//   console.log('App component rendering');
//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>🏦 Bank Portal is Working!</h1>
//       <p>✅ React is mounted</p>
//       <p>✅ Host app is running</p>
//       <p>✅ Module Federation is working</p>
//     </div>
//   );
// };

console.log('Looking for root element...');

(window as any).eventBus = eventBus;

console.log('EventBus attached to window:', eventBus);
const container = document.getElementById('root');

if (container) {
  console.log('Root element found!');
  const root = createRoot(container);
  root.render(<App />);
  console.log('App rendered successfully!');
} else {
  console.error('ROOT ELEMENT NOT FOUND!');
}