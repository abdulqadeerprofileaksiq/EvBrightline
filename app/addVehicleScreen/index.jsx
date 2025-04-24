// #region Imports
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
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
import DropDown from "../../components/global/DropDown";
import { useRouter } from "expo-router"; // Import useRouter

// Import assets
import BackIcon from "../../assets/images/back.png";
// Import EV charger icons
import FivePinIcon from "../../assets/images/EV_Chargers/fivepinBlack.png";
import NinePinIcon from "../../assets/images/EV_Chargers/ninepinBlack.png";
import SevenPinIcon from "../../assets/images/EV_Chargers/sevenpinBlack.png";
import FivePinAltIcon from "../../assets/images/EV_Chargers/fivepinBlack.png";
// #endregion

const AddVehicleScreen = () => {
  const router = useRouter(); // Initialize router
  // #region State Management
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [connectorType, setConnectorType] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // #endregion

  // #region Data Options
  const brandOptions = [
    { value: "tesla", label: "Tesla" },
    { value: "bmw", label: "BMW" },
    { value: "ford", label: "Ford" },
    { value: "audi", label: "Audi" },
    { value: "nissan", label: "Nissan" },
  ];

  const modelOptions = [
    { value: "model3", label: "Model 3" },
    { value: "modely", label: "Model Y" },
    { value: "models", label: "Model S" },
    { value: "modelx", label: "Model X" },
  ];

  const batteryOptions = [
    { value: "20-40", label: "20 kWh - 40 kWh" },
    { value: "41-60", label: "41 kWh - 60 kWh" },
    { value: "61-80", label: "61 kWh - 80 kWh" },
    { value: "81-100", label: "81 kWh - 100 kWh" },
  ];

  const connectorOptions = [
    {
      value: "fivepin",
      label: "Five Pin",
      icon: () => <Image source={FivePinIcon} style={styles.icon} />,
    },
    {
      value: "ninepin",
      label: "Nine Pin",
      icon: () => <Image source={NinePinIcon} style={styles.icon} />,
    },
    {
      value: "sevenpin",
      label: "Seven Pin",
      icon: () => <Image source={SevenPinIcon} style={styles.icon} />,
    },
    {
      value: "fivepinalt",
      label: "Five Pin Alt",
      icon: () => <Image source={FivePinAltIcon} style={styles.icon} />,
    },
  ];
  // #endregion

  // #region Handlers
  /**
   * Submit vehicle details and continue to Payment screen
   */
  const handleContinue = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Use router.push instead of navigation.navigate
      router.push("/addPaymentScreen");
    }, 1500);
  };

  /**
   * Return to previous screen
   */
  const handleBack = () => router.back();

  /**
   * Navigate to login screen
   */
  const handleLogin = () => router.push("/loginScreen");
  // #endregion

  // #region Render
  return (
    <View style={styles.container}>
      <View style={styles.scrollViewContent}>
        {/* Header Section (Back Button, Welcome) */}
        <View style={styles.mainContentContainer}>
          {/* Back button */}
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Image source={BackIcon} style={styles.backIcon} />
          </TouchableOpacity>

          {/* Welcome heading */}
          <View style={styles.welcomeContainer}>
            <HeadingText
              text="Add Vehicle Details"
              textStyles={styles.welcomeText}
            />
            <RegularText
              text="This will help us filter the charging stations as per your requirements"
              textStyles={styles.subText}
            />
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            {/* Vehicle Brand Dropdown */}
            <DropDown
              label="Brand"
              value={vehicleBrand}
              onSelect={setVehicleBrand}
              options={brandOptions}
              containerStyle={styles.inputContainer}
              placeholder="Select your vehicle brand"
            />

            {/* Vehicle Model Dropdown */}
            <DropDown
              label="Model"
              value={vehicleModel}
              onSelect={setVehicleModel}
              options={modelOptions}
              containerStyle={styles.inputContainer}
              placeholder="Select your vehicle model"
            />

            {/* Battery Capacity Dropdown */}
            <DropDown
              label="Battery Capacity Range"
              value={batteryCapacity}
              onSelect={setBatteryCapacity}
              options={batteryOptions}
              containerStyle={styles.inputContainer}
              placeholder="Select battery range"
            />

            {/* Connector Type Dropdown */}
            <DropDown
              label="Connector Type"
              value={connectorType}
              onSelect={setConnectorType}
              options={connectorOptions}
              containerStyle={styles.inputContainer}
              placeholder="Select connector type"
              showIcon={true}
            />

            {/* License Plate Input */}
            <InputComponent
              label="License Plate No."
              placeholder="License Plate No."
              value={licensePlate}
              onChangeText={setLicensePlate}
              keyboardType="default"
              containerStyle={styles.inputContainer}
            />

            {/* Submit Button */}
            <LoginButton
              style={styles.btn}
              title="Add a Vehicle"
              onPress={handleContinue}
              isLoading={isLoading}
            />
          </View>
        </View>

        {/* Flexible spacer */}
        <View style={styles.spacer} />

        {/* Login Option Footer */}
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
    </View>
  );
  // #endregion
};

// #region Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  // Header Section
  mainContentContainer: {
    paddingTop: moderateVerticalScale(20),
    paddingHorizontal: scale(24),
  },
  backButton: {
    marginBottom: moderateVerticalScale(20),
  },
  backIcon: {
    width: scale(41),
    height: scale(41),
  },
  welcomeContainer: {
    marginBottom: moderateVerticalScale(30),
  },
  welcomeText: {
    textAlign: "left",
    marginBottom: moderateVerticalScale(8),
  },
  subText: {
    color: COLOR.darkGray,
    fontSize: moderateScale(14),
    marginBottom: moderateVerticalScale(-10),
  },
  
  // Form Section
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
  },
  btn: {
    marginTop: moderateVerticalScale(20),
    width: "100%",
  },
  
  // Layout Helpers
  spacer: {
    flex: 1,
  },
  
  // Footer Section
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: moderateVerticalScale(24),
    width: "100%",
    alignItems: "center",
    paddingHorizontal: scale(24),
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
  },
  
  // Icons
  icon: {
    width: scale(24),
    height: scale(24),
    marginRight: scale(10),
  },
});
// #endregion

export default AddVehicleScreen;
