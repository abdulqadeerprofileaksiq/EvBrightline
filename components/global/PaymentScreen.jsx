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
import { Entypo } from '@expo/vector-icons';
import Header from "./Header";

import CreditCardIcon from "../../assets/images/payment/creditcard.png";
import AfterPayIcon from "../../assets/images/payment/Afterpay.png";
import KlarnaIcon from "../../assets/images/payment/klarna.png";
import VisaIcon from "../../assets/images/payment/visa.png";
import MastercardIcon from "../../assets/images/payment/mastercard.png";
import PaypalIcon from "../../assets/images/payment/paypal.png";
import CVVIcon from "../../assets/images/payment/cvv.png";

const PaymentScreen = () => {
  const router = useRouter();
  
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const countryOptions = useMemo(() => {
    return countryList().getData().filter(country => 
      country && country.label && country.value
    ).map(country => ({
      value: country.value,
      label: country.label
    }));
  }, []);

  const filterCountries = useCallback((item, query) => {
    if (query === undefined || query === '') return true;
    
    const lowercaseQuery = query.toLowerCase().trim();
    const lowercaseLabel = item.label.toLowerCase();
    
    return lowercaseLabel.includes(lowercaseQuery);
  }, []);

  const handleAddPayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/(tabs)/Home");
    }, 1500);
  };

  const handleSkip = () => {
    router.push({
      pathname: "/successGlobal",
      params: { source: "payment" }
    });
  };
  
  const handleBack = () => {
    router.back();
  };

  const handleSelectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleCardNumberChange = (text) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted.slice(0, 19));
  };

  const handleExpiryDateChange = (text) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    setExpiryDate(formatted.slice(0, 5));
  };

  return (
    <View style={styles.container}>
      <Header 
        text=""
        onBack={handleBack}
      />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >        
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

        <View style={styles.formContainer}>
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
            filterFunction={filterCountries}
          />

          <InputComponent
            label="Address*"
            placeholder="Enter your address"
            value={address}
            onChangeText={setAddress}
            containerStyle={styles.formElement}
          />

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

            <InputComponent
              label="Expiry date*"
              placeholder="MM/YY"
              value={expiryDate}
              onChangeText={handleExpiryDateChange}
              keyboardType="numeric"
              containerStyle={styles.formElement}
            />
            
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

        <View style={styles.buttonContainer}>
          <LoginButton
            style={styles.addButton}
            title="Add"
            onPress={handleAddPayment}
            isLoading={isLoading}
          />
          
          <View style={styles.skipButtonWrapper}>
            <TouchableOpacity onPress={handleSkip}>
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
};

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
  headingContainer: {
    marginBottom: moderateVerticalScale(30),
  },
  headingText: {
    textAlign: "left",
    marginBottom: moderateVerticalScale(5),
    marginTop: moderateVerticalScale(20),
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
    marginVertical: moderateScale(6),
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
    width: scale(75),
    height: scale(60),
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
    width: scale(45),
    height: scale(60),
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
    top: "50%",
    transform: [{ translateY: -scale(12) }],
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
    top: "50%",
    transform: [{ translateY: -scale(10) }],
  },
  cvvIcon: {
    width: scale(22),
    height: scale(22),
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginTop: moderateScale(20),
    width: "100%",
  },
  addButton: {
    width: "100%",
    marginBottom: moderateVerticalScale(16),
  },
  skipButtonWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: moderateScale(12),
  },
  skipButtonText: {
    color: COLOR.amber,
    fontSize: moderateScale(16),
    fontFamily: "Urbanist-SemiBold",
  },
});

export default PaymentScreen;