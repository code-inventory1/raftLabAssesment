import React, { useState } from "react";
import { TransactionList } from "./components/TransactionList";

interface AppProps {
  selectedTransaction?: any;
}

const App: React.FC<AppProps> = ({ selectedTransaction }) => {
  return (
      <TransactionList selectedTransaction={selectedTransaction} />
  );
};

export default App;
