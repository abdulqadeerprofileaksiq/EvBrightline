import React from 'react';
import { View, StyleSheet } from 'react-native';
import Otp from '../../components/global/otp';

const VerificationScreen = () => {
  return (
    <View style={styles.container}>
      <Otp />
    </View>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});