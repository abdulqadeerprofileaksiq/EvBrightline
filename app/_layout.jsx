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
import DoubleButtonAlert from '../context/alertContext/doublebutton';

// Create contexts for alerts at the app root level
export const AlertSheetContext = createContext();
export const DoubleButtonAlertContext = createContext();

// Keep splash screen visible while loading fonts
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const alertSheetRef = useRef(null);
  const doubleButtonAlertRef = useRef(null);
  const [alertConfig, setAlertConfig] = useState(null);
  const [doubleButtonConfig, setDoubleButtonConfig] = useState(null);

  // Alert handling functions
  const showAlert = (config) => {
    setAlertConfig(config);
    setTimeout(() => {
      alertSheetRef.current?.snapToIndex(0);
    }, 100);
  };

  // Double button alert handling functions
  const showDoubleButtonAlert = (config) => {
    console.log("Showing double button alert with config:", config);
    setDoubleButtonConfig(config);
    setTimeout(() => {
      doubleButtonAlertRef.current?.snapToIndex(0);
    }, 100);
  };

  const handleCloseAlert = () => {
    alertSheetRef.current?.close();
    setAlertConfig(null);
  };

  const handleCloseDoubleButtonAlert = () => {
    doubleButtonAlertRef.current?.close();
    setDoubleButtonConfig(null);
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
      <DoubleButtonAlertContext.Provider value={showDoubleButtonAlert}>
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
                    snapPoints={['35%']}
                  />
                  
                  {/* Double Button Alert Bottom Sheet */}
                  <DoubleButtonAlert
                    ref={doubleButtonAlertRef}
                    onClose={handleCloseDoubleButtonAlert}
                    icon={doubleButtonConfig?.icon}
                    heading={doubleButtonConfig?.heading}
                    text={doubleButtonConfig?.text}
                    confirmText={doubleButtonConfig?.confirmText}
                    cancelText={doubleButtonConfig?.cancelText}
                    onConfirm={doubleButtonConfig?.onConfirm}
                    onCancel={doubleButtonConfig?.onCancel}
                    snapPoints={['35%']}
                  />
                </KeyboardAvoidingView>
              </SafeAreaView>
            </GestureHandlerRootView>
          </ToastProvider>
        </SafeAreaProvider>
      </DoubleButtonAlertContext.Provider>
    </AlertSheetContext.Provider>
  );
}