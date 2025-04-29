import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useRouter } from 'expo-router';
import Header from '../../components/global/Header';

const MyVehicles = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header text="My Vehicles" showBackButton={true} />
      
      {/* Your My Vehicles content will go here */}
    </View>
  );
};

export default MyVehicles;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});