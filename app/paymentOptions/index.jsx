import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScaledSheet } from 'react-native-size-matters';
import { useRouter } from 'expo-router';
import Header from '../../components/global/Header';
import { COLOR } from '../../constants/colors';
import Expandable from '../../components/global/expandable';
import NoResult from '../../components/global/NoResult';

const PaymentOptions = () => {
  const router = useRouter();
  const [expandedPayment, setExpandedPayment] = useState('');

  // Payment methods data
  const paymentMethods = [
    {
      id: 'visa1',
      name: 'Visa Card',
      licensePlate: '**** **** **** 4242', // This will act as the card number
      image: require('../../assets/images/payment/visa.png'),
      brand: 'Visa',
      model: 'Credit Card',
      batteryCapacity: 'John Doe', // Using existing fields for payment details
      range: '04/25', // Expiration date
      connectorType: '123', // CVV
      isPrimary: true,
      deleteTitle: "Remove Card"
    },
    {
      id: 'mastercard1',
      name: 'Mastercard',
      licensePlate: '**** **** **** 5555',
      image: require('../../assets/images/payment/mastercard.png'),
      brand: 'Mastercard',
      model: 'Debit Card',
      batteryCapacity: 'John Doe',
      range: '12/24',
      connectorType: '321',
      isPrimary: false,
      deleteTitle: "Remove Card"
    },
    {
      id: 'paypal1',
      name: 'PayPal Account',
      licensePlate: 'johndoe@example.com',
      image: require('../../assets/images/payment/paypal.png'),
      brand: 'PayPal',
      model: 'Online Payment',
      batteryCapacity: 'John Doe',
      range: 'N/A',
      connectorType: 'N/A',
      isPrimary: false,
      deleteTitle: "Remove Account"
    }
  ];

  const handlePaymentClick = (paymentId) => {
    if (expandedPayment === paymentId) {
      setExpandedPayment(null);
    } else {
      setExpandedPayment(paymentId);
    }
  };

  const handleAddNewPayment = () => {
    console.log("Add new payment method");
    // Navigate to add payment screen
    // router.push('/addPayment');
  };

  const handleDeletePayment = (paymentId) => {
    console.log("Delete payment method", paymentId);
  };

  const handleTogglePrimary = (paymentId) => {
    console.log("Toggle primary payment method", paymentId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header
          text="Payment Options"
          showAddNew={true}
          onAddNew={handleAddNewPayment}
        />

        {paymentMethods && paymentMethods.length > 0 ? (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            {paymentMethods.map((payment, index) => (
              <Expandable
                key={payment.id}
                item={payment}
                isExpanded={expandedPayment === payment.id}
                onPress={handlePaymentClick}
                onDelete={handleDeletePayment}
                onTogglePrimary={handleTogglePrimary}
                isFirst={index === 0}
                deleteTitle={payment.deleteTitle}
                imageStyle={{ width: 35, height: 27 }} // Payment card image sizing
                extraFields={[
                  { label: "Card Holder", value: payment.batteryCapacity },
                  { label: "Expiration Date", value: payment.range }
                ]}
              />
            ))}
          </ScrollView>
        ) : (
          <NoResult
            image={require('../../assets/images/payment/nodataimg.png')}
            title="Your Wallet Awaits!"
            message="Add a card for fast, secure checkouts."
            showButton={true}
            buttonText="+Add New"
            onButtonPress={handleAddNewPayment}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default PaymentOptions;