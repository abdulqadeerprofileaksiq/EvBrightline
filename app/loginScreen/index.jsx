import React, { useState } from "react";
import { useToast } from "../../context/toastContext/ToastContext";
import {
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
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

const LoginScreen = () => {
  const router = useRouter();
  const { showError } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleUsernameChange = (text) => {
    setUsername(text);
    setLoginError("");
  };

  const handleLogin = () => {
    setLoginError("");
    setIsLoading(true);
    setTimeout(() => {
      showError("Unable to login: Incorrect username or password. Try again!");
      setIsLoading(false);
    }, 1500);
  };

  const handleRegister = () => router.navigate("/registerScreen");

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.inner}>
            <View style={styles.logoHeader}>
              <Image source={Logo} style={styles.logoImage} resizeMode="contain" />
            </View>
            <HeadingText
              text="Welcome! Glad to See You Again!"
              textStyles={styles.heading}
            />
            <View style={styles.formContainer}>
              <InputComponent
                label="Username"
                placeholder="Enter your username"
                value={username}
                onChangeText={handleUsernameChange}
                containerStyle={styles.inputContainer}
              />
              <InputComponent
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setLoginError("");
                }}
                secureTextEntry={true}
                showPasswordToggle={true}
                containerStyle={styles.inputContainer}
              />
              <TouchableOpacity
                style={styles.forgotPasswordContainer}
                onPress={() => router.navigate("/forgotPassword")}
              >
                <RegularText
                  text="Forgot Password?"
                  textStyles={styles.forgotPasswordText}
                />
              </TouchableOpacity>
              {loginError ? (
                <View style={styles.errorContainer}>
                  <RegularText text={loginError} textStyles={styles.errorText} />
                </View>
              ) : null}
              <LoginButton
                style={styles.btn}
                title="Log In"
                onPress={handleLogin}
                isLoading={isLoading}
              />
              <View style={styles.socialLoginContainer}>
                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                  <RegularText
                    text="Or login with"
                    textStyles={styles.dividerText}
                  />
                  <View style={styles.divider} />
                </View>
                <View style={styles.socialButtonsRow}>
                  <TouchableOpacity style={styles.socialButton}>
                    <Image
                      source={GoogleIcon}
                      style={styles.socialIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <View style={styles.socialButtonGap} />
                  <TouchableOpacity style={styles.socialButton}>
                    <Image
                      source={AppleIcon}
                      style={styles.socialIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.signupContainer}>
            <RegularText
              text="Don't have an account? "
              textStyles={styles.RegisterText}
            />
            <TouchableOpacity onPress={handleRegister}>
              <RegularText
                text="Register Now"
                textStyles={styles.RegisterButtonText}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    backgroundColor: COLOR.white,
    minHeight: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  inner: {
    flex: 1,
    paddingHorizontal: "16@s",
    justifyContent: "center",
  },
  logoHeader: {
    alignItems: "flex-start",
    marginBottom: "12@vs", // tighter gap
    marginTop: "12@vs",    // tighter gap
  },
  logoImage: {
    width: "56@ms",
    height: "56@ms",
    resizeMode: "contain",
  },
  heading: {
    marginBottom: "10@vs", // tighter gap
    textAlign: "left",
  },
  formContainer: {
    width: "100%",
    marginBottom: "10@vs", // tighter gap
  },
  inputContainer: {
    marginBottom: "6@vs",
    width: "100%",
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: "6@vs",
    marginTop: "0@vs",
    paddingRight: "4@s", // add space from edge
  },
  forgotPasswordText: {
    color: COLOR.darkGray,
    fontSize: "14@ms",
    fontWeight: "400",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "6@vs",
    paddingHorizontal: "4@s",
    minHeight: "20@ms",
  },
  errorText: {
    color: COLOR.red || "#FF3B30",
    fontSize: "12@ms",
    marginLeft: "6@s",
    flex: 1,
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
    height: "50@ms",
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
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "12@vs", // add marginBottom for space from bottom
    width: "100%",
    marginBottom: "12@vs",
    backgroundColor: COLOR.white,
  },
  RegisterText: {
    width: "auto",
    color: COLOR.darkGray,
    marginRight: 0,
  },
  RegisterButtonText: {
    color: COLOR.amber,
    width: "auto",
    fontWeight: "600",
    marginLeft: 0,
  },
});

export default LoginScreen;