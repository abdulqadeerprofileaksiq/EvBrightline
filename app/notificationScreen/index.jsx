import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { COLOR } from '../../constants/colors';
import { FONT } from '../../constants/font';
import Header from '../../components/global/Header';

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
      item.type === 'payment' ? { backgroundColor: 'rgba(249, 173, 90, 0.05)' } : {}
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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.white} barStyle="dark-content" />
      
      <Header text="Notification" />
      
      {/* Tabs */}
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
      
      {/* Notifications List */}
      <FlatList
        data={filteredNotifications()}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.notificationsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,    paddingHorizontal: '16@s',

    
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLOR.lightGray,
    backgroundColor: COLOR.white,
    paddingHorizontal: '16@s',
  },
  tabButton: {
    flex: 1,
    paddingVertical: '12@vs',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
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
    borderBottomColor: COLOR.lightestGray,
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
});

export default NotificationScreen;