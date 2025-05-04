import React from 'react';
import { View, Image, SafeAreaView, ScrollView, StatusBar,TouchableOpacity } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import HeadingText from '../../components/global/HeadingText';
import RegularText from '../../components/global/RegularText';
import { useRouter } from 'expo-router';
import { COLOR } from '../../constants/colors';
import Header from '../../components/global/Header';

const ChargingStationDetailScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView style={styles.scrollView}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/bottom_sheets/station.png')}
            style={styles.headerImage}
            resizeMode="cover"
          />
          
          {/* Replace back button with Header component */}
          <View style={styles.headerContainer}>
            <Header dark={true} transparent={true} />
          </View>
        </View>

        {/* Station Info */}
        <View style={styles.infoContainer}>
          <HeadingText text="Veen Charging Station" textStyles={styles.stationName} />
          
          <View style={styles.addressRow}>
            <Ionicons name="location-outline" size={16} color="#F59E0B" />
            <RegularText text="21212 Co Rd 742, Airport, United States" textStyles={styles.addressText} />
          </View>
          
          <View style={styles.distanceRow}>
            <MaterialIcons name="directions-car" size={16} color="#F59E0B" />
            <RegularText text="2.5km/15 mins away" textStyles={styles.distanceText} />
          </View>
          
          <View style={styles.hoursRow}>
            <RegularText text="Open Now: " textStyles={styles.openNowText} />
            <RegularText text="12:00 AM to 12:00 PM" textStyles={styles.hoursText} />
          </View>

          {/* About Section */}
          <View style={styles.sectionContainer}>
            <HeadingText text="About" textStyles={styles.sectionTitle} />
            <RegularText 
              text="With years of experience, VEEN TECH provides customers with one-stop EV charging solutions along its leading EV charging System to charge the future."
              textStyles={styles.aboutText} 
            />
          </View>

          {/* Amenities Section */}
          <View style={styles.sectionContainer}>
            <HeadingText text="Amenities" textStyles={styles.sectionTitle} />
            <View style={styles.amenitiesContainer}>
              <View style={styles.amenityItem}>
                <MaterialIcons name="restaurant" size={24} color="#666" />
                <RegularText text="Food" textStyles={styles.amenityText} />
              </View>
              <View style={styles.amenityItem}>
                <MaterialIcons name="wifi" size={24} color="#666" />
                <RegularText text="Wi-Fi" textStyles={styles.amenityText} />
              </View>
              <View style={styles.amenityItem}>
                <MaterialIcons name="fastfood" size={24} color="#666" />
                <RegularText text="Dining" textStyles={styles.amenityText} />
              </View>
              <View style={styles.amenityItem}>
                <MaterialIcons name="build" size={24} color="#666" />
                <RegularText text="Maintenance" textStyles={styles.amenityText} />
              </View>
            </View>
          </View>

          {/* Connections Section */}
          <View style={styles.sectionContainer}>
            <HeadingText text="Connections Available" textStyles={styles.sectionTitle} />
            <View style={styles.connectionsContainer}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <View key={item} style={styles.connectorItem}>
                  <MaterialCommunityIcons name="ev-station" size={28} color="#333" />
                </View>
              ))}
            </View>
          </View>
        </View>
         {/* Direction Button */}
      <TouchableOpacity style={styles.directionButton}>
        <RegularText text="Direction" textStyles={styles.directionButtonText} />
        <FontAwesome5 name="location-arrow" size={16} color="#fff" />
      </TouchableOpacity>
         </ScrollView>     
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '200@vs',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  infoContainer: {
    padding: '16@s',
  },
  stationName: {
    fontSize: '22@ms',
    color: COLOR.darkGray,
    marginBottom: '12@vs',
    textAlign: 'left',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '4@vs',
  },
  addressText: {
    fontSize: '14@ms',
    color: '#666',
    marginLeft: '8@s',
    textAlign: 'left',
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '4@vs',
  },
  distanceText: {
    fontSize: '14@ms',
    color: '#666',
    marginLeft: '8@s',
    textAlign: 'left',
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '4@vs',
  },
  openNowText: {
    fontSize: '14@ms',
    color: '#F59E0B',
    fontWeight: '600',
    textAlign: 'left',
  },
  hoursText: {
    fontSize: '14@ms',
    color: '#666',
    textAlign: 'left',
  },
  sectionContainer: {
    marginTop: '24@vs',
  },
  sectionTitle: {
    fontSize: '18@ms',
    color: COLOR.darkGray,
    marginBottom: '12@vs',
    textAlign: 'left',
  },
  aboutText: {
    fontSize: '14@ms',
    color: '#666',
    lineHeight: '20@vs',
    textAlign: 'left',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  amenityItem: {
    alignItems: 'center',
    width: '25%',
  },
  amenityText: {
    fontSize: '12@ms',
    color: '#666',
    marginTop: '4@vs',
    textAlign: 'center',
  },
  connectionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  connectorItem: {
    width: '50@s',
    height: '50@s',
    borderRadius: '25@s',
    borderWidth: '1@s',
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '8@s',
    marginBottom: '8@vs',
  },
  directionButton: {
    flexDirection: 'row',
    backgroundColor: COLOR.purple,
    padding: '16@s',
    alignItems: 'center',
    justifyContent: 'center',
  },
  directionButtonText: {
    color: '#fff',
    fontSize: '16@ms',
    marginRight: '8@s',
    fontWeight: '600',
  },
});

export default ChargingStationDetailScreen;