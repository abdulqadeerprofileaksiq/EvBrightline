import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from "react-native-size-matters";
import { useRouter } from "expo-router";

import { COLOR } from "../../constants/colors";
import HeadingText from "../../components/global/HeadingText";
import RegularText from "../../components/global/RegularText";
import InputComponent from "../../components/global/Input";
import LoginButton from "../../components/global/Button";
import DropDown from "../../components/global/DropDown";

import BackIcon from "../../assets/images/back.png";
import FivePinIcon from "../../assets/images/EV_Chargers/fivepinBlack.png";
import NinePinIcon from "../../assets/images/EV_Chargers/ninepinBlack.png";
import SevenPinIcon from "../../assets/images/EV_Chargers/sevenpinBlack.png";
import FivePinAltIcon from "../../assets/images/EV_Chargers/fivepinBlack.png";

const AddVehicleScreen = () => {
  const router = useRouter();
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [connectorType, setConnectorType] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      label: "Type 1",
      image: require("../../assets/images/EV_Chargers/fivepinBlack.png")
    },
    {
      value: "ninepin",
      label: "Type 2", 
      image: require("../../assets/images/EV_Chargers/ninepinBlack.png")
    },
    {
      value: "sevenpin",
      label: "CCS",
      image: require("../../assets/images/EV_Chargers/sevenpinBlack.png")
    },
    {
      value: "fivepinalt",
      label: "CHAdeMO",
      image: require("../../assets/images/EV_Chargers/fivepinBlack.png")
    }
  ];

  const handleContinue = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/addPaymentScreen");
    }, 1500);
  };

  const handleBack = () => router.back();

  const handleLogin = () => router.push("/loginScreen");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollViewContent}>
        <View style={styles.mainContentContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Image source={BackIcon} style={styles.backIcon} />
          </TouchableOpacity>

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

          <View style={styles.formContainer}>
            <DropDown
              label="Brand"
              value={vehicleBrand}
              onSelect={setVehicleBrand}
              options={brandOptions}
              containerStyle={styles.inputContainer}
              placeholder="Select your vehicle brand"
            />

            <DropDown
              label="Model"
              value={vehicleModel}
              onSelect={setVehicleModel}
              options={modelOptions}
              containerStyle={styles.inputContainer}
              placeholder="Select your vehicle model"
            />

            <DropDown
              label="Battery Capacity Range"
              value={batteryCapacity}
              onSelect={setBatteryCapacity}
              options={batteryOptions}
              containerStyle={styles.inputContainer}
              placeholder="Select battery range"
            />

            <DropDown
              label="Connector Type"
              value={connectorType}
              onSelect={setConnectorType}
              options={connectorOptions}
              containerStyle={styles.inputContainer}
              placeholder="Select connector type"
              showIcon={true}
              isConnectorType={true}
            />

            <InputComponent
              label="License Plate No."
              placeholder="License Plate No."
              value={licensePlate}
              onChangeText={setLicensePlate}
              keyboardType="default"
              containerStyle={styles.inputContainer}
            />

            <LoginButton
              style={styles.btn}
              title="Add a Vehicle"
              onPress={handleContinue}
              isLoading={isLoading}
            />
          </View>
        </View>

        <View style={styles.spacer} />

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  mainContentContainer: {
    paddingHorizontal: scale(16),
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
    textAlign: "left",
    color: COLOR.darkGray,
    fontSize: moderateScale(14),
    marginBottom: moderateVerticalScale(-10),
  },
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
  spacer: {
    flex: 1,
  },
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
  icon: {
    width: scale(24),
    height: scale(24),
    marginRight: scale(10),
  },
});

export default AddVehicleScreen;
