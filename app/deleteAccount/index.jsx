import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScaledSheet } from 'react-native-size-matters';
import { COLOR } from '../../constants/colors';
import Header from '../../components/global/Header';
import Button from '../../components/global/Button';
import HeadingText from '../../components/global/HeadingText';
import RegularText from '../../components/global/RegularText';
import { useRouter } from 'expo-router';
import { AlertSheetContext } from '../_layout';

const DeleteAccount = () => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const showAlert = useContext(AlertSheetContext);

  // Handler for delete confirmation - using bottom sheet alert
  const handleDeleteConfirm = () => {
    console.log("Delete button pressed");
    
    if (showAlert) {
      showAlert({
        heading: "Are You Sure You Want to Continue?",
        text: "This is your final chance! Deleting your account erases all data permanently.",
        buttonText: "Confirm",
        secondaryButtonText: "Cancel",
        image: require('../../assets/images/deletetheaccount.png'),
        primaryButtonStyle: { backgroundColor: COLOR.red },
        onButtonPress: () => {
          setIsDeleting(true);
          // Implementation for account deletion
          console.log('Account deletion confirmed');
          
          // Simulate API call with timeout
          setTimeout(() => {
            // After successful deletion, navigate to login screen
            router.replace('/');
          }, 1000);
        }
      });
    }
  };

  // Handler for going back
  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header text="Delete account" />
        
        <View style={styles.contentContainer}>
          <HeadingText 
            text="Are you sure you want to say goodbye?"
            textStyles={styles.headingText}
          />
          
          <RegularText 
            text="Deleting your account is a permanent action. This means all your profile details, preferences, saved content, and activity history will be erased forever—no turning back."
            textStyles={styles.descriptionText}
          />
          
          <RegularText 
            text="We're sad to see you go, but we respect your decision. Before proceeding, take a moment to ensure this is what you truly want."
            textStyles={styles.warningText}
          />
        </View>
        
        <View style={styles.buttonsContainer}>
          <Button 
            title={isDeleting ? "Deleting..." : "Delete"}
            onPress={handleDeleteConfirm}
            style={styles.deleteButton}
            disabled={isDeleting}
          />
          
          <Button 
            title="Go Back"
            onPress={handleGoBack}
            style={styles.goBackButton}
            textStyle={styles.goBackButtonText}
            disabled={isDeleting}
          />
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
  contentContainer: {
    paddingTop: '20@vs',
    alignItems: 'flex-start',  
    alignContent: 'flex-start',
    paddingHorizontal: '16@s', 
  },
  headingText: {
    fontSize: '18@ms',
    marginBottom: '12@vs',
    color: '#000',
    textAlign: 'left',  // Added to ensure text aligns from left
    alignSelf: 'flex-start',  // Added to ensure text container starts from left
  },
  descriptionText: {
    fontSize: '14@ms',
    lineHeight: '20@vs',
    color: COLOR.darkGray,
    marginBottom: '16@vs',
    textAlign: 'left',  // Added to ensure text aligns from left
  },
  warningText: {
    fontSize: '14@ms',
    lineHeight: '20@vs',
    color: '#4A4A4A',
    textAlign: 'left',  // Added to ensure text aligns from left
  },
  buttonsContainer: {
    // Remove absolute positioning
    paddingHorizontal: '16@s',
    marginTop: '30@vs', // Add margin to create appropriate spacing
    marginBottom: '20@vs',
  },
  deleteButton: {
    backgroundColor: COLOR.red, 
    borderRadius: '12@ms',
    height: '56@vs',
  },
  goBackButton: {
    borderWidth: 1,
    borderColor: COLOR.darkGray,
    borderRadius: '12@ms',
    backgroundColor: 'white',
    height: '56@vs',
  },
  goBackButtonText: {
    color: COLOR.darkGray,
  },
});

export default DeleteAccount;