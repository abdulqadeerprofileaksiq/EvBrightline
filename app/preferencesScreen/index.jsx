import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScaledSheet } from 'react-native-size-matters';
import { COLOR } from '../../constants/colors';
import Header from '../../components/global/Header';
import { FONT } from '../../constants/font';
import RegularText from '../../components/global/RegularText';

const PreferencesScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [distanceUnit, setDistanceUnit] = useState('km');

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const setKilometers = () => {
    setDistanceUnit('km');
  };

  const setMiles = () => {
    setDistanceUnit('mile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header text="Preferences" />
      
      <View style={styles.content}>
        {/* Preferences List */}
        <View style={styles.preferencesContainer}>
          {/* Notification Toggle */}
          <View style={styles.preferenceRow}>
            <RegularText 
              text="Notification" 
              textStyles={styles.preferenceLabel} 
            />
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={toggleNotifications}
              style={[
                styles.toggleContainer, 
                { backgroundColor: notificationsEnabled ? COLOR.amber : '#E5E5E5' }
              ]}
            >
              <View 
                style={[
                  styles.toggleCircle,
                  notificationsEnabled ? { transform: [{ translateX: 20 }] } : { transform: [{ translateX: 0 }] }
                ]} 
              />
            </TouchableOpacity>
          </View>

          {/* Distance Unit Selection */}
          <View style={styles.preferenceRow}>
            <RegularText 
              text="Distance" 
              textStyles={styles.preferenceLabel} 
            />
            <View style={styles.segmentContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={setKilometers}
                style={[
                  styles.segmentButton,
                  distanceUnit === 'km' ? { backgroundColor: COLOR.amber } : null,
                ]}
              >
                <RegularText 
                  text="Km" 
                  textStyles={[
                    styles.segmentText,
                    distanceUnit === 'km' ? styles.activeSegmentText : null
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={setMiles}
                style={[
                  styles.segmentButton,
                  distanceUnit === 'mile' ? { backgroundColor: COLOR.amber } : null,
                ]}
              >
                <RegularText 
                  text="Mile" 
                  textStyles={[
                    styles.segmentText,
                    distanceUnit === 'mile' ? styles.activeSegmentText : null
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: '16@s',
  },
  preferencesContainer: {
    paddingTop: '16@vs',
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '16@vs',
    borderBottomColor: '#F0F0F0',
  },
  preferenceLabel: {
    fontSize: '16@ms',
    fontFamily: FONT.medium,
    color: COLOR.darkGray,
  },
  toggleContainer: {
    width: '50@s',
    height: '30@vs',
    borderRadius: '15@s',
    padding: '5@s',
    justifyContent: 'center',
  },
  toggleCircle: {
    width: '25@s',
    height: '25@s',
    borderRadius: '50@s',
    backgroundColor: 'white',
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#E5E5E5',
    borderRadius: '40@s',
    overflow: 'hidden',
  },
  segmentButton: {
    paddingVertical: '6@vs',
    paddingHorizontal: '16@s',
    borderRadius: '40@s',
  },
  segmentText: {
    fontSize: '14@ms',
    fontFamily: FONT.regular,
    color: COLOR.darkGray,
  },
  activeSegmentText: {
    color: 'white',
    fontFamily: FONT.medium,
  },
});

export default PreferencesScreen;
