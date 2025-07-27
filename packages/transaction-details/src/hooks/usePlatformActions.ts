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
    const shareData = {
      title: 'Transaction Data',
      text: `Banking Transaction Report\nTotal Transactions: ${transactions.length}\nGenerated: ${new Date().toLocaleDateString()}`,
    };

    // Try Web Share API first
    if (navigator.share) {
      navigator.share(shareData)
        .then(() => {
          console.log('✅ Shared successfully via Web Share API');
          Alert.alert('Success', 'Transaction data shared successfully!');
        })
        .catch(err => {
          console.log('❌ Web Share failed:', err);
          fallbackMobileShare(shareData);
        });
    } else {
      fallbackMobileShare(shareData);
    }
  };

  const fallbackMobileShare = (shareData: any) => {
    Alert.alert(
      'Share Transaction Data',
      shareData.text,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Copy to Clipboard',
          onPress: () => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(shareData.text);
              Alert.alert('Copied!', 'Transaction data copied to clipboard');
            } else {
              console.log('Clipboard API not available');
              Alert.alert('Info', 'Clipboard not available on this device');
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