import React from 'react';
import { View } from 'react-native';
import SlideButton from 'rn-slide-button';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import COLOR from '../../constants/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { FONT } from '../../constants/font';

const SlideButoon = ({ 
  title = "Slide to finish", 
  onComplete,
  borderRadius = 12,
  completeThreshold = 80
}) => {
  return (
    <View style={styles.slideButtonContainer}>
      <SlideButton 
        title={title}
        titleStyle={styles.buttonText}
        height={moderateScale(56)} // Fixed height matching standard Button
        borderRadius={borderRadius}
        completeThreshold={completeThreshold}
        thumbStyle={styles.thumbStyle}
        containerStyle={styles.slideButtonStyle}
        underlayStyle={styles.underlayStyle}
        underlayColor="white"
        reverseSlideEnabled={true}
        animation={true}
        onReachedToEnd={onComplete}
        icon={<AntDesign name="arrowright" size={24} color="white" />}
      />
    </View>
  );
};

export default SlideButoon;

const styles = ScaledSheet.create({
  slideButtonContainer: {
    width: '100%',
  },
  slideButtonStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLOR.lightGray,
    borderRadius: '12@s',
    elevation: 0,
    shadowOpacity: 0,
    height: '56@ms', 
  },
  underlayStyle: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: 'white',
  },
  thumbStyle: {
    backgroundColor: COLOR.amber,
    borderRadius: '8@s',
    elevation: 0,
    shadowOpacity: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: FONT.semiBold,
    color: '#6E737F',
    textAlign: 'center',
  },
});