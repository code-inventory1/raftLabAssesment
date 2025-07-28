import { Alert } from 'react-native';

interface Transaction {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  date: string;
  accountId: string;
}

export const usePlatformActions = (transactions: Transaction[]) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleDownloadCSV = () => {
    console.log('🖥️ Desktop: Downloading CSV');

    const csvContent = [
      'Date,Description,Type,Amount',
      ...transactions.map((t: Transaction) =>
        `${formatDate(t.date)},${t.description},${t.type},${t.amount}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transactions.csv';
    link.click();
    window.URL.revokeObjectURL(url);

    Alert.alert('Success', 'CSV file downloaded successfully!');
  };

const handleMobileShare = () => {
  const formattedTransactions = transactions.map((t: Transaction) => {
    const formattedDate = formatDate(t.date);
    const typeSymbol = t.type === 'CREDIT' ? '+' : '-';
    return `${formattedDate} | ${t.description} | ${t.type} | ${typeSymbol}${formatCurrency(t.amount)}`;
  });

  const shareText = [
    `🧾 Banking Transaction Report`,
    `📅 Generated: ${new Date().toLocaleDateString()}`,
    `📊 Total Transactions: ${transactions.length}`,
    '',
    '📌 Transactions:',
    ...formattedTransactions
  ].join('\n');

  const shareData = {
    title: 'Transaction Data',
    text: shareText,
  };

  if (navigator.share) {
  navigator.share(shareData)
    .then(() => {
      console.log('✅ Shared successfully');
      Alert.alert('Success', 'Transaction data shared successfully!');
    })
    .catch(err => {
      console.log('❌ Share failed:', err);
      fallbackMobileShare(shareData);
    });
} else {
  console.log('❌ Web Share API not supported');
  fallbackMobileShare(shareData);
}

};



 const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);



  // const fallbackMobileShare = (shareData: any) => {
  //   Alert.alert(
  //     'Share Transaction Data',
  //     shareData.text,
  //     [
  //       { text: 'Cancel', style: 'cancel' },
  //       {
  //         text: 'Copy to Clipboard',
  //         onPress: () => {
  //           if (navigator.clipboard) {
  //             navigator.clipboard.writeText(shareData.text);
  //             Alert.alert('Copied!', 'Transaction data copied to clipboard');
  //           } else {
  //             console.log('Clipboard API not available');
  //             Alert.alert('Info', 'Clipboard not available on this device');
  //           }
  //         }
  //       }
  //     ]
  //   );
  // };

  const fallbackMobileShare = (shareData: any) => {
  Alert.alert(
    'Share Transaction Data',
    shareData.text,
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Copy to Clipboard',
        onPress: () => {
          if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(shareData.text)
              .then(() => {
                Alert.alert('Copied!', 'Transaction data copied to clipboard');
              })
              .catch(() => {
                Alert.alert('Error', 'Failed to copy text');
              });
          } else {
            Alert.alert('Not Supported', 'Clipboard not available');
          }
        }
      }
    ]
  );
};
  return {
    handleDownloadCSV,
    handleMobileShare
  };
};