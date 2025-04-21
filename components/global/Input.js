import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { COLOR } from "../../constants/colors"; // Fixed import path
import { FONT } from "../../constants/font"; // Added font import
import Ionicons from "react-native-vector-icons/Ionicons";

const InputComponent = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  containerStyle,
  autoCapitalize = "none",
}) => {
  // #region State and Refs
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef(null);
  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;
  // #endregion
  
  // #region Animation Effects
  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: (isFocused || value) ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);
  // #endregion

  // #region Event Handlers
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const focusInput = () => inputRef.current?.focus();
  const togglePasswordVisibility = () => setIsPasswordVisible(prev => !prev);
  // #endregion
  
  // #region Computed Styles
  const labelStyle = {
    top: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [moderateScale(16), moderateScale(-9)],
    }),
    fontSize: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [moderateScale(14), moderateScale(12)],
    }),
    color: isFocused ? COLOR.purple : COLOR.mediumGray,
    backgroundColor: COLOR.white,
  };
  // #endregion

  // #region Render
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={focusInput}>
      <View 
        style={[
          styles.container, 
          containerStyle, 
          isFocused ? styles.focusedContainer : null
        ]}
      >
        <View style={styles.inputWrapper}>
          <Animated.Text style={[styles.label, labelStyle]}>
            {label}
          </Animated.Text>
          
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            keyboardType={keyboardType}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoCapitalize={autoCapitalize}
            underlineColorAndroid="transparent"
          />
        </View>
        
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Ionicons 
              name={isPasswordVisible ? "eye" : "eye-off"} 
              size={moderateScale(22)} 
              color={COLOR.mediumGray} 
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
  // #endregion
};

// #region Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: moderateScale(56),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: COLOR.lightGray,
    paddingHorizontal: moderateScale(16),
    backgroundColor: COLOR.white,
    marginVertical: moderateScale(10),
    width: "100%",
    position: "relative",
  },
  focusedContainer: {
    borderColor: COLOR.amber,
    borderWidth: 1.5,
  },
  inputWrapper: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    height: "100%",
  },
  label: {
    position: "absolute",
    left: 0,
    backgroundColor: COLOR.white,
    paddingHorizontal: scale(4),
    fontFamily: FONT.medium, // Updated to use FONT constant
    zIndex: 1,
  },
  input: {
    flex: 1,
    fontFamily: FONT.regular, // Updated to use FONT constant instead of TYPO
    fontSize: moderateScale(14), // Added explicit font size
    color: COLOR.darkGray,
    paddingVertical: 0,
    height: "100%",
  },
  eyeIcon: {
    padding: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  }
});
// #endregion

export default InputComponent;