import React, { useState } from 'react';
import { Text, View, SafeAreaView, Image, useWindowDimensions, StatusBar } from 'react-native';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import { COLOR } from '../../constants/colors';
import Logo from "../../assets/images/EV_Logodark.png";
import CarVector from "../../assets/images/homeimg/carmodel.png";
import CarCharging from "../../assets/images/homeimg/vectorCar.png";
import HomeBottomSheet from '../../components/bottom_sheets/home_sheet/Homebottomsheet';
import RegularText from '../../components/global/RegularText';

const Home = () => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(true);
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;
  const boxWidth = isLandscape ? width * 0.5 - scale(16) : width - scale(32);
  const boxHeight = isLandscape ? height * 0.5 : Math.min(width * 0.9, height * 0.4);

  return (
    <>
      <StatusBar backgroundColor={COLOR.white} barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.headerSection}>
          <View style={styles.header}>
            <Image source={Logo} style={styles.logoImage} />
            <Text style={styles.title}>EV - BRIGHTLINE</Text>
            {/* Notification icon placeholder */}
          </View>
          <View style={styles.divider} />

          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeHeading}>Welcome John</Text>
            <View style={[styles.infoBox, { width: boxWidth, height: boxHeight }]}>
              <View style={styles.infoBoxHeader}>
                <View>
                  <Text style={styles.carModel}>Tesla Model 3</Text>
                  <Text style={styles.licensePlate}>MM 4919 RGN</Text>
                </View>
                <Image source={CarVector} style={styles.carVector} resizeMode="contain" />
              </View>
              <View style={styles.dividerHorizontal} />
              <View style={styles.infoBoxContent}>
                <View style={styles.chargingContainer}>
                  <Image
                    source={CarCharging}
                    style={styles.chargingImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.textWrapper}>
                  <RegularText
                    text="You have not visited any EV charging station yet."
                    textStyles={styles.noVisitText}
                    numberOfLines={2}
                    adjustsFontSizeToFit
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <HomeBottomSheet onClose={() => setBottomSheetVisible(false)} />
      </SafeAreaView>
    </>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  headerSection: {
    width: '100%',
    paddingBottom: '10@vs',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '16@s',
    paddingVertical: '8@vs',
    marginTop: '32@vs',
  },
  logoImage: {
    width: '40@ms',
    height: '40@ms',
    resizeMode: "contain",
  },
  title: {
    fontSize: '22@ms',
    fontFamily: 'Urbanist-Bold',
    color: COLOR.darkGray,
    flex: 1,
    marginLeft: '10@s',
  },
  divider: {
    height: 1,
    backgroundColor: COLOR.lightGray,
    width: '90%',
    alignSelf: 'center',
    marginVertical: '4@vs',
  },
  welcomeSection: {
    width: '100%',
    paddingHorizontal: '16@s',
    paddingTop: '10@vs',
  },
  welcomeHeading: {
    fontSize: '24@ms',
    fontFamily: 'Urbanist-Bold',
    color: COLOR.darkGray,
    marginBottom: '12@vs',
  },
  infoBox: {
    backgroundColor: COLOR.white,
    borderWidth: 1,
    borderColor: COLOR.lightGray,
    borderRadius: '10@ms',
    padding: '12@ms',
    marginBottom: '8@vs',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: '3@ms',
    elevation: 2,
    alignSelf: 'center',
  },
  infoBoxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  carModel: {
    fontSize: '18@ms',
    fontFamily: 'Urbanist-Bold',
    color: COLOR.darkGray,
  },
  licensePlate: {
    fontSize: '14@ms',
    fontFamily: 'Urbanist-Medium',
    color: COLOR.mediumGray,
    marginTop: '4@vs',
  },
  carVector: {
    width: '80@ms',
    height: '40@ms',
    resizeMode: 'contain',
  },
  dividerHorizontal: {
    height: 1,
    backgroundColor: COLOR.lightGray,
    width: '100%',
    marginVertical: '12@vs',
  },
  infoBoxContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: '8@s',
  },
  chargingContainer: {
    width: '80%',
    aspectRatio: 1.6,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '100@vs',
  },
  chargingImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8@vs',
    paddingHorizontal: '5@s',
  },
  noVisitText: {
    fontSize: '12@ms',
    fontFamily: 'Urbanist-Regular',
    textAlign: 'center',
    color: COLOR.darkGray,
    width: '100%',
  },
});

export default Home;
