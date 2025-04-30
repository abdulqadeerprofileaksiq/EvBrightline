import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import HeadingText from './HeadingText';
import RegularText from './RegularText';
import { COLOR } from '../../constants/colors';
import { FONT } from '../../constants/font';

/**
 * NoResult Component - Reusable component to show when no results are found
 */
const NoResult = ({
  image,
  title = "No Results Found",
  message = "We couldn't find what you were looking for.",
  showButton = false,
  buttonText = "Add New",
  onButtonPress = () => {}
}) => {
  return (
    <View style={styles.container}>
      <Image 
        source={image}
        style={styles.image}
        resizeMode="contain"
      />
      <HeadingText
        text={title}
        textStyles={styles.title}
      />
      <RegularText
        text={message}
        textStyles={styles.message}
      />
      
      {showButton && (
        <TouchableOpacity 
          style={styles.button}
          onPress={onButtonPress}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '43@s',
  },
  image: {
    width: '160@s',
    height: '160@s',
    marginBottom: '24@vs',
  },
  title: {
    fontSize: '24@s',
    textAlign: 'center',
    marginBottom: '16@vs',
  },
  message: {
    fontSize: '16@s',
    textAlign: 'center',
    color: COLOR.darkGray,
    lineHeight: '24@s',
  },
  button: {
    paddingVertical: '8@vs',
    paddingHorizontal: '16@s',
  },
  buttonText: {
    fontFamily: FONT.semiBold,
    fontSize: '16@ms',
    color: COLOR.amber,
  }
});

export default NoResult;
