import { Text } from "react-native";
import React from "react";
import { FONT } from "../../constants/font";
import { moderateScale } from "react-native-size-matters";

const RegularText = ({ text, textStyles, ...props }) => {
  const baseStyles = {
    fontFamily: FONT.regular, 
    fontSize: moderateScale(16),
    lineHeight: moderateScale(16) * 1.3,
    textAlign: "center", // Add default center text alignment
  };
  
  return (
    <Text style={[baseStyles, textStyles]} {...props}>
      {text}
    </Text>
  );
};

export default RegularText;