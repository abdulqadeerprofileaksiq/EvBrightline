import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, TextInput, Image } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { COLOR } from "../../constants/colors";
import HeadingText from "../../components/global/HeadingText";
import RegularText from "../../components/global/RegularText";
import LoginButton from "../../components/global/Button";
import BackIcon from "../../assets/images/back.png";
import { useRouter } from "expo-router";

const OtpScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [activeInput, setActiveInput] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = Array(6).fill().map((_, i) => inputRefs.current[i] || React.createRef());
  }, []);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
  }, []);

  const handleBack = () => router.back();

  const handleVerify = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        router.replace("/forgotPasswordScreen/createNewPassword");
      }, 1500);
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      setOtp(['', '', '', '', '', '']);
      setActiveInput(0);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  };

  const handleOtpChange = (text, index) => {
    if (!/^\d*$/.test(text)) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setActiveInput(index + 1);
    } else if (text) {
      inputRefs.current[index]?.blur();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveInput(index - 1);
    }
  };

  const formatTime = (seconds) => `00:${seconds < 10 ? '0' + seconds : seconds}`;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Image source={BackIcon} style={styles.backIcon} />
      </TouchableOpacity>
      <HeadingText text="OTP Verification" textStyles={styles.headingText} />
      <RegularText text="Enter the verification code we just sent to your email address." textStyles={styles.subText} />
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={el => inputRefs.current[index] = el}
            style={[
              styles.otpInput,
              activeInput === index && styles.activeInput,
              digit && styles.filledInput,
            ]}
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
          />
        ))}
      </View>
      <LoginButton style={styles.btn} title="Verify" onPress={handleVerify} isLoading={isLoading} />
      <View style={styles.footerContainer}>
        <View style={styles.resendContainer}>
          <RegularText text="Didn't receive the code? " textStyles={styles.footerText} />
          <TouchableOpacity onPress={timer > 0 ? null : handleResend}>
            <RegularText
              text="Resend"
              textStyles={[styles.footerLink, timer > 0 && styles.disabledText]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.timerRow}>
          <RegularText text="Send code again in " textStyles={styles.timerText} />
          <RegularText text={formatTime(timer)} textStyles={styles.timerValueText} />
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingHorizontal: "16@s",
    paddingTop: "42@vs",
    justifyContent: "flex-start",
  },
  backButton: {
    marginBottom: "16@vs",
    alignSelf: "flex-start",
  },
  backIcon: {
    width: "41@s",
    height: "41@s",
  },
  headingText: {
    fontSize: "24@ms",
    marginBottom: "8@vs",
    textAlign: "left",
  },
  subText: {
    fontSize: "16@ms",
    color: COLOR.darkGray,
    textAlign: "left",
    marginBottom: "20@vs",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "20@vs",
  },
  otpInput: {
    width: "40@s",
    height: "40@s",
    borderWidth: 1,
    borderColor: COLOR.lightGray,
    borderRadius: "8@ms",
    textAlign: "center",
    fontSize: "16@ms",
  },
  activeInput: {
    borderColor: COLOR.amber,
    borderWidth: 2,
  },
  filledInput: {
    borderColor: COLOR.darkGray,
  },
  btn: {
    marginTop: "16@vs",
    height: "48@vs",
  },
  footerContainer: {
    alignItems: "center",
    paddingVertical: "12@vs",
    backgroundColor: COLOR.white,
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "8@vs",
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
  timerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "8@vs",
  },
  timerText: {
    fontSize: "14@ms",
    color: COLOR.darkGray,
  },
  timerValueText: {
    fontSize: "14@ms",
    color: COLOR.amber,
    fontWeight: "600",
  },
  disabledText: {
    opacity: 0.6,
  },
});

export default OtpScreen;
