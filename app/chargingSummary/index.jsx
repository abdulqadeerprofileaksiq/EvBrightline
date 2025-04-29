import React, { useCallback, useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import Header from '../../components/global/Header'
import { ScaledSheet } from 'react-native-size-matters'
import SlideButoon from '../../components/global/SlideButoon'
import COLOR from '../../constants/colors'
import RegularText from '../../components/global/RegularText'
import HeadingText from '../../components/global/HeadingText'
import { router } from 'expo-router'


const index = () => {
  const [chargingCost, setChargingCost] = useState('$47');
  
  const handlePaymentComplete = useCallback(() => {
    console.log('Payment completed, navigating to success screen');
    setTimeout(() => {
      router.push({
        pathname: '/successScreen',
        params: { 
          amount: chargingCost,
        }
      });
    }, 100);
  }, [chargingCost]);

  return (
    <>
    <Header text="Charging Summary" dark={false} />
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >      
        <View style={styles.contentContainer}>
          {/* Vehicle Information Section */}
          <View style={styles.section}>
            <HeadingText text="Vehicle Information" textStyles={styles.sectionTitle} />
            <View style={styles.infoRow}>
              <RegularText text="Brand" textStyles={styles.infoLabel} />
              <HeadingText text="Tesla" textStyles={styles.infoValue} />
            </View>
            <View style={styles.infoRow}>
              <RegularText text="Model" textStyles={styles.infoLabel} />
              <HeadingText text="Model3" textStyles={styles.infoValue} />
            </View>
            <View style={styles.infoRow}>
              <RegularText text="Battery Capacity Range" textStyles={styles.infoLabel} />
              <HeadingText text="120 km/h" textStyles={styles.infoValue} />
            </View>
            <View style={styles.infoRow}>
              <RegularText text="Connector Type" textStyles={styles.infoLabel} />
              <HeadingText text="Type-C" textStyles={styles.infoValue} />
            </View>
            <View style={styles.infoRow}>
              <RegularText text="License Plate No." textStyles={styles.infoLabel} />
              <HeadingText text="M-M 4919 RQN" textStyles={styles.infoValue} />
            </View>
          </View>

          {/* Station Information Section */}
          <View style={styles.section}>
            <HeadingText text="Station Information" textStyles={styles.sectionTitle} />
            <View style={styles.infoRow}>
              <RegularText text="Station Name" textStyles={styles.infoLabel} />
              <HeadingText text="Veen Charging Station" textStyles={styles.infoValue} />
            </View>
            <View style={styles.infoRow}>
              <RegularText text="Location" textStyles={styles.infoLabel} />
              <HeadingText text={"Colorado 8120, United\nStates"} textStyles={styles.infoValue} />
            </View>
          </View>

          {/* Charging Information Section */}
          <View style={styles.section}>
            <HeadingText text="Charging Information" textStyles={styles.sectionTitle} />
            <View style={styles.infoRow}>
              <RegularText text="Charging Port Number" textStyles={styles.infoLabel} />
              <HeadingText text="4" textStyles={styles.infoValue} />
            </View>
            <View style={styles.infoRow}>
              <RegularText text="Start Charging" textStyles={styles.infoLabel} />
              <HeadingText text="24/02/25 11:30 Am" textStyles={styles.infoValue} />
            </View>
            <View style={styles.infoRow}>
              <RegularText text="End Charging" textStyles={styles.infoLabel} />
              <HeadingText text="24/02/25 01:00 Pm" textStyles={styles.infoValue} />
            </View>
            <View style={styles.infoRow}>
              <RegularText text="Usage (kWh)" textStyles={styles.infoLabel} />
              <HeadingText text="50.25 kWh" textStyles={styles.infoValue} />
            </View>
            <View style={styles.infoRow}>
              <RegularText text="Charging Cost" textStyles={styles.infoLabel} />
              <HeadingText text={chargingCost} textStyles={styles.infoValue} />
            </View>
            <View style={styles.infoRow}>
              <RegularText text="Payment Method" textStyles={styles.infoLabel} />
              <View style={styles.cardInfoContainer}>
                <HeadingText text="Master Card" textStyles={styles.infoValue} />
                <RegularText text="**** **** **** 1592" textStyles={styles.cardNumber} />
              </View>
            </View>
          </View>

          {/* Total Cost Section */}
          <View style={styles.totalSection}>
            <HeadingText text="Total Cost" textStyles={styles.totalLabel} />
            <View style={styles.totalValueRow}>
              <HeadingText text={chargingCost} textStyles={styles.totalValue} />
              <Text style={styles.totalVia}>via</Text>
              <Text style={styles.totalStripe}>stripe</Text>
            </View>
          </View>
        </View>     
      
      {/* Add slide button at the bottom */}
      <View style={styles.slideButtonContainer}>
        <SlideButoon 
          title="Slide to make payment"
          onComplete={handlePaymentComplete}
        />
      </View>
      </ScrollView>
    </View>
    </>
  )
}

export default index

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    paddingTop: '20@vs',
    paddingHorizontal: '16@s',

  },
  section: {
    marginBottom: '18@vs',
  },
  sectionTitle: {
    fontSize: '18@s',
    color: '#000',
    marginBottom: '10@vs',
    textAlign: 'left',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '5@vs',
    alignItems:'baseline'
  },
  infoLabel: {
    fontSize: '16@s',
    color: '#666',
    flex: 0.7,
    textAlign: 'left',    
    flexWrap: 'nowrap',
  },
  infoValue: {
    fontSize: '16@s',
    color: '#000',
    textAlign: 'right',
    flexWrap: 'wrap',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: '24@s',
    color: COLOR.amber,
  },
  totalValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalValue: {
    fontSize: '24@s',
    color: COLOR.amber,
    marginRight: '4@s',
  },
  totalVia: {
    fontSize: '18@s',
    color: COLOR.amber,
    marginRight: '4@s',
    fontWeight: '800',
  },
  totalStripe: {
    fontSize: '18@s',
    color: '#0066CC', 
    fontWeight: '800',
  },
  slideButtonContainer: {
    paddingHorizontal: '16@s',
    paddingBottom: '20@vs',
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  cardInfoContainer: {
    alignItems: 'flex-end',
  },
  cardNumber: {
    fontSize: '12@s',
    color: COLOR.darkGray,
    marginTop: '2@vs',
  },
})