import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import HeadingText from './HeadingText';
import BackIcon from '../../assets/images/back.png';
import BackDarkIcon from '../../assets/images/backdark.png';
import { ScaledSheet } from 'react-native-size-matters';
import { useRouter } from 'expo-router';
import { FONT } from '../../constants/font';
import { COLOR } from '../../constants/colors';

const Header = ({ 
  text = "", 
  dark = false,
  transparent = false, // New prop for transparent background
  showAddNew = false,
  onAddNew = () => {},
  onBack
}) => {
  const router = useRouter();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };
  
  return (
    
    <View style={[
      styles.headerContainer,
      transparent && styles.transparentHeader
    ]}>
      <TouchableOpacity onPress={handleBack}>
        <Image
          // Use white back icon when transparent and not dark
          source={transparent && !dark ? BackIcon : dark ? BackDarkIcon : BackIcon}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <View style={styles.headingWrapper}>
        <HeadingText 
          text={text} 
          textStyles={[
            { fontSize: 16, textAlign: 'left' },
            transparent && { color: '#fff' } // Always white text when transparent
          ]} 
        />
      </View>
      {showAddNew ? (
        <TouchableOpacity 
          style={styles.addButton}
          onPress={onAddNew}
        >
          <Text style={styles.addButtonText}>+Add New</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.emptySpace} />
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '16@s',
    backgroundColor: 'white',
    zIndex: 5,
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
  addButton: {
    paddingVertical: '8@vs',
    paddingHorizontal: '4@s',
  },
  addButtonText: {
    fontFamily: FONT.semiBold,
    fontSize: '16@ms',
    color: COLOR.amber,
  },
  transparentHeader: {
    backgroundColor: 'transparent',
  },
});

export default Header;