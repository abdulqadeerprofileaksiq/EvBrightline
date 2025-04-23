import React, { useState } from "react";
import { View, StatusBar, TouchableOpacity, Image } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { COLOR } from "../../constants/colors";
import HeadingText from "../../components/global/HeadingText";
import RegularText from "../../components/global/RegularText";
import InputComponent from "../../components/global/Input";
import LoginButton from "../../components/global/Button";
import { useRouter, useLocalSearchParams } from "expo-router";
import BackIcon from "../../assets/images/back.png";

const PasswordCreationScreen = () => {
  const params = useLocalSearchParams();
  const source = params.source || "";
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => router.back();

  const handleSubmit = () => {
    if (password === confirmPassword && password.length >= 6) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        router.navigate("/loginScreen");
      }, 1500);
    } else {
      alert("Passwords do not match or are too short!");
    }
  };

  const heading = source === "forgotPassword"
    ? "Create New Password"
    : "Create Password";

  return (
    <>
      <StatusBar backgroundColor={COLOR.white} barStyle="dark-content" />
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Image source={BackIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <HeadingText text={heading} textStyles={styles.heading} />
        <RegularText
          text="Your new password must be unique from those previously used."
          textStyles={styles.subText}
        />
        <InputComponent
          label="New Password"
          placeholder="Enter your new password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          containerStyle={styles.inputContainer}
        />
        <InputComponent
          label="Confirm Password"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
          containerStyle={styles.inputContainer}
        />
        <LoginButton
          style={styles.btn}
          title="Submit"
          onPress={handleSubmit}
          isLoading={isLoading}
        />
      </View>
    </>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingHorizontal: "16@s",
    justifyContent: "center",
  },
  backButton: {
    marginTop: "16@vs",
    marginBottom: "8@vs",
    alignSelf: "flex-start",
  },
  backIcon: {
    width: "41@s",
    height: "41@s",
  },
  heading: {
    fontSize: "24@ms",
    marginBottom: "8@vs",
    textAlign: "center",
  },
  subText: {
    fontSize: "14@ms",
    color: COLOR.darkGray,
    marginBottom: "16@vs",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: "12@vs",
  },
  btn: {
    marginTop: "16@vs",
    height: "48@vs",
  },
});

export default PasswordCreationScreen;
