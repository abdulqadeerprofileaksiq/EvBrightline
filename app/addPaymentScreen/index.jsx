import { StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PaymentScreen from '../../components/global/PaymentScreen'

const AddPaymentScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <PaymentScreen/>
    </SafeAreaView>
  )
}

export default AddPaymentScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  }
})