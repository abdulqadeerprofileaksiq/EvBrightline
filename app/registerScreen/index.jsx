import React, { useState } from "react";
import { View, TouchableOpacity, Image, StatusBar ,StyleSheet} from "react-native";
import { ScaledSheet} from "react-native-size-matters";
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
      router.navigate( '/verificationScreen');
    }, 1500);
  };

  const handleBack = () => router.back();
  const handleLogin = () => router.navigate("/loginScreen");

  return (
    <>
      <StatusBar backgroundColor={COLOR.white} barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.mainContentContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Image source={BackIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.logoHeader}>
            <Image source={Logo} style={styles.logoImage} resizeMode="contain" />
          </View>
          <HeadingText text="Welcome! Let's Get Started!" textStyles={styles.heading} />
          <RegularText text="Create your account in just four easy steps." textStyles={styles.subText} />
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
                <RegularText text="Or Register with" textStyles={styles.dividerText} />
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
        <View style={styles.footerContainer}>
          <RegularText text="Already have an account? " textStyles={styles.footerText} />
          <TouchableOpacity onPress={handleLogin}>
            <RegularText text="Login Now" textStyles={styles.footerLink} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    justifyContent: "space-between",
  },
  mainContentContainer: {   
    paddingHorizontal: "16@s",
  },
  backButton: {
    marginBottom: "16@vs",
  },
  backIcon: {
    width: "41@s",
    height: "41@s",
  },
  logoHeader: {
    alignItems: "flex-start",
    marginBottom: "16@vs",
  },
  logoImage: {
    width: "56@s",
    height: "56@s",
  },
  heading: {
    fontSize: "24@ms",
    marginBottom: "8@vs",
    textAlign: "left",
  },
  subText: {
    fontSize: "16@ms",
    color: COLOR.darkGray,
    marginBottom: "16@vs",
    textAlign: "left",
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
  },
  btn: {
    marginTop: "16@vs",
    height: "48@vs",
  },
  socialLoginContainer: {
    marginTop: "16@vs",
    alignItems: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "22@vs",
  },
  divider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR.lightGray,
  },
  dividerText: {
    marginHorizontal: "8@s",
    fontSize: "14@ms",
    color: COLOR.mediumGray,
  },
  socialButtonsRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButton: {
    flex: 1,
    height: "50@vs",
    borderRadius: "8@ms",
    borderWidth: 1,
    borderColor: COLOR.lightGray,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.white,
  },
  socialButtonGap: {
    width: "12@s",
  },
  socialIcon: {
    width: "24@s",
    height: "24@s",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "12@vs",
    backgroundColor: COLOR.white,
  },
  footerText: {
    fontSize: "14@ms",
    color: COLOR.darkGray,
  },
  footerLink: {
    fontSize: "14@ms",
    color: COLOR.amber,
    fontWeight: "600",
  },
});

export default RegisterScreen;