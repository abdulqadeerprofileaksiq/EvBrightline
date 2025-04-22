import { View, Text } from 'react-native';
import React from 'react';
import { ScaledSheet } from 'react-native-size-matters';

const OpenCloseIndicator = ({ status = 'Open' }) => {
  const isOpen = status.toLowerCase() === 'open';
  
  return (
    <View style={styles.container}>
      {/* Show only one status box based on current status */}
      <View style={[
        styles.statusBox, 
        isOpen ? styles.openBox : styles.closedBox
      ]}>
        <Text style={[
          styles.statusText, 
          isOpen ? styles.openText : styles.closedText
        ]}>
          {isOpen ? 'Open' : 'Closed'}
        </Text>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBox: {
    width: '50@s',
    height: '20@ms',
    borderRadius: '2@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  openBox: {
    backgroundColor: '#B8EBC7', 
  },
  closedBox: {
    backgroundColor: '#FFCCCB',
  },
  statusText: {
    fontSize: '10@ms0.3',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: '0.5@ms',
  },
  openText: {
    color: '#2D9443', 
  },
  closedText: {
    color: '#E92B2E', 
  },
});

export default OpenCloseIndicator;