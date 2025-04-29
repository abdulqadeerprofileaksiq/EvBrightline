import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from "react-native-size-matters";
import { COLOR } from "../../constants/colors";
import { FONT } from "../../constants/font"; // Make sure this import exists
import HeadingText from "../../components/global/HeadingText";
import RegularText from "../../components/global/RegularText";
import Button from "../../components/global/Button";
import { useRouter, useLocalSearchParams } from "expo-router";

// Import assets
import SuccessIcon from "../../assets/images/Successmark.png"; 

const SuccessScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  // Get the amount from params or default to $13
  const amount = params.amount || "$13";

  // Navigation handler
  const handleGoHome = () => {
    router.replace("/(tabs)/Home");
  };

  // Create the message with styled amount
  const renderMessage = () => {
    return (
      <Text style={styles.messageText}>
        Your <Text style={styles.highlightedAmount}>{amount}</Text> payment has been processed—fast, secure, and done! Time to hit the road!
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Success Icon - Centered */}
        <View style={styles.iconContainer}>
          <Image 
            source={SuccessIcon}
            style={styles.successImage}
            resizeMode="contain"
          />
        </View>
        
        {/* Success Message */}
        <View style={styles.messageContainer}>
          <HeadingText
            text="Payment Confirmed!"
            textStyles={styles.titleText}
          />
          {renderMessage()}
        </View>
        
        {/* Back to Home Button */}
        <Button
          style={styles.btn}
          title="Back to Home"
          onPress={handleGoHome}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(16),
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateVerticalScale(22),
  },
  successImage: {
    width: scale(120),
    height: scale(120),
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: moderateVerticalScale(20),
  },
  messageText: {
    color: COLOR.darkGray,
    fontSize: moderateScale(16),
    textAlign: 'center',
    paddingHorizontal: scale(20),
    lineHeight: moderateScale(22),
    fontFamily: FONT.regular,
  },
  highlightedAmount: {
    color: COLOR.amber,
    fontWeight: 'bold',
    fontFamily: FONT.semiBold,
  },
  titleText: {
    marginBottom: moderateVerticalScale(16),
    textAlign: 'center',
    fontSize: moderateScale(24),
  },
  btn: {
    width: "100%",
  },
});

export default SuccessScreen;