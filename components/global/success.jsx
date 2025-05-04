import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";
import { COLOR } from "../../constants/colors";
import HeadingText from "../../components/global/HeadingText";
import RegularText from "../../components/global/RegularText";
import Button from "../../components/global/Button";
import { useRouter, useLocalSearchParams } from "expo-router";

// Import assets
import SuccessIcon from "../../assets/images/Successmark.png";

const Success = ({ source }) => {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Simple source handling - prop or param
  const screenSource = source || params.source || "default";
  
  // Define content based on source - simplified
  const content = {
    payment: {
      title: "Payment Confirmed!",
      message: "Your payment has been processed successfully.",
      buttonText: "Back to Home",
      navigateTo: "/(tabs)/Home"
    },
    createPassword: {
      title: "Password Changed!",
      message: "Your password has been changed successfully.",
      buttonText: "Back to Login",
      navigateTo: "/loginScreen"
    },
    default: {
      title: "Thanks! You're all Set.",
      message: "Your account has been created successfully.",
      buttonText: "Back to Login",
      navigateTo: "/loginScreen"
    }
  };
  
  // Get appropriate content
  const { title, message, buttonText, navigateTo } = content[screenSource] || content.default;
  
  // Navigation handler
  const handleNavigation = () => router.replace(navigateTo);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Success Icon */}
        <Image 
          source={SuccessIcon}
          style={styles.successImage}
          resizeMode="contain"
        />
        
        {/* Title */}
        <HeadingText text={title} textStyles={styles.titleText} />
        
        {/* Message */}
        <RegularText text={message} textStyles={styles.messageText} />
        
        {/* Button */}
        <Button
          style={styles.btn}
          title={buttonText}
          onPress={handleNavigation}
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
    paddingBottom: moderateVerticalScale(50),
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successImage: {
    width: scale(120),
    height: scale(120),
    marginBottom: moderateVerticalScale(22),
  },
  titleText: {
    marginBottom: moderateVerticalScale(16),
    textAlign: 'center',
    fontSize: moderateScale(24),
  },
  messageText: {
    color: COLOR.darkGray,
    fontSize: moderateScale(16),
    textAlign: 'center',
    paddingHorizontal: scale(20),
    lineHeight: moderateScale(22),
    marginBottom: moderateVerticalScale(20),
  },
  btn: {
    width: "100%",
  },
});

export default Success;