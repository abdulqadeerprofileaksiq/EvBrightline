import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CreatePassword from '../../components/global/createPassword';

const CreatePasswordScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CreatePassword />
    </SafeAreaView>
  );
};

export default CreatePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});