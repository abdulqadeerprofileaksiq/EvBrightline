import { Text } from "react-native";
import React from "react";
import { FONT } from "../../constants/font";
import { moderateScale } from "react-native-size-matters";

const HeadingText = ({ text, textStyles, ...props }) => {
  const baseStyles = {
    fontFamily: FONT.bold, 
    fontSize: moderateScale(24),
    lineHeight: moderateScale(24) * 1.3,
    textAlign: "center", // Add default center text alignment
  };
  
  return (
    <Text style={[baseStyles, textStyles]} {...props}>
      {text}
    </Text>
  );
};

export default HeadingText;