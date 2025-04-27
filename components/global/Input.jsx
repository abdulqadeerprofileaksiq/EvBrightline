import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Animated, Image } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { COLOR } from "../../constants/colors"; 
import { FONT } from "../../constants/font"; 
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const InputComponent = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  containerStyle,
  autoCapitalize = "none",
  iconName, // New prop for left icon
  iconColor = COLOR.mediumGray, // Default icon color
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
        {iconName && (
          <View style={styles.leftIconContainer}>
            <MaterialIcons 
              name={iconName} 
              size={moderateScale(22)} 
              color={iconColor} 
            />
          </View>
        )}
        <View style={[
          styles.inputWrapper,
          iconName ? styles.inputWithLeftIcon : null
        ]}>
          <Animated.Text style={[
            styles.label, 
            labelStyle,
            iconName ? styles.labelWithLeftIcon : null
          ]}>
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
            {isPasswordVisible ? (
              <Image 
                source={require('../../assets/images/input/eye.png')}
                style={styles.eyeImage} 
                resizeMode="contain"
              />
            ) : (
              <MaterialIcons 
                name="visibility-off" 
                size={moderateScale(22)} 
                color={COLOR.mediumGray} 
              />
            )}
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
    marginTop: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
    height: moderateScale(56),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: COLOR.lightGray,
    paddingHorizontal: moderateScale(16),
    backgroundColor: COLOR.white,
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
    fontFamily: FONT.regular, 
    fontSize: moderateScale(14), 
    color: COLOR.darkGray,
    paddingVertical: 0,
    height: "100%",
  },
  eyeIcon: {
    padding: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(32),
    height: moderateScale(32),
  },
  eyeImage: {
    width: moderateScale(22),
    height: moderateScale(22),
    tintColor: COLOR.mediumGray,
  },
  leftIconContainer: {
    marginRight: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWithLeftIcon: {
    paddingLeft: moderateScale(5),
  },
  labelWithLeftIcon: {
    left: moderateScale(5),
  },
});
// #endregion

export default InputComponent;