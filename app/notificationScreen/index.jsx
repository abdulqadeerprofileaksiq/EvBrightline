import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { COLOR } from '../../constants/colors';
import { FONT } from '../../constants/font';
import Header from '../../components/global/Header';
import NoResult from '../../components/global/NoResult';

const NotificationScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All');
  
  const notifications = [
    {
      id: '1',
      title: 'Payment Received!',
      description: 'Your payment of $13 has been successfully processed',
      time: 'Wednesday at 9:42 AM',
      icon: 'payment',
      read: false,
      type: 'payment'
    },
    {
      id: '2',
      title: 'Charge Complete!',
      description: 'Your vehicle\'s battery is fully charged',
      time: 'Wednesday at 9:42 AM',
      icon: 'battery',
      read: true,
      type: 'charging'
    },
    {
      id: '3',
      title: 'Charging Started!',
      description: 'Your vehicle\'s battery is now charging',
      time: 'Wednesday at 9:02 AM',
      icon: 'battery',
      read: true,
      type: 'charging'
    }
    
  ];

  const filteredNotifications = () => {
    if (activeTab === 'All') return notifications;
    if (activeTab === 'Unread') return notifications.filter(notif => !notif.read);
    if (activeTab === 'Read') return notifications.filter(notif => notif.read);
    return notifications;
  };

  const renderNotificationIcon = (type) => {
    if (type === 'payment') {
      return (
        <View style={[styles.iconContainer, { backgroundColor: 'rgba(249, 173, 90, 0.2)' }]}>
          <FontAwesome5 name="credit-card" size={18} color={COLOR.amber} />
        </View>
      );
    } else if (type === 'battery') {
      return (
        <View style={[styles.iconContainer, { backgroundColor: 'rgba(128, 86, 240, 0.2)' }]}>
          <MaterialCommunityIcons name="battery-charging" size={20} color={COLOR.purple} />
        </View>
      );
    }
    return null;
  };

  const renderNotificationItem = ({ item }) => (
    <View style={[
      styles.notificationItem,
      // Apply special styling only to unread notifications
      !item.read ? {
        backgroundColor: 'rgba(249, 173, 90, 0.1)', // Amber with 10% opacity
        borderRadius: '8@s',
        borderBottomWidth: 0, // Remove border for unread items
        marginBottom: '8@vs',
      } : {}
    ]}>
      {renderNotificationIcon(item.icon)}
      
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          {!item.read && <View style={styles.unreadIndicator} />}
        </View>
        <Text style={styles.notificationDescription}>{item.description}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </View>
  );

  const hasNotifications = notifications.length > 0;

  const handleNotificationSettings = () => {
    console.log('Navigating to Notification Settings');
  };

  return (
    <>
      <Header text="Notification" />
      <View style={styles.container}>      
        
        {/* Only show tabs if there are notifications */}
        {hasNotifications && (
          <View style={styles.tabContainer}>
            {['All', 'Unread', 'Read'].map(tab => (
              <TouchableOpacity 
                key={tab} 
                style={[
                  styles.tabButton, 
                  activeTab === tab ? styles.activeTab : {}
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab ? styles.activeTabText : {}
                ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        
        {/* Notifications List or Empty State */}
        {hasNotifications ? (
          <FlatList
            data={filteredNotifications()}
            renderItem={renderNotificationItem}
            keyExtractor={item => item.id}
            contentContainerStyle={[
              styles.notificationsList,
              { paddingTop: 16 }  // Add space at the top of the list
            ]}
            showsVerticalScrollIndicator={false}
            refreshing={false}
            onRefresh={() => console.log('Refreshing notifications')}
          />
        ) : (
          <NoResult
            image={require('../../assets/images/bell.png')}
            title="No New Notifications!"
            message="Stay turned! Notifications about your activity will show up here."
            showButton={true}
            buttonText="Notification Setting"
            onButtonPress={handleNotificationSettings}
          />
        )}
      </View>
    </>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,   
    paddingHorizontal: '16@s',    
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLOR.lightGray,
    backgroundColor: COLOR.white,
    paddingHorizontal: '16@s',
    marginBottom: '12@vs', // Add space below tabs
  },
  tabButton: {
    flex: 1,
    paddingVertical: '12@vs',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.amber,
  },
  tabText: {
    fontFamily: FONT.regular,
    fontSize: '14@ms',
    color: COLOR.mediumGray,
  },
  activeTabText: {
    fontFamily: FONT.semiBold,
    color: COLOR.amber,
  },
  notificationsList: {
    flexGrow: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: '16@s',
    borderBottomWidth: 1,
    borderBottomColor: COLOR.lightGray,
    marginBottom: '8@vs',
  },
  iconContainer: {
    width: '40@s',
    height: '40@s',
    borderRadius: '20@s',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '12@s',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationTitle: {
    fontFamily: FONT.semiBold,
    fontSize: '16@ms',
    color: COLOR.darkGray,
  },
  unreadIndicator: {
    width: '8@s',
    height: '8@s',
    borderRadius: '4@s',
    backgroundColor: COLOR.amber,
  },
  notificationDescription: {
    fontFamily: FONT.regular,
    fontSize: '14@ms',
    color: COLOR.darkGray,
    marginTop: '4@vs',
  },
  notificationTime: {
    fontFamily: FONT.regular,
    fontSize: '12@ms',
    color: COLOR.mediumGray,
    marginTop: '4@vs',
  },
  emptyList: {
    flexGrow: 1,
  },
});

export default NotificationScreen;