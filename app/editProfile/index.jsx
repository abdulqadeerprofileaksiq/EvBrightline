import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScaledSheet } from 'react-native-size-matters';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { COLOR } from '../../constants/colors';
import { FONT } from '../../constants/font';
import Header from '../../components/global/Header';
import InputComponent from '../../components/global/Input';
import Button from '../../components/global/Button';
import HeadingText from '../../components/global/HeadingText';
import RegularText from '../../components/global/RegularText';
import { router } from 'expo-router';

const EditProfile = () => {
  // State for form inputs
  const [fullName, setFullName] = useState('John Author');
  const [email, setEmail] = useState('johnauthor@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('+88 1234 1234');  
  
  // Handler for save changes
  const handleSaveChanges = () => {
    // Implementation for saving changes
    console.log('Saving profile changes:', { fullName, email, phoneNumber });
  };

  // Handler for delete account
  const handleDeleteAccount = () => {
    router.push("/deleteAccount")
    console.log('Delete account requested');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header text="Edit Profile" />
        
        {/* Profile Image Section */}
        <View style={styles.profileImageContainer}>
          <View style={styles.profilePositionWrapper}>
            <View style={styles.profileImageWrapper}>
              <Image
                source={require('../../assets/images/profile-pic.jpg')} 
                style={styles.profileImage}
              />
            </View>
            <TouchableOpacity style={styles.editIconButton}>
              <Text style={styles.plusIcon}>+</Text>
            </TouchableOpacity>
          </View>
          <HeadingText text={fullName} textStyles={styles.userName} />
        </View>
        
        {/* Form Fields */}
        <View style={styles.formContainer}>
          <InputComponent
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            containerStyle={styles.inputContainer}
            autoCapitalize="words"
          />
          
          <View style={styles.emailContainer}>
            <InputComponent
              label="Email"
              value={email}
              onChangeText={setEmail}
              containerStyle={styles.inputContainer}
              keyboardType="email-address"
            />
            <View style={styles.verifiedBadge}>
              <HeadingText text="Verified" textStyles={styles.verifiedText} />
            </View>
          </View>
          
          <InputComponent
            label="Phone Number" // Changed to be more consistent
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            containerStyle={styles.inputContainer}
            keyboardType="phone-pad"
          />
        </View>
        
        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <Button 
            title="Save Changes" 
            onPress={handleSaveChanges}
            buttonStyle={styles.saveButton} // Changed to buttonStyle to match Button component props
          />
          
          <TouchableOpacity onPress={handleDeleteAccount} style={styles.deleteButton}>
            <RegularText text="Delete Account" textStyles={styles.deleteText} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: '25@vs',
    marginBottom: '20@vs',
  },
  profilePositionWrapper: {
    position: 'relative',
    width: '100@s',
    height: '100@s',
  },
  profileImageWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: '50@s',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: '50@s',
  },
  editIconButton: {
    position: 'absolute',
    bottom: '0@s',
    right: '0@s',
    backgroundColor: COLOR.amber,
    width: '28@s',
    height: '28@s',
    borderRadius: '14@s',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  plusIcon: {
    fontSize: '18@ms',
    color: 'white',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: '24@ms',
    marginTop: '16@vs',
    color: COLOR.darkGray,
  },
  formContainer: {
    paddingHorizontal: '16@s',
    marginTop: '10@vs',
  },
  fieldLabel: {
    fontFamily: FONT.medium,
    fontSize: '12@ms',
    color: COLOR.mediumGray,
    marginBottom: '-5@vs',
    marginLeft: '2@s',
  },
  inputContainer: {
    marginBottom: '10@vs',
  },
  emailContainer: {
    position: 'relative',
  },
  verifiedBadge: {
    position: 'absolute',
    right: '16@s',
    top: '40%',
    transform: [{ translateY: -10 }],
    borderRadius: '4@ms',
  },
  verifiedText: {
    color: 'green',
    fontSize: '12@ms',
  },
  actionContainer: {
    paddingHorizontal: '16@s',
    marginTop: '20@vs',
    marginBottom: '20@vs',
  },
  saveButton: {
    backgroundColor: COLOR.primary,  
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '16@vs',
  },
  deleteText: {
    fontFamily: FONT.semiBold,
    fontSize: '16@ms',
    color: COLOR.red,  
  },
});

export default EditProfile;