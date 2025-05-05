import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/global/Header';
import { useRouter } from 'expo-router';
import HeadingText from '../../components/global/HeadingText';
import RegularText from '../../components/global/RegularText';

const PrivacyPolicyScreen = () => {
  const router = useRouter();

  const policyItems = [
    {
      id: '1',
      title: 'Data Collection',
      points: [
        'Charging networks collect user data such as name, email, payment details, and vehicle information.',
        'Location data is gathered to provide nearby charging stations and analyze usage patterns.'
      ]
    },
    {
      id: '2',
      title: 'Usage of Collected Data',
      points: [
        'Data is used to process payments, optimize charging services, and improve user experience.',
        'Aggregated data may be shared for analytics, but personal details remain confidential.'
      ]
    },
    {
      id: '3',
      title: 'Data Sharing & Third Parties',
      points: [
        'Charging providers may share data with third-party partners (e.g. payment processors, government agencies for incentives).',
        'Personal data is never sold but may be disclosed for legal or regulatory compliance.'
      ]
    },
    {
      id: '4',
      title: 'Security Measures',
      points: [
        'Encryption and authentication protocols secure payment and personal data.',
        'Users are advised to set strong passwords and enable multi-factor authentication (if available).'
      ]
    },
    {
      id: '5',
      title: 'User Rights & Consent',
      points: [
        'Users can request access, modification, or deletion of their data.',
        'Opt-in consent is required for marketing and promotional messages.'
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header text="Privacy policy" />
      
      <ScrollView style={styles.content}>
        {policyItems.map((item) => (
          <View key={item.id} style={styles.section}>
            <HeadingText 
              text={`${item.id}- ${item.title}`}
              textStyles={styles.sectionTitle}
            />
            {item.points.map((point, index) => (
              <View key={index} style={styles.pointContainer}>
                <View style={styles.bullet} />
                <RegularText 
                  text={point}
                  textStyles={styles.pointText}
                />
              </View>
            ))}
          </View>
        ))}
        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
    color: '#000000',
    textAlign: 'left',
  },
  pointContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingRight: 8,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFA500',
    marginTop: 6,
    marginRight: 8,
  },
  pointText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    color: '#222222',
    textAlign: 'left',
  },
  bottomSpace: {
    height: 32,
  },
});

export default PrivacyPolicyScreen;