import React, { useEffect } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { ScaledSheet } from "react-native-size-matters";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

//COLORS
import { COLOR } from "../../constants/colors";
import { StatusBar } from "expo-status-bar";

export default function SplashScreen() {
  const router = useRouter();
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
    const timer = setTimeout(() => {
      router.replace("/introScreen");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <>
    <StatusBar style="dark" backgroundColor={COLOR.darkGray} />
      <View style={styles.container}>
        <Animated.Image
          source={require("../../assets/images/EV_Logo.png")}
          style={[styles.logo, animatedStyle]}
          resizeMode="contain"
        />
      </View>
    </>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.darkGray,
  },
  logo: {
    width: "210@ms",
    height: "210@ms",
  },
});