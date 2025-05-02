import React, { useState } from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { COLOR } from "../../constants/colors";
import HeadingText from "../../components/global/HeadingText";
import RegularText from "../../components/global/RegularText";
import InputComponent from "../../components/global/Input";
import LoginButton from "../../components/global/Button";
import { useRouter } from "expo-router";
import BackIcon from "../../assets/images/back.png";

const UpdatePasswordScreen = () => {
  const router = useRouter();
  
  // Group all state variables together
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Single handler for all password fields
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    setPasswordError("");
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.currentPassword) {
      setPasswordError("Please enter your current password");
      return;
    }

    if (formData.newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long");
      return;
    }
    
    if (formData.newPassword !== formData.confirmNewPassword) {
      setPasswordError("New passwords do not match");
      return;
    }
    
    setPasswordError("");
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.back(); // Go back to previous screen after success
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
            <HeadingText text="Update Password" textStyles={styles.heading} />
            <RegularText 
              text="Your new password must be unique from those previously used." 
              textStyles={styles.subHeading} 
            />
          </View>
          
          <View style={styles.formContainer}>
            <InputComponent
              label="Current Password"
              placeholder="Enter your current password"
              value={formData.currentPassword}
              onChangeText={(text) => handleInputChange("currentPassword", text)}
              secureTextEntry={true}
              showPasswordToggle={true}
              containerStyle={styles.inputContainer}
            />
            <InputComponent
              label="New Password"
              placeholder="Enter your new password"
              value={formData.newPassword}
              onChangeText={(text) => handleInputChange("newPassword", text)}
              secureTextEntry={true}
              showPasswordToggle={true}
              containerStyle={styles.inputContainer}
            />
            <InputComponent
              label="Confirm New Password"
              placeholder="Re-enter your new password"
              value={formData.confirmNewPassword}
              onChangeText={(text) => handleInputChange("confirmNewPassword", text)}
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
              title="Update"
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
    alignItems: "flex-start",
    paddingTop: "10@vs",
  },
  heading: {
    fontSize: "24@ms",
    marginBottom: "8@vs",
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
  inputContainer: {
    marginBottom: "16@vs",
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

export default UpdatePasswordScreen;