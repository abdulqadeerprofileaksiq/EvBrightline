import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../../components/global/Header';
import { ScaledSheet } from 'react-native-size-matters';
import NoResult from '../../components/global/NoResult';

const TRANSACTIONS = [
  {
    id: '1',
    cardType: 'Master card',
    cardNumber: '3456',
    date: '25/02/2024',
    amount: 25,
    processor: 'stripe',
    icon: require('../../assets/images/payment/mastercard.png'),
  },
  {
    id: '2',
    cardType: 'Visa',
    cardNumber: '3456',
    date: '25/02/2024',
    amount: 35,
    processor: 'stripe',
    icon: require('../../assets/images/payment/visa.png'),
  },
  {
    id: '3',
    cardType: 'PayPal',
    cardNumber: '3456',
    date: '25/02/2024',
    amount: 15,
    processor: 'stripe',
    icon: require('../../assets/images/payment/paypal.png'),
  },
  {
    id: '4',
    cardType: 'Master card',
    cardNumber: '3456',
    date: '25/02/2024',
    amount: 23,
    processor: 'stripe',
    icon: require('../../assets/images/payment/mastercard.png'),
  },
  {
    id: '5',
    cardType: 'Master card',
    cardNumber: '3456',
    date: '25/02/2024',
    amount: 34,
    processor: 'stripe',
    icon: require('../../assets/images/payment/mastercard.png'),
  },
  {
    id: '6',
    cardType: 'Master card',
    cardNumber: '3456',
    date: '25/02/2024',
    amount: 30,
    processor: 'stripe',
    icon: require('../../assets/images/payment/mastercard.png'),
  },
];

const TransactionItem = ({ item, onPress }) => (
  <TouchableOpacity 
    style={styles.transactionItem}
    onPress={() => onPress(item)}
  >
    <View style={styles.transactionLeft}>
      <Image source={item.icon} style={styles.cardIcon} />
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{item.cardType} {item.cardNumber}</Text>
        <Text style={styles.dateText}>Date {item.date}</Text>
        <Text style={styles.amountText}>${item.amount} <Text style={styles.viaText}>via {item.processor}</Text></Text>
      </View>
    </View>
    
    <View style={styles.transactionRight}>     
      <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
    </View>
  </TouchableOpacity>
);

const TransactionHistory = () => {
  const router = useRouter();
  
  // Check if there are transactions
  const hasTransactions = TRANSACTIONS && TRANSACTIONS.length > 0;
  
  const handleTransactionPress = (transaction) => {
    // Navigate based on card type
    switch(transaction.cardType) {
      case 'Master card':
        router.push('/chargingSummary');
        break;
      case 'Visa':
        router.push('/chargingSummary');
        break;
      case 'PayPal':
        router.push('/chargingSummary');
        break;
      default:
        router.push('/chargingSummary');
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <Header text="Transaction History" />
      
      {hasTransactions ? (
        <FlatList
          data={TRANSACTIONS}
          renderItem={({ item }) => (
            <TransactionItem 
              item={item} 
              onPress={handleTransactionPress}
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <NoResult
          image={require('../../assets/images/transactionnodata.png')}
          title="No Transactions Yet!"
          message="Your payment history will appear here after your first transaction."
        />
      )}
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: '16@s',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '16@vs',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Change from 'center' to 'flex-start' to align at the top
  },
  cardIcon: {
    width: '28@s',
    height: '20@vs',
    resizeMode: 'contain',
    marginTop: '4@vs', // Add top margin to align with the first line of text
  },
  cardDetails: {
    marginLeft: '12@s',
  },
  cardTitle: {
    fontSize: '16@s',
    fontWeight: '500',
  },
  dateText: {
    fontSize: '12@s',
    color: '#888888',
    marginTop: '2@vs',
  },
  transactionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontSize: '16@s',
    fontWeight: '500',
    color: '#F0A500',
    marginRight: '8@s',
  },
  viaText: {
    fontSize: '14@s',
    fontWeight: '400',
    color: '#888888',
  },
  separator: {
    height: '1@vs',
    backgroundColor: '#F0F0F0',
  },
});

export default TransactionHistory;