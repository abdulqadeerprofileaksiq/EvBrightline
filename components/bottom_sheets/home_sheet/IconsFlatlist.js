import React, { useMemo } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { ScaledSheet, ms } from 'react-native-size-matters';
import { COLOR } from '../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RegularText from '../../global/RegularText';
import { useRouter } from "expo-router";

const IconsFlatlist = () => {
  const router = useRouter();
  const iconData = useMemo(() => [
    { id: '1', name: 'Search', iconName: 'search' },
    { id: '2', name: 'Filter', iconName: 'filter-list' },
    { id: '3', name: 'Food', iconName: 'restaurant' },
    { id: '4', name: 'Shops', iconName: 'shopping-bag' },
    { id: '5', name: 'Parking', iconName: 'local-parking' },
    { id: '6', name: 'More', iconName: 'more-horiz' },
  ], []);

  const renderIconItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.iconContainer}
      activeOpacity={0.7}
      onPress={() => {
        if (item.name === 'Search') {
          router.push('/search');
        }
        if (item.name === 'Filter') {
          router.push('/filterScreen');
        }
      }}
    >
      <View style={styles.iconWrapper}>
        <Icon name={item.iconName} size={ms(25)} color={COLOR.darkGray} />
      </View>
      <RegularText 
        text={item.name}
        textStyles={styles.iconText}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={iconData}
        renderItem={renderIconItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatlistContent}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginTop: '8@vs',
    marginLeft: '20@s',
  },
  flatlistContent: {
    paddingVertical: '5@vs',
  },
  iconContainer: {
    alignItems: 'center',
    marginHorizontal: '12@s',
  },
  iconWrapper: {
    width: '50@ms',
    height: '50@ms',
    borderRadius: '25@ms',
    backgroundColor: COLOR.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLOR.darkGray,
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 2,
  },
  iconText: {
    fontSize: '12@ms0.3',
    color: COLOR.darkGray,
    textAlign: 'center',
    fontFamily: 'Urbanist-Medium',
  }
});

export default IconsFlatlist;