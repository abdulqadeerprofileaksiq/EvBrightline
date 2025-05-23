import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from "react-native-size-matters";

import { COLOR } from "../../constants/colors";
import HeadingText from "../../components/global/HeadingText";
import RegularText from "../../components/global/RegularText";
import InputComponent from "../../components/global/Input";
import LoginButton from "../../components/global/Button";

import BackIcon from "../../assets/images/back.png";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  /**
   * Return to previous screen
   */
  const handleBack = () => router.back();

  /**
   * Process password reset request and navigate to verification
   */
  const handleSubmit = () => {
    setIsLoading(true);
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to OTP verification screen with source screen parameter
      router.push({
        pathname: "/verificationScreen",
        params: { fromScreen: 'forgotPasswordScreen' }
      });
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Main content container */}
        <View style={styles.mainContentContainer}>
          {/* Back button */}
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Image source={BackIcon} style={styles.backIcon} />
          </TouchableOpacity>
          {/* Heading */}
          <View>
            <HeadingText
              text="Forgot Password?"
              textStyles={styles.welcomeText}
            />
            <RegularText
              text="Don't worry! It happens. Please enter the email address linked to your account."
              textStyles={styles.subText}
            />
          </View>
          {/* Form */}
          <View style={styles.formContainer}>
            <InputComponent
              label="Email*"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              containerStyle={styles.inputContainer}
            />
            <LoginButton
              style={styles.btn}
              title="Submit"
              onPress={handleSubmit}
              isLoading={isLoading}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// #region Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  mainContentContainer: {
    paddingHorizontal: scale(16),
    marginBottom: moderateVerticalScale(5),
  },
  backButton: {
    marginBottom: moderateVerticalScale(30),
  },
  backIcon: {
    width: scale(41),
    height: scale(41),
  },

  welcomeText: {
    textAlign: "left",
    marginBottom: moderateVerticalScale(8),
  },
  subText: {
    textAlign: "left",
    color: COLOR.darkGray,
    fontSize: moderateScale(14),
    marginBottom: moderateVerticalScale(16),
  },
  // Form section
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: moderateVerticalScale(24),
    width: "100%",
  },
  btn: {
    marginTop: moderateVerticalScale(10),
    width: "100%",
  },
});
// #endregion

export default ForgotPasswordScreen;