import React from 'react';
import { StyleSheet } from 'react-native';
import Success from '../../components/global/success';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const SuccessGlobalScreen = () => {
  const { source } = useLocalSearchParams();
  
  return (
    <SafeAreaView style={styles.container}>
      <Success source={source} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default SuccessGlobalScreen;