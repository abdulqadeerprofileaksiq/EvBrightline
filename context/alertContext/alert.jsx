import React, { useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import HeadingText from '../../components/global/HeadingText';
import RegularText from '../../components/global/RegularText';
import COLOR from '@/constants/colors';

const AlertBottomSheet = React.forwardRef(
  (
    {
      onClose,
      icon,
      image,
      heading,
      text,
      buttonText,
      secondaryButtonText,
      onButtonPress,
      onSecondaryButtonPress,
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

    // Handle button press - if custom handler provided, use it, then close
    const handleButtonPress = () => {
      if (onButtonPress) {
        // Execute the custom handler first
        onButtonPress();
        // Don't call onClose since the custom handler will show another alert
      } else {
        // Only close the sheet if there's no custom handler
        onClose?.();
      }
    };

    // Handle secondary button press
    const handleSecondaryButtonPress = () => {
      if (onSecondaryButtonPress) {
        onSecondaryButtonPress();
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
              {image && (
                <Image
                  source={image}
                  style={styles.image}
                  resizeMode="contain"
                />
              )}
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
            {secondaryButtonText ? (
              <View style={styles.buttonRow}>
                {/* Secondary Button (No) on left */}
                <TouchableOpacity 
                  style={styles.secondaryButton} 
                  onPress={handleSecondaryButtonPress}
                >
                  <HeadingText text={secondaryButtonText} textStyles={styles.secondaryButtonText} />
                </TouchableOpacity>
                
                {/* Primary Button (Yes) on right */}
                <TouchableOpacity 
                  style={styles.primaryButton} 
                  onPress={handleButtonPress}
                >
                  <HeadingText text={buttonText} textStyles={styles.primaryButtonText} />
                </TouchableOpacity>
              </View>
            ) : (
              /* Single Button */
              <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                <HeadingText text={buttonText} textStyles={styles.buttonText} />
              </TouchableOpacity>
            )}
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
  image: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  heading: {
    fontSize: 24,
    color: COLOR.darkGray,
    marginBottom: 4,
    textAlign: 'center',
  },
  textContainer: {
    width: '70%',
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
    backgroundColor: COLOR.purple,
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
  button: {
    marginTop: 10,
    backgroundColor: COLOR.purple,
    borderRadius: 8,
    paddingHorizontal: 110,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AlertBottomSheet;
