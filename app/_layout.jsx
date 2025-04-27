import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useCallback, useRef, useState, createContext } from "react";
import * as SplashScreen from "expo-splash-screen";
import COLOR from "../constants/colors";
import { ToastProvider } from '../context/toastContext/ToastContext';
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AlertBottomSheet from '../context/alertContext/alert';

// Create context for alert at the app root level
export const AlertSheetContext = createContext();

// Keep splash screen visible while loading fonts
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const alertSheetRef = useRef(null);
  const [alertConfig, setAlertConfig] = useState(null);

  // Alert handling functions
  const showAlert = (config) => {
    setAlertConfig(config);
    setTimeout(() => {
      alertSheetRef.current?.snapToIndex(0);
    }, 100);
  };

  // Updated alert handling to support custom button handlers
  const handleCloseAlert = () => {
    alertSheetRef.current?.close();
    setAlertConfig(null);
  };

  // Clear loading with named font families
  const [fontsLoaded] = useFonts({
    "Urbanist-Black": require("../assets/fonts/Urbanist-Black.ttf"),
    "Urbanist-Bold": require("../assets/fonts/Urbanist-Bold.ttf"),
    "Urbanist-ExtraBold": require("../assets/fonts/Urbanist-ExtraBold.ttf"),
    "Urbanist-ExtraLight": require("../assets/fonts/Urbanist-ExtraLight.ttf"),
    "Urbanist-Light": require("../assets/fonts/Urbanist-Light.ttf"),
    "Urbanist-Medium": require("../assets/fonts/Urbanist-Medium.ttf"),
    "Urbanist-Regular": require("../assets/fonts/Urbanist-Regular.ttf"),
    "Urbanist-SemiBold": require("../assets/fonts/Urbanist-SemiBold.ttf"),
    "Urbanist-Thin": require("../assets/fonts/Urbanist-Thin.ttf"),
  });

  // Hide splash screen once fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Return null until fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

  return (
    <AlertSheetContext.Provider value={showAlert}>
      <SafeAreaProvider>
        <ToastProvider>
          <GestureHandlerRootView style={{ flex: 1, backgroundColor: COLOR.white }} onLayout={onLayoutRootView}>
            <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
              >
                <StatusBar style="dark" />
                <Stack screenOptions={{ headerShown: false }} />
                
                {/* Global Alert Bottom Sheet */}
                <AlertBottomSheet
                  ref={alertSheetRef}
                  onClose={handleCloseAlert}
                  icon={alertConfig?.icon}
                  image={alertConfig?.image}
                  heading={alertConfig?.heading}
                  text={alertConfig?.text}
                  buttonText={alertConfig?.buttonText}
                  onButtonPress={alertConfig?.onButtonPress}
                  snapPoints={['55%']}
                />
              </KeyboardAvoidingView>
            </SafeAreaView>
          </GestureHandlerRootView>
        </ToastProvider>
      </SafeAreaProvider>
    </AlertSheetContext.Provider>
  );
}