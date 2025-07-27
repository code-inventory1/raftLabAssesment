declare module 'accountOverview/App' {
  const AccountOverview: React.ComponentType<any>;
  export default AccountOverview;
}

declare module 'transactionDetails/App' {
  interface TransactionDetailsProps {
    selectedTransaction?: any;
  }
  const TransactionDetails: React.ComponentType<TransactionDetailsProps>;
  export default TransactionDetails;
}

declare module '@bank-portal/ui-kit' {
  export interface ViewProps {
    style?: any;
    children?: React.ReactNode;
  }

  export interface TextProps {
    style?: any;
    children?: React.ReactNode;
    variant?: 'heading' | 'subheading' | 'body' | 'caption';
  }

  export const View: React.ComponentType<ViewProps>;
  export const Text: React.ComponentType<TextProps>;
  export const Card: React.ComponentType<ViewProps>;
  export const Button: React.ComponentType<any>;
}