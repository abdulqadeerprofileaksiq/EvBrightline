// #region Imports
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { COLOR } from "../../constants/colors";
import { FONT } from "../../constants/font";
// #endregion

const Button = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  style,
  textStyle, 
}) => {
  // #region Render
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton, style]}
      onPress={onPress}
      disabled={isLoading || disabled}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={COLOR.white} />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
  // #endregion
};

// #region Styles
const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR.purple,
    borderRadius: moderateScale(8),
    height: moderateScale(56),
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: moderateScale(8),
  },
  buttonText: {
    fontFamily: FONT.semiBold,
    fontSize: moderateScale(16),
    color: COLOR.white,
  },
  disabledButton: {
    backgroundColor: COLOR.lightGray,
    opacity: 0.7,
  },
});
// #endregion

export default Button;