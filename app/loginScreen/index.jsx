import React, { useState } from "react";
import { useToast } from "../../context/toastContext/ToastContext";
import { View, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
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
    
    // Check if credentials are admin/admin
    if (username === "admin" && password === "admin") {
      // Navigate to Home after short delay to show loading indicator
      setTimeout(() => {
        setIsLoading(false);
        router.replace("/(tabs)/Home");
      }, 1500);
    } else {
      // Show error for incorrect credentials
      setTimeout(() => {
        showError("Unable to login: Incorrect username or password. Try again!");
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleRegister = () => router.navigate("/registerScreen");

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainContentContainer}>
          <View style={styles.logoHeader}>
            <Image source={Logo} style={styles.logoImage} resizeMode="contain" />
          </View>
          <HeadingText text="Welcome! Glad to See You Again!" textStyles={styles.heading} />
          <View style={styles.formContainer}>
            {/* Form inputs */}
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
            
            {/* Forgot password link */}
            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={() => router.navigate("/forgotPasswordScreen")}
            >
              <RegularText text="Forgot Password?" textStyles={styles.forgotPasswordText} />
            </TouchableOpacity>
            
            {/* Error message */}
            {loginError ? (
              <View style={styles.errorContainer}>
                <RegularText text={loginError} textStyles={styles.errorText} />
              </View>
            ) : null}
            
            {/* Login button */}
            <LoginButton
              style={styles.btn}
              title="Log In"
              onPress={handleLogin}
              isLoading={isLoading}
            />
            
            {/* Social login options */}
            <View style={styles.socialLoginContainer}>
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <RegularText text="Or login with" textStyles={styles.dividerText} />
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
      </ScrollView>
      
      {/* Bottom signup prompt */}
      <View style={styles.signupContainer}>
        <RegularText text="Don't have an account? " textStyles={styles.signupText} />
        <TouchableOpacity onPress={handleRegister}>
          <RegularText text="Register Now" textStyles={styles.signupLink} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  mainContentContainer: {
    paddingTop: "52@vs",
    paddingHorizontal: "16@s",
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
    marginBottom: "16@vs",
    textAlign: "left",
  },
  formContainer: {
    width: "100%",
  },  
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: "12@vs",
  },
  forgotPasswordText: {
    fontSize: "14@ms",
    color: COLOR.darkGray,
  },
  errorContainer: {
    marginBottom: "12@vs",
  },
  errorText: {
    fontSize: "12@ms",
    color: COLOR.red,
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
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "12@vs",
    backgroundColor: COLOR.white,
  },
  signupText: {
    fontSize: "14@ms",
    color: COLOR.darkGray,
  },
  signupLink: {
    fontSize: "14@ms",
    color: COLOR.amber,
    fontWeight: "600",
  },
});

export default LoginScreen;