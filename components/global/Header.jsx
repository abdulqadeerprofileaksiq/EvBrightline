import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import HeadingText from './HeadingText';
import BackIcon from '../../assets/images/back.png';
import BackDarkIcon from '../../assets/images/backdark.png';
import { ScaledSheet } from 'react-native-size-matters';
import { useRouter } from 'expo-router';

const Header = ({ text = "", dark = false }) => {
  const router = useRouter();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => router.back()}>
        <Image
          source={dark ? BackDarkIcon : BackIcon}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <View style={styles.headingWrapper}>
        <HeadingText text={text} textStyles={{ fontSize: 16, textAlign: 'left' }} />
      </View>
      <View style={styles.emptySpace} />
    </View>
  );
};

const styles = ScaledSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '16@s',
  },
  backIcon: {
    width: '41@ms',
    height: '41@ms',
    resizeMode: 'contain',
  },
  headingWrapper: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: '8@s',
  },
  emptySpace: {
    width: '24@s',
  },
});

export default Header;
