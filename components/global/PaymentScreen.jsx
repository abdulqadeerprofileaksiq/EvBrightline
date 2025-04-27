// #region Imports
import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
} from "react-native";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from "react-native-size-matters";
import { COLOR } from "../../constants/colors";
import { useRouter } from "expo-router";
import HeadingText from "../../components/global/HeadingText";
import RegularText from "../../components/global/RegularText";
import InputComponent from "../../components/global/Input";
import LoginButton from "../../components/global/Button";
import DropDown from "../../components/global/DropDown";
import countryList from 'react-select-country-list';
import { Entypo } from '@expo/vector-icons'; // Keep only Entypo for the dots

// Import assets
import BackIcon from "../../assets/images/back.png";
// Import payment assets
import CreditCardIcon from "../../assets/images/payment/creditcard.png";
import AfterPayIcon from "../../assets/images/payment/Afterpay.png";
import KlarnaIcon from "../../assets/images/payment/klarna.png";
import VisaIcon from "../../assets/images/payment/visa.png";
import MastercardIcon from "../../assets/images/payment/mastercard.png";
import PaypalIcon from "../../assets/images/payment/paypal.png";
import CVVIcon from "../../assets/images/payment/cvv.png";
// #endregion

const PaymentScreen = () => {
  const router = useRouter();
  // #region State Management
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // #endregion

  // #region Data Options
  // Use useMemo to avoid recreating the country list on each render
  const countryOptions = useMemo(() => {
    // Filter out any undefined or invalid entries
    return countryList().getData().filter(country => 
      country && country.label && country.value
    ).map(country => ({
      value: country.value,
      label: country.label
    }));
  }, []);
  // #endregion

  // #region Search Handling
  // Custom search filter function to pass to the dropdown
  const filterCountries = useCallback((item, query) => {
    if (query === undefined || query === '') return true;
    
    const lowercaseQuery = query.toLowerCase().trim();
    const lowercaseLabel = item.label.toLowerCase();
    
    return lowercaseLabel.includes(lowercaseQuery);
  }, []);
  // #endregion

  // #region Handlers
  /**
   * Submit payment details and continue
   */
  const handleAddPayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/(tabs)/Home");
    }, 1500);
  };

  /**
   * Skip payment and continue to Home
   */
  const handleSkip = () => {
    router.push("/successScreen");
  };
  
  /**
   * Return to previous screen
   */
  const handleBack = () => router.back();

  /**
   * Select payment method option
   */
  const handleSelectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
  };

  /**
   * Format card number with spaces after every 4 digits
   */
  const handleCardNumberChange = (text) => {
    // Remove any non-numeric characters
    const cleaned = text.replace(/\D/g, '');
    // Add spaces after every 4 digits
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    // Limit to 19 characters (16 digits + 3 spaces)
    setCardNumber(formatted.slice(0, 19));
  };

  /**
   * Format expiry date with slash (MM/YY)
   */
  const handleExpiryDateChange = (text) => {
    // Remove any non-numeric characters
    const cleaned = text.replace(/\D/g, '');
    // Format as MM/YY
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    setExpiryDate(formatted.slice(0, 5));
  };
  // #endregion

  // #region Render
  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          {/* Replace BackIcon width/height with Image component */}
          <Image source={BackIcon} style={styles.backIcon} />
        </TouchableOpacity>

        {/* Heading Section */}
        <View style={styles.headingContainer}>
          <HeadingText
            text="Link Payment Method"
            textStyles={styles.headingText}
          />
          <RegularText
            text="Finding the best charging stations that match your preferences."
            textStyles={styles.subHeadingText}
          />
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          {/* Personal Details */}
          <InputComponent
            label="Full name*"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
            containerStyle={styles.formElement}
          />

          <DropDown
            label="Country"
            value={country}
            onSelect={setCountry}
            options={countryOptions}
            containerStyle={styles.formElement}
            placeholder="Select your country"
            filterFunction={filterCountries} // Add custom filter function
          />

          <InputComponent
            label="Address*"
            placeholder="Enter your address"
            value={address}
            onChangeText={setAddress}
            containerStyle={styles.formElement}
          />

          {/* Payment Method Selection */}
          <View style={styles.paymentMethodContainer}>
            <View style={styles.paymentOptionsRow}>
              <TouchableOpacity 
                style={[
                  styles.paymentOption, 
                  selectedPaymentMethod === "card" && styles.selectedPaymentOption
                ]}
                onPress={() => handleSelectPaymentMethod("card")}
              >
                <View style={styles.paymentOptionContent}>
                  <Image source={CreditCardIcon} style={styles.paymentOptionIcon} />
                  <RegularText 
                    text="Card" 
                    textStyles={styles.paymentOptionText}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                  styles.paymentOption, 
                  selectedPaymentMethod === "afterpay" && styles.selectedPaymentOption
                ]}
                onPress={() => handleSelectPaymentMethod("afterpay")}
              >
                <View style={styles.paymentOptionContent}>
                  <Image source={AfterPayIcon} style={styles.paymentOptionIcon} />
                  <RegularText 
                    text="AfterPay" 
                    textStyles={styles.paymentOptionText}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                  styles.paymentOption, 
                  selectedPaymentMethod === "klarna" && styles.selectedPaymentOption
                ]}
                onPress={() => handleSelectPaymentMethod("klarna")}
              >
                <View style={styles.paymentOptionContent}>
                  <Image source={KlarnaIcon} style={styles.paymentOptionIcon} />
                  <RegularText 
                    text="Klarna" 
                    textStyles={styles.paymentOptionText}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                  styles.moreOption, 
                  selectedPaymentMethod === "more" && styles.selectedPaymentOption
                ]}
                onPress={() => handleSelectPaymentMethod("more")}
              >
                <Entypo name="dots-three-horizontal" size={24} color={COLOR.darkGray} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Card Details */}
          <View style={styles.cardDetailsContainer}>
            <View style={styles.cardInputContainer}>
              <InputComponent
                label="Card number*"
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChangeText={handleCardNumberChange}
                keyboardType="numeric"
                containerStyle={styles.formElement}
              />
              <View style={styles.cardIconsContainer}>
                <Image source={VisaIcon} style={styles.cardIcon} />
                <Image source={MastercardIcon} style={styles.cardIcon} />
                <Image source={PaypalIcon} style={styles.cardIcon} />
              </View>
            </View>

            {/* Expiry date - full width */}
            <InputComponent
              label="Expiry date*"
              placeholder="MM/YY"
              value={expiryDate}
              onChangeText={handleExpiryDateChange}
              keyboardType="numeric"
              containerStyle={styles.formElement}
            />
            
            {/* Security code - full width below expiry date */}
            <View style={styles.securityCodeContainer}>
              <InputComponent
                label="Security code*"
                placeholder="CVV"
                value={securityCode}
                onChangeText={setSecurityCode}
                keyboardType="numeric"
                maxLength={4}
                containerStyle={styles.formElement}
              />
              <View style={styles.cvvIconContainer}>
                <Image source={CVVIcon} style={styles.cvvIcon} />
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <LoginButton
            style={styles.addButton}
            title="Add"
            onPress={handleAddPayment}
            isLoading={isLoading}
          />
          
          {/* Center the Skip for now text */}
          <View style={styles.skipButtonWrapper}>
            <TouchableOpacity 
              onPress={handleSkip}
            >
              <RegularText
                text="Skip for now"
                textStyles={styles.skipButtonText}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: scale(16),
    paddingBottom: moderateVerticalScale(40),
  },
  backButton: {
    marginBottom: moderateVerticalScale(20),
  },
  backIcon: {
    width: scale(41),
    height: scale(41),
  },
  headingContainer: {
    marginBottom: moderateVerticalScale(30),
  },
  headingText: {
    textAlign: "left",
    marginBottom: moderateVerticalScale(8),
  },
  subHeadingText: {
    textAlign: "left",
    color: COLOR.darkGray,
    fontSize: moderateScale(14),
  },
  formContainer: {
    width: "100%",
  },
  formElement: {
    width: "100%",
    marginVertical: moderateScale(6), // Equal margin for all form elements
  },
  paymentMethodContainer: {
    marginVertical: moderateScale(6),
  },
  paymentOptionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: moderateVerticalScale(5),
  },
  paymentOption: {
    width: scale(75), // Increased width for card options
    height: scale(60), // Decreased height
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: COLOR.lightGray,
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(8),
  },
  paymentOptionContent: {
    alignItems: "flex-start",
    width: "100%",
  },
  paymentOptionText: {
    fontSize: moderateScale(12),
    marginTop: moderateVerticalScale(6),
    textAlign: "left",
  },
  moreOption: {
    width: scale(45), // Slightly wider for the dots
    height: scale(60), // Match the decreased height
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: COLOR.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  dotsText: {
    fontSize: moderateScale(24),
    lineHeight: moderateScale(24),
    color: COLOR.darkGray,
    fontWeight: 'bold',
  },
  selectedPaymentOption: {
    borderColor: COLOR.amber,
    borderWidth: 2,
  },
  cardDetailsContainer: {
    width: "100%",
  },
  cardInputContainer: {
    position: "relative",
  },
  cardIconsContainer: {
    position: "absolute",
    right: scale(16),
    top: "50%", // Center vertically
    transform: [{ translateY: -scale(12) }], // Adjust for icon height
    flexDirection: "row",
    alignItems: "center",
  },
  cardIcon: {
    width: scale(30),
    height: scale(20),
    resizeMode: 'contain',
    marginLeft: scale(8),
  },
  fullWidthInput: {
    width: "100%",
  },
  securityCodeContainer: {
    width: "100%",
    position: "relative",
  },
  cvvIconContainer: {
    position: "absolute",
    right: scale(16),
    top: "50%", // Center vertically
    transform: [{ translateY: -scale(10) }], // Adjust for icon height
  },
  cvvIcon: {
    width: scale(22),
    height: scale(22),
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginTop: moderateScale(20), // A bit more space before buttons
    width: "100%",
  },
  addButton: {
    width: "100%",
    marginBottom: moderateVerticalScale(16),
  },
  skipButtonWrapper: {
    width: "100%",
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
    paddingVertical: moderateScale(12),
  },
  skipButtonText: {
    color: COLOR.amber,
    fontSize: moderateScale(16),
    fontFamily: "Urbanist-SemiBold",
  },
});
// #endregion

export default PaymentScreen;