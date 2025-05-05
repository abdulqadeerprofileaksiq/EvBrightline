import React, { useCallback, useMemo, useRef } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { COLOR } from "../../../constants/colors";
import IconsFlatlist from './IconsFlatlist';
import StationsData from '../StationsData/StationsData';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

const HomeBottomSheet = ({ onClose }) => {
  const bottomSheetRef = useRef(null);

  // Only two snap points: 40% and 100%
  const snapPoints = useMemo(() => ['40%', '100%'], []);

 

  // Data for stations - memoized to prevent unnecessary re-renders
  const stationsData = useMemo(() => [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ], []);

  // Memoize the StationData items to prevent unnecessary re-renders
  const renderStationItems = useMemo(() => 
    stationsData.map((item) => (
      <StationsData key={item.id} />
    )),
  [stationsData]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleStyle={styles.handleStyle}
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={styles.sheetBackground}
      enableContentPanningGesture={false}
    >
      {/* Icons container with optimized rendering */}
      <View style={styles.iconsContainer}>
        <IconsFlatlist optimizeScrolling={true} />
      </View>
      
      <BottomSheetScrollView
        style={styles.content}
        contentContainerStyle={styles.contentScrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={true}
        disableScrollViewPanResponder={true}
        removeClippedSubviews={true} // Optimize memory usage
      >
        {renderStationItems}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = ScaledSheet.create({
  contentContainer: {
    flex: 1,
  },
  handleStyle: {
    backgroundColor: COLOR.white,
    borderTopLeftRadius: '16@ms',
    borderTopRightRadius: '16@ms',
  },
  handleIndicator: {
    backgroundColor: '#6E737F',
    width: '50@s',
    height: '5@vs',
  },
  sheetBackground: {
    backgroundColor: COLOR.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -20,
    },
    shadowOpacity: 0.55,
    shadowRadius: 4,
    elevation: 8
  },
  iconsContainer: {
    backgroundColor: COLOR.white,
    paddingVertical: '5@vs',
    width: '100%',
    height: '90@vs', // Set fixed height instead of min/max for better performance
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
  contentScrollContainer: {
    paddingBottom: '20@vs',
  },
});

export default HomeBottomSheet;