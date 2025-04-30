import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Animated } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Feather } from '@expo/vector-icons';
import HeadingText from './HeadingText';
import RegularText from './RegularText';
import { COLOR } from '../../constants/colors';
import { FONT } from '../../constants/font';

const Expandable = ({ 
  item,
  isExpanded = false,
  onPress,
  onDelete,
  onTogglePrimary,
  extraFields = [],
  isFirst = false,
  deleteTitle = "Delete",
  imageStyle = {} // Add imageStyle prop for custom image sizing
}) => {
  if (!item) return null;

  return (
    <View style={styles.container}>
      {/* Header - Always visible */}
      <TouchableOpacity 
        style={[
          styles.header,
          !isFirst && styles.borderTop,
          !isExpanded && styles.borderBottom
        ]}
        onPress={() => onPress(item.id)}
      >
        <HeaderContent 
          title={item.name} 
          subtitle={item.licensePlate}
          image={item.image}
          isExpanded={isExpanded}
          imageStyle={imageStyle} // Pass imageStyle to HeaderContent
        />
      </TouchableOpacity>

      {/* Expanded Details */}
      {isExpanded && (
        <ExpandableDetails
          item={item}
          extraFields={extraFields}
          onTogglePrimary={onTogglePrimary}
          onDelete={onDelete}
          deleteTitle={deleteTitle}
        />
      )}
    </View>
  );
};

// Header Content Component
export const HeaderContent = ({ title, subtitle, image, isExpanded, imageStyle = {} }) => {
  // Combine default image style with any custom styles
  const finalImageStyle = { ...styles.itemImage, ...imageStyle };
  
  return (
    <>
      <View style={styles.itemInfo}>
        <Image 
          source={image}
          style={finalImageStyle} 
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <HeadingText text={title} textStyles={styles.titleText} />
          <RegularText text={subtitle} textStyles={styles.subtitleText} />
        </View>
      </View>
      <Feather 
        name={isExpanded ? "chevron-up" : "chevron-down"} 
        size={24} 
        color={COLOR.mediumGray} 
      />
    </>
  );
};

// Expandable Details Component
export const ExpandableDetails = ({ item, extraFields, onTogglePrimary, onDelete, deleteTitle }) => {
  const [isPrimary, setIsPrimary] = useState(item.isPrimary);
  const translateX = new Animated.Value(isPrimary ? 1 : 0);

  useEffect(() => {
    setIsPrimary(item.isPrimary);
  }, [item.isPrimary]);

  const toggleSwitch = () => {
    const newValue = !isPrimary;
    setIsPrimary(newValue);
    
    Animated.timing(translateX, {
      toValue: newValue ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onTogglePrimary(item.id);
    });
  };

  const thumbPosition = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 11],
  });

  return (
    <View style={styles.detailsContainer}>
      {/* Standard Fields */}
      <DetailRow label="Brand" value={item.brand} />
      <DetailRow label="Model" value={item.model} />
      <DetailRow label="Battery Capacity Range" value={`${item.batteryCapacity} - ${item.range}`} />
      <DetailRow label="Connector Type" value={item.connectorType} />
      <DetailRow label="License Plate No." value={item.licensePlate} />
      
      {/* Any Extra Fields */}
      {extraFields.map((field, index) => (
        <DetailRow 
          key={`extra-field-${index}`} 
          label={field.label}
          value={field.value}
        />
      ))}
      
      {/* Primary Toggle - Custom Animated Switch */}
      <View style={styles.detailRow}>
        <RegularText text="Make Primary" textStyles={styles.detailLabel} />
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={toggleSwitch}
          style={[
            styles.switchContainer,
            { backgroundColor: isPrimary ? COLOR.amber : COLOR.lightGray }
          ]}
        >
          <Animated.View 
            style={[
              styles.switchThumb,
              { transform: [{ translateX: thumbPosition }] }
            ]}
          />
        </TouchableOpacity>
      </View>
      
      {/* Delete Button */}
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <RegularText text={deleteTitle} textStyles={styles.deleteText} />
      </TouchableOpacity>
    </View>
  );
};

// Detail Row Component
export const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <View style={styles.detailLabelContainer}>
      <RegularText text={label} textStyles={styles.detailLabel} />
    </View>
    <View style={styles.detailValueContainer}>
      <RegularText text={value} textStyles={styles.detailValue} />
    </View>
  </View>
);

const styles = ScaledSheet.create({
  container: {
    marginHorizontal: '16@s', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '12@vs',
    paddingHorizontal: '12@vs',
    backgroundColor: COLOR.white,
  }, 
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.lightGray,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: '64@s',
    height: '40@s',
    marginRight: '16@s',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  titleText: {
    fontSize: '18@ms',
    color: COLOR.darkGray,
    textAlign: 'left',
    marginBottom: '-3@vs',
  },
  subtitleText: {
    fontSize: '12@ms',
    color: COLOR.mediumGray,
    textAlign: 'left',
    marginTop: '-2@vs',
  },
  detailsContainer: {
    backgroundColor: COLOR.white,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.lightGray,
    paddingHorizontal: '22@vs',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10@vs',
    borderBottomWidth: 1,
    borderBottomColor: COLOR.lightGray,
  },
  detailLabelContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  detailValueContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  detailLabel: {
    fontSize: '12@ms',
    color: COLOR.darkGray,
    fontFamily: FONT.semiBold,
    textAlign: 'left',
  },
  detailValue: {
    fontSize: '12@ms',
    color: COLOR.darkGray,
    textAlign: 'right',
  },
  switchContainer: {
    width: '27@s',         
    height: '16@vs',       
    borderRadius: '8@vs',  
    padding: '2@vs',       
    justifyContent: 'center',
  },
  switchThumb: {
    width: '12@s',         
    height: '12@vs',       // Changed from 22 to 12
    borderRadius: '6@vs',  // Changed from 11 to 6 (half of the new size)
    backgroundColor: COLOR.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,          // Reduced shadow for smaller component
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,    // Reduced shadow for smaller component
    elevation: 2,         // Reduced elevation for smaller component
  },
  deleteButton: {
    alignItems: 'center',
    paddingVertical: '24@vs',
  },
  deleteText: {
    fontSize: '16@ms',
    color: COLOR.red,
    fontFamily: FONT.semiBold,
  },
});

export default Expandable;
