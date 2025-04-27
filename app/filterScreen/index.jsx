import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { ScaledSheet, moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Header from '../../components/global/Header';
import HeadingText from '../../components/global/HeadingText';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { FONT } from '../../constants/font';
import COLOR from '../../constants/colors';

export default function FilterScreen() {
  const [sliderValues, setSliderValues] = useState([5, 350]);
  const [displayValues, setDisplayValues] = useState(`${sliderValues[0]} kW - ${sliderValues[1]}+ kW`);
  
  // Selection states for each section
  const [selectedPlugs, setSelectedPlugs] = useState([]);
  const [selectedCharger, setSelectedCharger] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  
  // Use a debounced update to improve performance
  const updateDisplayValues = useCallback((values) => {
    setSliderValues(values);
    setDisplayValues(`${values[0]} kW - ${values[1]}+ kW`);
  }, []);

  // Toggle selection for plug types
  const togglePlugSelection = (plugType) => {
    setSelectedPlugs(prev => 
      prev.includes(plugType)
        ? prev.filter(item => item !== plugType)
        : [...prev, plugType]
    );
  };
  
  // Set selected charger option
  const selectCharger = (charger) => {
    setSelectedCharger(charger);
  };
  
  // Toggle selection for amenities
  const toggleAmenitySelection = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(item => item !== amenity)
        : [...prev, amenity]
    );
  };

  // EV Charger plug types with their images
  const plugTypes = [
    { id: 'type1', name: 'Type 1', image: require('../../assets/images/EV_Chargers/fivepinBlack.png') },
    { id: 'type2', name: 'Type 2', image: require('../../assets/images/EV_Chargers/fivepinBlack.png') },
    { id: 'css', name: 'CSS', image: require('../../assets/images/EV_Chargers/sevenpinBlack.png') },
    { id: 'chademo', name: 'CHAdeMO', image: require('../../assets/images/EV_Chargers/ninepinBlack.png') },
    { id: 'gbtdc', name: 'GB/T (DC)', image: require('../../assets/images/EV_Chargers/tenpinBlack.png') },
    { id: 'gbtac', name: 'GB/T (AC)', image: require('../../assets/images/EV_Chargers/ninepinBlack.png') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header text="All Filter" dark={false} />
      <ScrollView style={styles.scrollView}>
        {/* Kilowatt Range Section */}
        <View style={styles.section}>
          <HeadingText text="Kilowatt Range" textStyles={{ fontSize: moderateScale(18), textAlign: 'left', marginBottom: verticalScale(2) }} />
          <HeadingText 
            text={displayValues} 
            textStyles={{ 
              fontSize: moderateScale(16), 
              textAlign: 'center',
              marginBottom: 0, // Remove margin
              marginTop: 0 // Ensure there's no top margin
            }} 
          />
          <View style={[styles.sliderContainer, { marginTop: 0, height: verticalScale(40), marginBottom: 0 }]}>
            <MultiSlider
              values={sliderValues}
              min={5}
              max={350}
              step={5}
              sliderLength={scale(280)}
              enabledOne={true}
              enabledTwo={true}
              onValuesChange={updateDisplayValues}
              onValuesChangeFinish={updateDisplayValues}
              snapped={true}
              selectedStyle={{ 
                backgroundColor: '#FFB700', 
                height: verticalScale(4) 
              }}
              unselectedStyle={{ 
                backgroundColor: '#E5E5E5', 
                height: verticalScale(4) 
              }}
              trackStyle={{
                height: verticalScale(4)
              }}
              markerStyle={{
                height: moderateScale(24),
                width: moderateScale(24),
                borderRadius: moderateScale(12),
                backgroundColor: '#FFF',
                borderWidth: 2,
                borderColor: '#FFB700',
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
              pressedMarkerStyle={{
                backgroundColor: '#FFE7B3',
              }}
              containerStyle={{ 
                alignSelf: 'center',
                paddingHorizontal: scale(16),
                marginTop: 0,
                marginBottom: 0 // Remove bottom margin
              }}
              isMarkersSeparated={true}
            />
          </View>
          <View style={[styles.fastChargingContainer, { marginTop: 0 }]}>
            <Image 
              source={require('../../assets/images/filter/electricicon.png')} 
              style={styles.electricIcon} 
            />
            <Text style={styles.fastChargingText}>Fast charging enabled</Text>
          </View>
        </View>
        
        {/* Vehicle & Plugs Section */}
        <View style={styles.section}>
          <HeadingText text="Vehicle & Plugs" textStyles={{ fontSize: moderateScale(18), textAlign: 'left', marginBottom: verticalScale(12) }} />
          
          <View style={styles.subsection}>
            <View style={styles.vehicleRow}>
              <Text style={styles.subsectionTitle}>Vehicle</Text>
              <Text style={styles.selectedVehicle}>Audi A8 Plug-In Hybrid</Text>
            </View>
          </View>
          
          {/* Plug Types */}
          <View style={styles.plugTypesContainer}>
            <View style={styles.plugGridRow}>
              {/* First row */}
              {plugTypes.slice(0, 3).map((plug) => (
                <TouchableOpacity 
                  key={plug.id}
                  style={[
                    styles.plugTypeButton, 
                    selectedPlugs?.includes(plug.id) && styles.selectedOption
                  ]}
                  onPress={() => togglePlugSelection?.(plug.id)}
                >
                  <Image source={plug.image} style={styles.plugTypeImage} />
                  <Text style={styles.plugTypeText}>{plug.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.plugGridRow}>
              {/* Second row */}
              {plugTypes.slice(3).map((plug) => (
                <TouchableOpacity 
                  key={plug.id}
                  style={[
                    styles.plugTypeButton, 
                    selectedPlugs?.includes(plug.id) && styles.selectedOption
                  ]}
                  onPress={() => togglePlugSelection?.(plug.id)}
                >
                  <Image source={plug.image} style={styles.plugTypeImage} />
                  <Text style={styles.plugTypeText}>{plug.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        
        {/* Station Chargers Section */}
        <View style={styles.section}>
          <HeadingText text="Station Chargers" textStyles={{ fontSize: moderateScale(18), textAlign: 'left', marginBottom: verticalScale(12) }} />
          <View style={styles.chargerOptions}>
            <TouchableOpacity 
              style={[
                styles.chargerButton, 
                selectedCharger === 'Any' && styles.selectedOption
              ]}
              onPress={() => selectCharger('Any')}
            >
              <Text style={styles.chargerButtonText}>Any</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.chargerButton, 
                selectedCharger === '2+' && styles.selectedOption
              ]}
              onPress={() => selectCharger('2+')}
            >
              <Text style={styles.chargerButtonText}>2+</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.chargerButton, 
                selectedCharger === '4+' && styles.selectedOption
              ]}
              onPress={() => selectCharger('4+')}
            >
              <Text style={styles.chargerButtonText}>4+</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.chargerButton, 
                selectedCharger === '6+' && styles.selectedOption
              ]}
              onPress={() => selectCharger('6+')}
            >
              <Text style={styles.chargerButtonText}>6+</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Amenities Section */}
        <View style={styles.section}>
          <HeadingText text="Amenities" textStyles={{ fontSize: moderateScale(18), textAlign: 'left', marginBottom: verticalScale(12) }} />
          <View style={styles.amenitiesGrid}>
            <View style={styles.amenitiesRow}>
              <TouchableOpacity 
                style={[
                  styles.amenityButton, 
                  selectedAmenities.includes('Wifi') && styles.selectedOption
                ]}
                onPress={() => toggleAmenitySelection('Wifi')}
              >
                <Ionicons name="wifi" size={24} color="black" />
                <Text style={styles.amenityText}>Wifi</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.amenityButton, 
                  selectedAmenities.includes('Maintenance') && styles.selectedOption
                ]}
                onPress={() => toggleAmenitySelection('Maintenance')}
              >
                <FontAwesome5 name="tools" size={24} color="black" />
                <Text style={styles.amenityText}>Maintenance</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.amenityButton, 
                  selectedAmenities.includes('Dining') && styles.selectedOption
                ]}
                onPress={() => toggleAmenitySelection('Dining')}
              >
                <Ionicons name="restaurant" size={24} color="black" />
                <Text style={styles.amenityText}>Dining</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.amenitiesRow}>
              <TouchableOpacity 
                style={[
                  styles.amenityButton, 
                  selectedAmenities.includes('Grocery') && styles.selectedOption
                ]}
                onPress={() => toggleAmenitySelection('Grocery')}
              >
                <FontAwesome5 name="shopping-cart" size={24} color="black" />
                <Text style={styles.amenityText}>Grocery</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.amenityButton, 
                  selectedAmenities.includes('Park') && styles.selectedOption
                ]}
                onPress={() => toggleAmenitySelection('Park')}
              >
                <FontAwesome5 name="tree" size={24} color="black" />
                <Text style={styles.amenityText}>Park</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.amenityButton, 
                  selectedAmenities.includes('Shopping') && styles.selectedOption
                ]}
                onPress={() => toggleAmenitySelection('Shopping')}
              >
                <FontAwesome5 name="shopping-bag" size={24} color="black" />
                <Text style={styles.amenityText}>Shopping</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.locationCount}>35 Locations</Text>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: '16@s',
    paddingVertical: '16@vs',
  },
  sectionTitle: {
    fontSize: '18@ms',
    fontFamily: FONT.bold,
    marginBottom: '12@vs',
    textAlign: 'left'
  },
  sliderContainer: {
    height: '40@vs', 
    position: 'relative',
    marginBottom: 0, 
    marginTop: 0 
  },
  electricIcon: {
    width: '20@ms',
    height: '20@ms',
    resizeMode: 'contain',
  },
  fastChargingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '0@vs', 
    marginBottom: '8@vs',
  },
  fastChargingText: {
    color: '#666',
    fontSize: '16@ms',
    fontFamily: FONT.regular,
    marginLeft: '8@s',
  },
  subsection: {
    marginBottom: '16@vs',
  },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subsectionTitle: {
    fontSize: '16@ms',
    fontFamily: FONT.semiBold,
  },
  selectedVehicle: {
    fontSize: '16@ms',
    fontFamily: FONT.semiBold,
    color: '#FFB700',
  },
  plugTypesContainer: {
    marginBottom: '8@vs',
  },
  plugGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    
  },
  plugTypeButton: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.white, // Changed from lightGray to white
    borderWidth: 1, // Added border
    borderColor: COLOR.lightGray, // Added light gray border
    margin: 0,
    borderRadius: 0,
  },
  plugTypeImage: {
    width: '28@ms',
    height: '28@ms',
    resizeMode: 'contain',
    marginBottom: '4@vs',
  },
  plugTypeText: {
    fontSize: '12@ms',
    marginTop: '4@vs',
    fontFamily: FONT.medium,
    textAlign: 'center',
  },
  selectedOption: {
    backgroundColor: '#FFE7B3',
    borderWidth: 1,
    borderColor: '#FFB700',
  },
  chargerOptions: {
    flexDirection: 'row',
    marginBottom: '16@vs',
  },
  chargerButton: {
    flex: 1,
    paddingVertical: '12@vs',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.white,
    borderWidth: 1,
    borderColor: COLOR.lightGray,

    margin: 0, 
    borderRadius: 0, 
  },
  chargerButtonText: {
    fontSize: '14@ms',
    fontFamily: FONT.medium,
  },
  amenitiesGrid: {
    marginBottom: '16@vs',
  },
  amenitiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 0,
  },
  amenityButton: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: COLOR.white, // Changed from #F5F5F5 to white
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1, // Changed from 0 to 1
    borderColor: COLOR.lightGray, // Added light gray border
    paddingVertical: '16@vs',
    margin: 0,
    borderRadius: 0,
  },
  amenityText: {
    fontSize: '12@ms',
    marginTop: '4@vs',
    fontFamily: FONT.medium,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationCount: {
    fontSize: 16,
    fontWeight: '600',
  },
  viewButton: {
    backgroundColor:COLOR.purple,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  viewButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});