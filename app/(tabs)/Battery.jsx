import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import HeadingText from '../../components/global/HeadingText';
import COLOR from '../../constants/colors';
import { AlertSheetContext } from './_layout';

// Import the charger image
import chargerImg from '../../assets/images/bottom_sheets/charger.png';

function Battery() {
  const showAlert = useContext(AlertSheetContext);

  const handleShowSheet = () => {
    showAlert({
      image: chargerImg,
      heading: "Connection Issue Detected!",
      text: "It looks like your EV charger isn't securely connected. Check the plug, secure it, and give it another go!",
      buttonText: "Try Again"
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />   
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
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
              <View style={styles.car}>
                <View style={styles.carBody}>
                  <View style={styles.carWindow} />
                </View>
              </View>
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
          
          <Text style={styles.portLabel}>Charging Port Number</Text>
          <TouchableOpacity style={styles.portSelector}>
            <Text style={styles.portNumber}>4</Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#000" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.startButton} onPress={handleShowSheet}>
            <Text style={styles.startButtonText}>Start Charging</Text>
          </TouchableOpacity>
        </View>      
      </ScrollView>     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 14,
    color: '#999',
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
    marginTop: 25,
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
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFF7E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  car: {
    width: 100,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carBody: {
    width: 100,
    height: 60,
    backgroundColor: '#853699',
    borderRadius: 12,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carWindow: {
    width: 60,
    height: 20,
    backgroundColor: '#FFF',
    borderRadius: 5,
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
  portSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 15,
  },
  portNumber: {
    fontSize: 16,
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
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  tabItem: {
    padding: 10,
  },
  tabItemActive: {
    padding: 10,
    backgroundColor: '#f8e5ff',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIndicator: {
    height: 5,
    width: 50,
    backgroundColor: 'black',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
  }
});

export default Battery;