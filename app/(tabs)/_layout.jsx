import React, { useEffect, useRef, useState, createContext } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScaledSheet, s } from 'react-native-size-matters';
import AlertBottomSheet from '../../context/alertContext/alert';
import { MaterialIcons } from '@expo/vector-icons';
import COLOR from '../../constants/colors';

// Create context for alert
export const AlertSheetContext = createContext();

// Custom tab button with pill highlight animation
const PillHighlightTabButton = ({ onPress, isFocused, iconName }) => {
  const highlightAnimation = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(highlightAnimation, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const pillBackgroundColor = '#F3D9FF';
  const activeIconColor = '#713C84';
  const inactiveColor = '#000000';

  // For active state, use the filled version of the icon
  const iconNameToUse = isFocused && iconName.endsWith('-outline')
    ? iconName.replace('-outline', '')
    : iconName;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.tabButton}
    >
      <Animated.View
        style={[
          styles.pillBackground,
          {
            // The background color is always visible when tab is focused
            width: isFocused
              ? s(70)
              : highlightAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, s(70)],
                }),
            opacity: isFocused ? 1 : highlightAnimation,
            backgroundColor: pillBackgroundColor,
          },
        ]}
      />
      <View style={styles.iconContainer}>
        <Ionicons
          name={iconNameToUse}
          size={s(24)}
          color={isFocused ? activeIconColor : inactiveColor}
        />
      </View>
    </TouchableOpacity>
  );
};

// Custom TabBar implementation using only navigation prop (no useRouter)
function CustomTabBar({ state, navigation }) {
  const tabs = [
    { name: 'Home', icon: 'home-outline' },
    { name: 'Battery', icon: 'battery-charging-outline' },
    { name: 'Profile', icon: 'person-outline' }
  ];

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab, idx) => {
        const isFocused = state.index === idx;
        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(tab.name);
          }
        };
        return (
          <PillHighlightTabButton
            key={tab.name}
            iconName={tab.icon}
            onPress={onPress}
            isFocused={isFocused}
          />
        );
      })}
      <View style={styles.separator} />
    </View>
  );
}

// Main tab layout
export default function TabLayout() {
  const alertSheetRef = useRef(null);
  const [alertConfig, setAlertConfig] = useState(null);

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

  return (
    <AlertSheetContext.Provider value={showAlert}>
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
          }}
          tabBar={props => <CustomTabBar {...props} />}
        >
          <Tabs.Screen name="Home" />
          <Tabs.Screen name="Battery" />
          <Tabs.Screen name="Profile" />
        </Tabs>
        <AlertBottomSheet
          ref={alertSheetRef}
          onClose={handleCloseAlert}
          icon={alertConfig?.icon}
          image={alertConfig?.image}
          heading={alertConfig?.heading}
          text={alertConfig?.text}
          buttonText={alertConfig?.buttonText}
          onButtonPress={handleCloseAlert}
          snapPoints={['55%']}
        />
      </View>
    </AlertSheetContext.Provider>
  );
}

const styles = ScaledSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    height: '60@vs',
    paddingTop: '10@vs',
    paddingBottom: '10@vs',
    position: 'relative',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  pillBackground: {
    position: 'absolute',
    height: '40@vs',
    borderRadius: '20@vs',
  },
  iconContainer: {
    zIndex: 10,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    left: '10%',
    right: '10%',
    height: '2@vs',
    backgroundColor: '#000000',
    opacity: 0.2,
  }
});