import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Ionicons, FontAwesome5, MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import COLOR from '../../constants/colors';
import HeadingText from '../../components/global/HeadingText';
import RegularText from '../../components/global/RegularText';
import { router } from 'expo-router';
import { AlertSheetContext } from '../../app/_layout';

const Profile = () => {
  const showAlert = useContext(AlertSheetContext);

  const menuItems = [
    {
      id: 1,
      title: 'My Vehicles',
      icon: (color) => <FontAwesome5 name="car" size={20} color={color} />,
      route: 'Vehicles',
    },
    {
      id: 2,
      title: 'Payment Options',
      icon: (color) => <MaterialIcons name="payment" size={22} color={color} />,
      route: 'Payment',
    },
    {
      id: 3,
      title: 'Transaction History',
      icon: (color) => <MaterialCommunityIcons name="history" size={22} color={color} />,
      route: 'History',
    },
    {
      id: 4,
      title: 'Preferences',
      icon: (color) => <Ionicons name="settings-outline" size={22} color={color} />,
      route: 'Preferences',
    },
    {
      id: 5,
      title: 'Update Password',
      icon: (color) => <MaterialIcons name="security" size={22} color={color} />,
      route: 'UpdatePassword',
      highlight: true,
    },
    {
      id: 6,
      title: 'Privacy Policy',
      icon: (color) => <MaterialIcons name="privacy-tip" size={22} color={color} />,
      route: 'Privacy',
    },
    {
      id: 7,
      title: 'Logout',
      icon: (color) => <Feather name="log-out" size={22} color={color} />,
      route: 'Logout',
    },
  ];

  const handleLogout = () => {
    showAlert({
      heading: "Logout Account",
      text: "Are you sure you want to logout your account?",
      buttonText: "Yes",
      secondaryButtonText: "No",
      image: require('../../assets/images/logout.png'),
      onButtonPress: () => {
        console.log("Logging out...");
        // Redirect to login screen after logout
        router.push('/loginScreen');
      },
      primaryButtonStyle: { backgroundColor: COLOR.red },
    });
  };

  const renderMenuItem = (item) => {
    const itemColor = '#F9AD5A';
    
    return (
      <View key={item.id} style={styles.menuItemContainer}>
        {item.highlight && <View style={styles.highlightDot} />}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            // Handle logout separately
            if (item.route === 'Logout') {
              handleLogout();
              return;
            }
            
            // Navigate based on route name
            switch(item.route) {
              case 'Vehicles':
                router.push('/myVehicles');
                break;
              case 'Payment':
                router.push('/paymentOptions');
                break;
              case 'History':
                router.push('/transactionHistory');
                break;
              case 'Preferences':
                router.push('/preferencesScreen');
                break;
              case 'UpdatePassword':
                router.push('/updatePassword');
                break;
              case 'Privacy':
                router.push('/privacyPolicy');
                break;
              default:
                console.log(`Navigating to ${item.route}`);
            }
          }}
        >
          <View style={styles.menuIconLabel}>
            <View style={styles.iconContainer}>
              {item.icon(itemColor)}
            </View>
            <RegularText text={item.title} textStyles={styles.menuItemText} />
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLOR.darkGray} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <TouchableOpacity style={styles.profileSection}>
          <View style={styles.profileContent}>
            <Image
              source={require('../../assets/images/profile-pic.jpg')} 
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
            <HeadingText text="John Author" textStyles={styles.profileName} />
            <RegularText text="johnauthor@gmail.com" textStyles={styles.profileEmail} />
            </View>
          </View>
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => {
              // Using a different navigation approach
              router.navigate('/editProfile');
              // Alternatively, you could use this approach:
              // router.replace('/editProfile');
            }}
          >
            <Feather name="edit-2" size={18} color="#F9AD5A" />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map(renderMenuItem)}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: '16@s',
  },
  profileSection: {
    flexDirection: 'row',
    backgroundColor: '#FFF7E8',
    padding: '16@s',
    borderRadius: '12@s',
    marginTop: '20@vs',
    marginBottom: '16@vs',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileContent: {
    flexDirection: 'row',
  },
  profileImage: {
    width: '55@s',
    height: '55@s',
    borderRadius: '12@s',
  },
  profileInfo: {
    marginLeft: '12@s',
  },
  profileName: {
    fontSize: '18@ms',
    alignSelf: 'flex-start',
  },
  profileEmail: {
    fontSize: '16@s',
  },
  editButton: {
    padding: '4@s',
  },
  menuContainer: {
    marginBottom: '20@vs',
  },
  menuItemContainer: {
    position: 'relative',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '18@vs',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuIconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: '28@s',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: '16@s',
    marginLeft: '10@s',
    color: '#333',
  },
  highlightDot: {
    position: 'absolute',
    left: '-8@s',
    top: '27@vs',
    width: '6@s',
    height: '6@s',
    borderRadius: '3@s',
    backgroundColor: '#F9AD5A',
    zIndex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    height: '60@vs',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingHorizontal: '30@s',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10@s',
  },
  activeNavItem: {
    backgroundColor: '#DAB6FC',
    width: '40@s',
    height: '40@s',
    borderRadius: '20@s',
  },
});

export default Profile;