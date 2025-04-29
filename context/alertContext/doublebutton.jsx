import React, { useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import HeadingText from '../../components/global/HeadingText';
import RegularText from '../../components/global/RegularText';
import { COLOR } from '../../constants/colors';

const DoubleButtonAlert = React.forwardRef(
  (
    {
      onClose,
      icon,
      image,
      heading,
      text,
      confirmText = "Confirm",
      cancelText = "Cancel",
      onConfirm,
      onCancel,
      snapPoints = ['35%'], 
    },
    ref
  ) => {
    const handleSheetChanges = useCallback(
      (index) => {
        if (index === -1) {
          onClose?.();
        }
      },
      [onClose]
    );

    // Render custom backdrop component
    const renderBackdrop = useCallback(props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        enableTouchThrough={false}
        pressBehavior="close"
      />
    ), []);

    // Handle confirmation button press
    const handleConfirmPress = () => {
      if (onConfirm) {
        onConfirm();
      }
      onClose?.();
    };

    // Handle cancel button press
    const handleCancelPress = () => {
      if (onCancel) {
        onCancel();
      }
      onClose?.();
    };

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        style={{ zIndex: 9999, elevation: 9999 }}
        handleStyle={{ backgroundColor: COLOR.white }}
      >
        <BottomSheetView>
          {/* Main content container with all items */}
          <View style={styles.contentContainer}>
            {/* Main centered content */}
            <View style={styles.mainContent}>
              {icon && <View style={styles.icon}>{icon}</View>}
              {heading && (
                <HeadingText text={heading} textStyles={styles.heading} />
              )}
            </View>

            {/* Regular text in smaller width container */}
            {text && (
              <View style={styles.textContainer}>
                <RegularText text={text} textStyles={styles.text} />
              </View>
            )}
            
            {/* Buttons */}
            <View style={styles.buttonRow}>
              {/* Cancel Button on left */}
              <TouchableOpacity 
                style={styles.secondaryButton} 
                onPress={handleCancelPress}
              >
                <HeadingText text={cancelText} textStyles={styles.secondaryButtonText} />
              </TouchableOpacity>
              
              {/* Confirm Button on right */}
              <TouchableOpacity 
                style={[styles.primaryButton, { backgroundColor: COLOR.red }]} 
                onPress={handleConfirmPress}
              >
                <HeadingText text={confirmText} textStyles={styles.primaryButtonText} />
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    padding: 20,
    gap: 10,
    width: '100%',
  },
  mainContent: {
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    color: COLOR.darkGray,
    marginBottom: 4,
    textAlign: 'center',
  },
  textContainer: {
    width: '85%',
    alignItems: 'center',
    marginVertical: 15,
  },
  text: {
    fontSize: 16,
    color: COLOR.mediumGray,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLOR.lightGray,
  },
  secondaryButtonText: {
    color: COLOR.darkGray,
    fontSize: 16,
  },
  primaryButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 8,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DoubleButtonAlert;
