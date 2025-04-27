import React, { useCallback } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { COLOR } from "../../../constants/colors";
import { useRouter } from "expo-router";

// Updated icon data with the specified sequence
const iconData = [
  { id: '1', icon: require('../../../assets/images/bottom_sheets/search.png'), label: 'Search' },
  { id: '2', icon: require('../../../assets/images/bottom_sheets/filter.png'), label: 'Filter' },
  { id: '3', icon: require('../../../assets/images/bottom_sheets/tick.png'), label: 'Available' },
  { id: '4', icon: require('../../../assets/images/bottom_sheets/food.png'), label: 'Food' },
  { id: '5', icon: require('../../../assets/images/bottom_sheets/shock.png'), label: 'Fast' },
  { id: '6', icon: require('../../../assets/images/bottom_sheets/chargerdark.png'), label: 'Chargers' },
];

const IconsFlatlist = ({ optimizeScrolling = false }) => {
  const router = useRouter();
  
  // Handle navigation based on icon type
  const handleIconPress = useCallback((item) => {
    switch(item.id) {
      case '1': // Search
        router.push("/searchScreen");
        break;
      case '2': // Filter
        router.push("/filterScreen");
        break;
      case '3': // Available
        router.push("/availableStationsScreen");
        break;
      case '4': // Food
        router.push("/foodScreen");
        break;
      case '5': // Fast
        router.push("/fastChargingScreen");
        break;
      case '6': // Chargers
        router.push("/chargersScreen");
        break;
      default:
        router.push("/");
    }
  }, [router]);
  
  // Memoize the rendering of each item for performance
  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity 
      style={styles.iconItem}
      activeOpacity={0.7}
      onPress={() => handleIconPress(item)}
    >
      <View style={styles.iconCircle}>
        <Image source={item.icon} style={styles.icon} resizeMode="contain" />
      </View>
      <Text style={styles.iconLabel}>{item.label}</Text>
    </TouchableOpacity>
  ), [handleIconPress]);

  // Extract the key for each item
  const keyExtractor = useCallback((item) => item.id, []);

  // Performance optimizations
  const getItemLayout = optimizeScrolling ? 
    useCallback((data, index) => ({
      length: 80, // Approximate width of each item
      offset: 80 * index,
      index,
    }), []) : undefined;

  return (
    <FlatList
      data={iconData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      removeClippedSubviews={true}
      maxToRenderPerBatch={6}
      initialNumToRender={6}
      windowSize={6}
      getItemLayout={getItemLayout}
      snapToAlignment="start"
      snapToInterval={80} // Match with getItemLayout length
      decelerationRate="fast"
    />
  );
};

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '8@s',  // Reduced padding for container
    paddingVertical: '8@vs',
  },
  iconItem: {
    width: '72@s',  // Reduced width to accommodate smaller gaps
    alignItems: 'center',
    marginHorizontal: '2@s',  // Reduced from 5@s to 2@s for tighter spacing
  },
  iconCircle: {
    width: '50@s',
    height: '50@s',
    borderRadius: '25@s',
    backgroundColor: COLOR.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '6@vs',
    // Lighter shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    // Lighter elevation for Android
    elevation: 2,
  },
  icon: {
    width: '25@s',
    height: '25@s',
  },
  iconLabel: {
    fontSize: '12@ms',
    color: COLOR.darkGray,
    textAlign: 'center',
    marginTop: '2@vs',
  },
});

export default React.memo(IconsFlatlist); // Use memo to prevent unnecessary re-renders