import { View, Image, Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { COLOR } from "../../../constants/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import OpenCloseIndicator from "./openCloseindicator";

const FivePin = require("../../../assets/images/EV_Chargers/fivepin.png");
const SevenPin = require("../../../assets/images/EV_Chargers/sevenpin.png");
const NinePin = require("../../../assets/images/EV_Chargers/ninepin.png");

const StationsData = ({ stationData, onLocationPress }) => {
  const defaultData = {
    name: "Veen Charging Station",
    location: "Colorado 81210, United States",
    distance: "2.5km/15 mins away",
    availablePorts: 3,
    chargerTypes: ['FivePin', 'SevenPin', 'NinePin'],
    status: "Open"
  };

  const data = stationData || defaultData;

  const chargerIcons = useMemo(() => {
    const types = data.chargerTypes || [];
    return (
      <View style={styles.chargersRow}>
        {types.includes('FivePin') && (
          <Image source={FivePin} style={styles.chargerIcon} resizeMode="contain" />
        )}
        {types.includes('SevenPin') && (
          <Image source={SevenPin} style={styles.chargerIcon} resizeMode="contain" />
        )}
        {types.includes('NinePin') && (
          <Image source={NinePin} style={styles.chargerIcon} resizeMode="contain" />
        )}
        {types.length === 0 && (
          <>
            <Image source={FivePin} style={styles.chargerIcon} resizeMode="contain" />
            <Image source={SevenPin} style={styles.chargerIcon} resizeMode="contain" />
            <Image source={NinePin} style={styles.chargerIcon} resizeMode="contain" />
          </>
        )}
      </View>
    );
  }, [data.chargerTypes]);

  const handleLocationPress = () => {
    if (onLocationPress) {
      onLocationPress(data);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.stationCard}>
          <View style={styles.imageSection}>
            <Image
              source={require("../../../assets/images/bottom_sheets/station.png")}
              style={styles.stationImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.stationName} numberOfLines={2}>
              {data.name}
            </Text>
            <View style={styles.infoRow}>
              <Icon name="location-on" style={styles.infoIcon} color={COLOR.mediumGray} />
              <Text style={styles.infoText} numberOfLines={1}>
                {data.location}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="directions-car" style={styles.infoIcon} color={COLOR.mediumGray} />
              <Text style={styles.infoText}>
                {data.distance}
              </Text>
            </View>
            <View style={styles.portsSection}>
              <Text style={styles.portsText}>
                {data.availablePorts} Charging {data.availablePorts === 1 ? 'port' : 'ports'} available
              </Text>
              {chargerIcons}
            </View>
          </View>
          <View style={styles.statusIndicatorContainer}>
            <OpenCloseIndicator status={data.status} />
          </View>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={handleLocationPress}
            activeOpacity={0.7}
          >
            <Image 
              source={require("../../../assets/images/bottom_sheets/location.png")} 
              style={styles.locationIcon} 
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
      </View>
    </View>
  );
};

export default StationsData;

const styles = ScaledSheet.create({
  mainContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: '3@vs',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: '12@s',
  },
  stationCard: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: COLOR.white,
    minHeight: '100@vs',
    paddingVertical: '10@vs',
    paddingHorizontal: '12@s',
    position: 'relative',
  },
  imageSection: {
    width: '70@s',
    aspectRatio: 0.8,
    borderRadius: '10@ms',
    overflow: 'hidden',
    marginRight: '10@s',
  },
  stationImage: {
    width: '100%',
    height: '100%',
  },
  infoSection: {
    flex: 1,
    paddingRight: '25@s',
    justifyContent: 'space-between',
  },
  stationName: {
    fontSize: '16@ms0.3',
    fontFamily: 'Urbanist-Bold',
    color: COLOR.darkGray,
    paddingRight: '60@s',
    marginBottom: '5@vs',
  },
  statusIndicatorContainer: {
    position: 'absolute',
    top: '10@vs',
    right: '12@s',
    zIndex: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '4@vs',
  },
  infoIcon: {
    fontSize: '14@ms0.3',
    marginRight: '4@s',
  },
  infoText: {
    fontSize: '12@ms0.3',
    fontFamily: 'Urbanist-Medium',
    color: COLOR.mediumGray,
    flex: 1,
  },
  portsSection: {
    marginTop: '2@vs',
  },
  portsText: {
    fontSize: '12@ms0.3',
    fontFamily: 'Urbanist-Bold',
    color: COLOR.mediumGray,
    marginBottom: '4@vs',
  },
  chargersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  chargerIcon: {
    width: '20@ms',
    height: '20@ms',
    marginRight: '8@s',
  },
  locationButton: {
    position: 'absolute',
    bottom: '10@vs',
    right: '12@s',
    width: '30@ms',
    height: '30@ms',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  locationIcon: {
    width: '30@ms',
    height: '30@ms',
  },
  divider: {
    width: '100%',
    height: '2@vs',
    backgroundColor: '#E8E8E8',
    marginTop: '5@vs',
  },
});