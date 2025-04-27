import React from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from "react-native-size-matters";
import { COLOR } from "../../constants/colors";
import HeadingText from "../../components/global/HeadingText";
import RegularText from "../../components/global/RegularText";
import LoginButton from "../../components/global/Button";
import { useRouter } from "expo-router";

// Import assets
import SuccessIcon from "../../assets/images/Successmark.png"; 

const SuccessScreen = () => {
  const router = useRouter();

  // Navigation handler
  const handleLogin = () => {
    router.replace("/loginScreen");
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
            text="Thanks! You're all Set."
            textStyles={styles.titleText}
          />
          <RegularText
            text="Your account has been created successfully."
            textStyles={styles.messageText}
          />
        </View>
        
        {/* Login Button */}
        <LoginButton
          style={styles.btn}
          title="Back to Login"
          onPress={handleLogin}
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
  },
  btn: {
    width: "100%",
  },
});

export default SuccessScreen;