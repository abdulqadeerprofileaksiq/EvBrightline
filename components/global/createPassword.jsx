import React, { useState } from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { COLOR } from "../../constants/colors";
import HeadingText from "../../components/global/HeadingText";
import RegularText from "../../components/global/RegularText";
import InputComponent from "../../components/global/Input";
import LoginButton from "../../components/global/Button";
import { useRouter, useLocalSearchParams } from "expo-router";
import BackIcon from "../../assets/images/back.png";

const CreatePassword = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const headingText = params.heading || "Create Password";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    setPasswordError("");
  };

  const handleSubmit = () => {
    // Basic validation
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }
    
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    setPasswordError("");
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Check if it's a new password creation or password change
      if (headingText === "Create New Password") {
        // Navigate to success screen with createPassword source
        router.replace({
          pathname: "/successGlobal",
          params: { source: "createPassword" }
        });
      } else {
        // Default navigation path for regular password creation
        router.replace("/addVehicleScreen");
      }
    }, 1500);
  };

  const handleBack = () => router.back();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainContentContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Image source={BackIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.headingContainer}>
            <HeadingText text={headingText} textStyles={styles.heading} />
            <RegularText 
              text="Your new password must be unique from those previously used." 
              textStyles={styles.subHeading} 
            />
          </View>
          <View style={styles.formContainer}>
            <InputComponent
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry={true}
              showPasswordToggle={true}
              containerStyle={styles.inputContainer}
            />
            <InputComponent
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              secureTextEntry={true}
              showPasswordToggle={true}
              containerStyle={styles.inputContainer}
            />
            {/* Error message */}
            {passwordError ? (
              <View style={styles.errorContainer}>
                <RegularText text={passwordError} textStyles={styles.errorText} />
              </View>
            ) : null}
            
            {/* Submit button */}
            <LoginButton
              style={styles.btn}
              title="Create"
              onPress={handleSubmit}
              isLoading={isLoading}
            />
          </View>
        </View>
      </ScrollView>
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
    paddingHorizontal: "16@s",
  },
  backButton: {
    marginBottom: "16@vs",
    alignSelf: "flex-start",
  },
  backIcon: {
    width: "41@s",
    height: "41@s",
  },
  headingContainer: {
    marginBottom: "20@vs",
  },
  heading: {
    fontSize: "24@ms",
    textAlign: "left",
  },
  subHeading: {
    fontSize: "16@ms",
    color: COLOR.darkGray,
    textAlign: "left",
  },
  formContainer: {
    width: "100%",
  },
  requirementsContainer: {
    marginBottom: "16@vs",
  },
  requirementsTitle: {
    fontSize: "14@ms",
    color: COLOR.darkGray,
    marginBottom: "8@vs",
  },
  requirementsText: {
    fontSize: "14@ms",
    color: COLOR.darkGray,
    marginLeft: "8@s",
    marginBottom: "4@vs",
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
});

export default CreatePassword;




