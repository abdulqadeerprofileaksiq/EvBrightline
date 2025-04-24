import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import ConnectionIssueSheet from '../../context/alertContext/alert';

const Profile = () => {
  const bottomSheetRef = useRef(null);

  const handleShowSheet = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleCloseSheet = () => {
    console.log('Sheet closed');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={handleShowSheet}
        style={styles.button}
      >
        <Text>Start Charging</Text>
      </TouchableOpacity>

      <ConnectionIssueSheet 
        ref={bottomSheetRef}
        onClose={handleCloseSheet}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  }
})

export default Profile