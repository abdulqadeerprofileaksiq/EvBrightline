// screens/Battery.js
import React, { useContext, useState, useRef, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import HeadingText from '../../components/global/HeadingText';
import COLOR from '../../constants/colors';
import { AlertSheetContext } from '../../app/_layout';
import SlideButoon from '../../components/global/SlideButoon';
import DropDownComponent from '../../components/global/DropDown';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import PaymentScreen from '../../components/global/PaymentScreen';

// Import images
import chargerImg from '../../assets/images/bottom_sheets/charger.png';
import cardImg from '../../assets/images/bottom_sheets/payment.png';
import purpleCarImg from '../../assets/images/purpleCar.png';

function Battery() {
  const showAlert = useContext(AlertSheetContext);
  const [selectedPort, setSelectedPort] = useState('4');

  // Create a reference for the payment bottom sheet
  const paymentBottomSheetRef = useRef(null);

  // Snap points for payment bottom sheet (90% of screen height)
  const paymentSnapPoints = useMemo(() => ['90%'], []);

  // Render backdrop for payment bottom sheet
  const renderPaymentBackdrop = useCallback(props => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.5}
      enableTouchThrough={false}
      pressBehavior="close"
    />
  ), []);

  // Handle payment bottom sheet close
  const handleClosePaymentSheet = () => {
    paymentBottomSheetRef.current?.close();
  };

  const portOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
  ];

  const handleSecondaryAlert = () => {
    showAlert({
      image: cardImg,
      heading: "Link Payment Method",
      text: "No card found. Add one to power your ride!",
      buttonText: "Add",
      onButtonPress: () => {
        // Close the alert and show payment bottom sheet
        setTimeout(() => {
          paymentBottomSheetRef.current?.snapToIndex(0);
        }, 500);
      }
    });
  };

  // Primary alert with connection issue
  const handleShowSheet = () => {
    showAlert({
      image: chargerImg,
      heading: "Connection Issue Detected!",
      text: "It looks like your EV charger isn't securely connected. Check the plug, secure it, and give it another go!",
      buttonText: "Try Again",
      onButtonPress: handleSecondaryAlert
    });
  };

  // New handler specifically for slide button completion
  const handleSlideComplete = () => {
    showAlert({
      image: require('../../assets/images/shockwave.png'),
      heading: "Ready to wrap up?",
      text: "Are you sure you want to end charging now?",
      buttonText: "Yes",
      secondaryButtonText: "No",
      primaryButtonStyle: { backgroundColor: COLOR.purple },
      onButtonPress: () => {
        console.log("Charging ended by user");
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.stationInfo}>
            <HeadingText text="Veen Charging Station" textStyles={styles.stationName} />
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.locationText}>21212 Co Rd 742, Almont, United States</Text>
            </View>
          </View>
          
          <HeadingText text="100%" textStyles={styles.percentageText} />
          
          <View style={styles.carContainer}>
            <View style={styles.carBackground}>
              <Image
                source={purpleCarImg}
                style={styles.carImage}
                resizeMode="contain"
              />
            </View>
          </View>
          
          <HeadingText text="0%" textStyles={styles.percentageText} />
          
          <HeadingText text="Connect Charger" textStyles={styles.connectText} />
          <Text style={styles.remainingText}>Time remaining to full charge</Text>
          
          <Text style={styles.timerText}>00:00:00</Text>
          
          <View style={styles.infoBar}>
            <View style={styles.infoItem}>
              <HeadingText text="Charging Time" textStyles={styles.infoLabel} />
              <HeadingText text="--" textStyles={styles.infoValue} />
            </View>
            <View style={styles.infoItem}>
              <HeadingText text="Capacity Range" textStyles={styles.infoLabel} />
              <HeadingText text="--" textStyles={styles.infoValue} />
            </View>
            <View style={styles.infoItem}>
              <HeadingText text="Total Cost" textStyles={styles.infoLabel} />
              <HeadingText text="--" textStyles={styles.infoValue} />
            </View>
          </View>        
          <DropDownComponent 
            label="Select Port"
            value={selectedPort}
            onSelect={setSelectedPort}
            options={portOptions}
            containerStyle={styles.dropdownContainer}
          />
          
          <TouchableOpacity style={styles.startButton} onPress={handleShowSheet}>
            <Text style={styles.startButtonText}>Start Charging</Text>
          </TouchableOpacity>
          
          {/* Add slide button below */}
          <View style={styles.slideButtonContainer}>
            <SlideButoon 
              title="Slide to finish now"
              onComplete={handleSlideComplete} // Changed to use the new handler
            />
          </View>
        </View>
      </ScrollView>

      {/* Payment Bottom Sheet */}
      <BottomSheet
        ref={paymentBottomSheetRef}
        index={-1}
        snapPoints={paymentSnapPoints}
        enablePanDownToClose
        backdropComponent={renderPaymentBackdrop}
        style={{ zIndex: 9999 }}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          <PaymentScreen 
            onBack={handleClosePaymentSheet}
            showSkip={false}
            showHeader={false}
            headerTitle="Link Payment Method"
          />
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  stationInfo: {
    paddingTop: 15,
    alignItems: 'center',
  },
  stationName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  percentageText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
  },
  carContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
  },
  carBackground: {
    width: 120,
    height: 120,
    borderRadius: 110,
    backgroundColor: '#FFF7E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carImage: {
    width: 297,
    height: 180,
  },
  connectText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#333',
    marginTop: 10,
  },
  remainingText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  timerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFA500',
    textAlign: 'center',
    marginVertical: 15,
  },
  infoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 16,
    color: COLOR.darkGray,
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  portLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  dropdownContainer: {
    marginBottom: 15,
  },
  startButton: {
    backgroundColor: '#853699',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    marginVertical: 10,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSheetContent: {
    flex: 1,
  },
});

export default Battery;