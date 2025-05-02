import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, StatusBar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

const TransactionItem = ({ item }) => (
  <TouchableOpacity style={styles.transactionItem}>
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

const TransactionHistory = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction History</Text>
      </View>
      
      <FlatList
        data={TRANSACTIONS}
        renderItem={({ item }) => <TransactionItem item={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 28,
    height: 20,
    resizeMode: 'contain',
  },
  cardDetails: {
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  dateText: {
    fontSize: 12,
    color: '#888888',
    marginTop: 2,
  },
  transactionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#F0A500',
    marginRight: 8,
  },
  viaText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#888888',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
});

export default TransactionHistory;