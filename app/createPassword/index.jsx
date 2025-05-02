import React from 'react';
import { View, StyleSheet } from 'react-native';
import CreatePassword from '../../components/global/createPassword';

const CreatePasswordScreen = () => {
  return (
    <View style={styles.container}>
      <CreatePassword />
    </View>
  );
};

export default CreatePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});