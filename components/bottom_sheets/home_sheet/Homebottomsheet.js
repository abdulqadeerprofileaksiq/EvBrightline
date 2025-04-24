import React, { useCallback, useMemo, useRef } from 'react';
import { View, ScrollView } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { COLOR } from "../../../constants/colors";
import IconsFlatlist from '../home_sheet/IconsFlatlist';
import StationsData from '../../bottom_sheets/StationsData/StationsData';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const HomeBottomSheet = ({ onClose }) => {
  const bottomSheetRef = useRef(null);

  // Only two snap points: 35% and 95%
  const snapPoints = useMemo(() => ['35%', '100%'], []);

  const handleSheetChanges = useCallback((index) => {
    console.log('Bottom sheet changed to index:', index);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={false}
      handleStyle={styles.handleStyle}
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={styles.sheetBackground}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.iconsContainer}>
          <IconsFlatlist />
        </View>
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentScrollContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <StationsData />
          <StationsData />
          <StationsData />
          <StationsData />
          <StationsData />
        </ScrollView>
      </BottomSheetView>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
  },
  iconsContainer: {
    backgroundColor: COLOR.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: '16@s',
  },
  contentScrollContainer: {
    paddingBottom: '100@vs',
  },
});

export default HomeBottomSheet;