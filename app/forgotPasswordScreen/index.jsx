import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StatusBar } from 'react-native';
import { ScaledSheet, scale, verticalScale, moderateScale } from "react-native-size-matters";
import { COLOR } from "../../constants/colors";
import HeadingText from "../../components/global/HeadingText";
import RegularText from "../../components/global/RegularText";
import InputComponent from "../../components/global/Input";
import LoginButton from "../../components/global/Button";
import BackIcon from "../../assets/images/back.png";
import { useRouter } from "expo-router";

const ForgotPasswordScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => router.back();

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/verificationScreen",);
    }, 1500);
  };

  const handleLogin = () => router.navigate("/loginScreen");

  return (
    <>
      <StatusBar backgroundColor={COLOR.white} barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.mainContentContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Image source={BackIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.welcomeContainer}>
            <HeadingText text="Forgot Password?" textStyles={styles.welcomeText} />
            <RegularText
              text="Don't worry! It happens. Please enter the email address linked to your account."
              textStyles={styles.subText}
            />
          </View>
          <View style={styles.formContainer}>
            <InputComponent
              label="Email*"
              placeholder="Enter your email*"
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
        <View style={styles.footerContainer}>
          <RegularText text="Remember Password? " textStyles={styles.footerText} />
          <TouchableOpacity onPress={handleLogin}>
            <RegularText text="Login" textStyles={styles.footerLink} />
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
    paddingTop: "42@vs",
    paddingHorizontal: "16@s",
  },
  backButton: {
    marginBottom: "16@vs",
  },
  backIcon: {
    width: "41@s",
    height: "41@s",
  },
  welcomeContainer: {
    marginBottom: "30@vs",
  },
  welcomeText: {
    fontSize: "24@ms",
    marginBottom: "8@vs",
    textAlign: "left",
  },
  subText: {
    fontSize: "16@ms",
    color: COLOR.darkGray,
    textAlign: "left",
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: "24@vs",
  },
  btn: {
    marginTop: "10@vs",
    height: "48@vs",
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

export default ForgotPasswordScreen;