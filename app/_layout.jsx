import { Stack, usePathname } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useCallback, useRef, useState, createContext } from "react";
import * as SplashScreen from "expo-splash-screen";
import COLOR from "../constants/colors";
import { ToastProvider } from '../context/toastContext/ToastContext';
import { KeyboardAvoidingView, Platform, View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AlertBottomSheet from '../context/alertContext/alert';

// Create alert context
export const AlertSheetContext = createContext();

// Screens that should ignore SafeAreaView
const FULL_SCREEN_ROUTES = [
  '/[stationDetails]', // Add any other routes that need to ignore SafeAreaView
];

// Keep splash screen visible while loading fonts
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const alertSheetRef = useRef(null);
  const [alertConfig, setAlertConfig] = useState(null);
  const pathname = usePathname();
  
  // Check if current route is in the full screen list
  const isFullScreenRoute = FULL_SCREEN_ROUTES.some(route => 
    pathname.startsWith(route.replace('[', '').replace(']', ''))
  );

  // Unified alert function
  const showAlert = (config) => {
    setAlertConfig(config);
    setTimeout(() => {
      alertSheetRef.current?.snapToIndex(0);
    }, 100);
  };

  const handleCloseAlert = () => {
    alertSheetRef.current?.close();
    setAlertConfig(null);
  };

  // Load fonts
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

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AlertSheetContext.Provider value={showAlert}>
      <SafeAreaProvider>
        <ToastProvider>
          <GestureHandlerRootView style={styles.container} onLayout={onLayoutRootView}>
            <StatusBar style={isFullScreenRoute ? "light" : "dark"} />
            
            {isFullScreenRoute ? (
              // For full screen routes like stationDetails, render Stack directly without SafeAreaView
              <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
              >
                <Stack screenOptions={{ headerShown: false }} />
              </KeyboardAvoidingView>
            ) : (
              // For normal routes, use the SafeAreaView
              <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                  style={styles.keyboardView}
                  behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                  <Stack screenOptions={{ headerShown: false }} />
                </KeyboardAvoidingView>
              </SafeAreaView>
            )}
            
            {/* Bottom sheet positioned absolute to cover entire screen */}
            <View style={styles.bottomSheetContainer}>
              <AlertBottomSheet
                ref={alertSheetRef}
                onClose={handleCloseAlert}
                {...alertConfig}
                snapPoints={alertConfig?.snapPoints || ['50%']}
              />
            </View>
          </GestureHandlerRootView>
        </ToastProvider>
      </SafeAreaProvider>
    </AlertSheetContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLOR.white 
  },
  safeArea: { 
    flex: 1 
  },
  keyboardView: { 
    flex: 1 
  },
  bottomSheetContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none',
  }
});