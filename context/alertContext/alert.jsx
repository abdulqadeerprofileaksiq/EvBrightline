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
      onButtonPress,
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
      />
    ), []);

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        style={{ zIndex: 9999, elevation: 9999 }}
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
            
            {/* Button */}
            {buttonText && (
              <TouchableOpacity style={styles.button} onPress={onButtonPress}>
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
