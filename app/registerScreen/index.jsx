// #region Imports
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { COLOR } from "../../constants/colors";
import HeadingText from "../../components/global/HeadingText";
import RegularText from "../../components/global/RegularText";
import InputComponent from "../../components/global/Input";
import LoginButton from "../../components/global/Button";
import { useRouter } from "expo-router";

import Logo from "../../assets/images/EV_Logodark.png";
import GoogleIcon from "../../assets/images/social/google.png";
import AppleIcon from "../../assets/images/social/apple.png";
import BackIcon from "../../assets/images/back.png";

const RegisterScreen = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {      
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.navigate("/verificationScreen");
    }, 1500);
  };

  const handleBack = () => router.back();
  const handleLogin = () => router.navigate("/loginScreen");
  // #endregion

  // #region Render
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Image source={BackIcon} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <View style={styles.logoHeader}>
          <Image source={Logo} style={styles.logoImage} resizeMode="contain" />
        </View>
        <HeadingText
          text="Welcome! Let's Get Started!"
          textStyles={styles.heading}
        />
        <RegularText
          text="Create your account in just four easy steps."
          textStyles={styles.subText}
        />
        <View style={styles.formContainer}>
          <InputComponent
            label="Full name*"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
            containerStyle={styles.inputContainer}
          />
          <InputComponent
            label="Email*"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            containerStyle={styles.inputContainer}
          />
          <InputComponent
            label="Mobile number*"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="phone-pad"
            containerStyle={styles.inputContainer}
          />
          <LoginButton
            style={styles.btn}
            title="Continue"
            onPress={handleContinue}
            isLoading={isLoading}
          />
          <View style={styles.socialLoginContainer}>
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <RegularText
                text="Or Register with"
                textStyles={styles.dividerText}
              />
              <View style={styles.divider} />
            </View>
            <View style={styles.socialButtonsRow}>
              <TouchableOpacity style={styles.socialButton}>
                <Image source={GoogleIcon} style={styles.socialIcon} resizeMode="contain" />
              </TouchableOpacity>
              <View style={styles.socialButtonGap} />
              <TouchableOpacity style={styles.socialButton}>
                <Image source={AppleIcon} style={styles.socialIcon} resizeMode="contain" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.loginContainer}>
        <RegularText
          text="Already have an account? "
          textStyles={styles.loginText}
        />
        <TouchableOpacity onPress={handleLogin}>
          <RegularText
            text="Login Now"
            textStyles={styles.loginButtonText}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  // #endregion
};

// #region Styles
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  inner: {
    flex: 1,
    paddingHorizontal: "16@s",
    justifyContent: "center",
  },
  backButton: {
    marginTop: "16@vs",
    marginBottom: "8@vs",
    alignSelf: "flex-start",
  },
  backIcon: {
    width: 41,
    height: 41,
  },
  backText: {
    color: COLOR.darkGray,
    fontSize: "14@ms",
  },
  logoHeader: {
    alignItems: "flex-start",
    marginBottom: "8@vs",
  },
  logoImage: {
    width: "56@ms",
    height: "56@ms",
    resizeMode: "contain",
  },
  heading: {
    marginBottom: "10@vs",
    textAlign: "left",
  },
  subText: {
    color: COLOR.darkGray,
    fontSize: "14@ms",
    marginBottom: "10@vs",
    textAlign: "left",
  },
  formContainer: {
    width: "100%",
    marginBottom: "10@vs",
  },
  inputContainer: {
    marginBottom: "6@vs",
    width: "100%",
  },
  btn: {
    marginTop: "8@vs",
    width: "100%",
    height: "56@ms",
  },
  socialLoginContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: "10@vs",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: "8@vs",
  },
  divider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR.lightGray,
  },
  dividerText: {
    width: "auto",
    paddingHorizontal: "8@s",
    color: COLOR.mediumGray,
    fontSize: "14@ms",
  },
  socialButtonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: "8@vs",
  },
  socialButton: {
    flex: 1,
    height: "44@ms",
    borderRadius: "12@ms",
    borderColor: COLOR.lightGray,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: COLOR.white,
  },
  socialButtonGap: {
    width: "12@s",
  },
  socialIcon: {
    width: "24@s",
    height: "24@s",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "12@vs",
    width: "100%",
    marginBottom: "12@vs",
    backgroundColor: COLOR.white,
  },
  loginText: {
    width: "auto",
    color: COLOR.darkGray,
    marginRight: 0,
  },
  loginButtonText: {
    color: COLOR.amber,
    width: "auto",
    fontWeight: "600",
    marginLeft: 0,
  },
});
// #endregion

export default RegisterScreen;