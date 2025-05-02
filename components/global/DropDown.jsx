// #region Imports
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Platform,
  TextInput,
  Image
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { AntDesign } from '@expo/vector-icons';
import { moderateScale, scale } from "react-native-size-matters";
import { COLOR } from "../../constants/colors";
import { FONT } from "../../constants/font";
// #endregion

const DropDownComponent = ({
  label,
  value,
  onSelect,
  options = [],
  containerStyle,
  placeholder = "Select an option",
  showIcon = true,
  filterFunction,
  isConnectorType = false,
}) => {
  // #region State
  const [isFocus, setIsFocus] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(options);
  // #endregion

  // #region Effects
  useEffect(() => {
    if (filterFunction) {
      setFilteredData(options.filter(item => filterFunction(item, searchQuery)));
    } else {
      if (searchQuery) {
        const lowercaseQuery = searchQuery.toLowerCase().trim();
        setFilteredData(
          options.filter(item => 
            item.label.toLowerCase().includes(lowercaseQuery)
          )
        );
      } else {
        setFilteredData(options);
      }
    }
  }, [searchQuery, options, filterFunction]);
  // #endregion

  useEffect(() => {
    if ((!value || value === '') && options.length > 0) {
      const firstOptionValue = options[0].value;
      if (onSelect) {
        onSelect(firstOptionValue);
      }
    }
  }, [options]);
  // #endregion

  const hasValue = value && options.some(option => option.value === value);

  // #region Render Item
  const renderItem = (item) => {
    return (
      <View style={[
        styles.item, 
        value === item.value && styles.selectedItem
      ]}>
        {isConnectorType && item.image && (
          <Image 
            source={item.image} 
            style={styles.itemImage}
            resizeMode="contain"
          />
        )}
        {!isConnectorType && showIcon && item.icon && (
          <View style={styles.iconContainer}>
            {item.icon()}
          </View>
        )}
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  // #endregion

  // Render left icon for connector type
  const renderLeftIcon = (visible) => {
    if (!isConnectorType) {
      return null;
    }
    
    // Find the selected item to show its icon
    const selectedItem = options.find(option => option.value === value);
    if (!selectedItem || !selectedItem.image) {
      return null;
    }
    
    return (
      <Image
        source={selectedItem.image}
        style={styles.leftIconImage}
        resizeMode="contain"
      />
    );
  };

  // #region Search Input
  const renderInputSearch = () => {
    return (
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={16} color={COLOR.mediumGray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor={COLOR.mediumGray}
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
    );
  };
  // #endregion

  // #region Main Render
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[
        styles.label,
        hasValue && styles.selectedLabel
      ]}>
        {label}
      </Text>
      
      <Dropdown
        style={[
          styles.dropdown,
          isConnectorType && styles.connectorDropdown,
          hasValue && styles.selectedDropdown
        ]}
        containerStyle={styles.dropdownContainer}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={filteredData}
        search={true}
        searchQuery={searchQuery}
        onChangeSearchQuery={setSearchQuery}
        renderInputSearch={renderInputSearch}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          onSelect(item.value);
          setIsFocus(false);
          setSearchQuery('');
        }}
        renderLeftIcon={isConnectorType ? renderLeftIcon : undefined}
        renderRightIcon={() => (
          <FontAwesome6 
            name={isFocus ? "angle-up" : "angle-down"} 
            size={moderateScale(16)} 
            color={COLOR.darkGray} 
          />
        )}
        renderItem={renderItem}
        activeColor='transparent'
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
  // #endregion
};

// #region Styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: moderateScale(8),
    zIndex: 5000,
  },
  dropdown: {
    height: moderateScale(56),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: COLOR.lightGray,
    paddingHorizontal: moderateScale(16),
    backgroundColor: COLOR.white,
  },
  selectedDropdown: {
    borderColor: COLOR.darkGray,
    borderWidth: 1,
  },
  connectorDropdown: {
    paddingLeft: moderateScale(12),
    paddingVertical: moderateScale(3),
  },
  label: {
    position: "absolute",
    left: moderateScale(16),
    top: moderateScale(-9),
    backgroundColor: COLOR.white,
    paddingHorizontal: scale(4),
    fontSize: moderateScale(12),
    fontFamily: FONT.medium,
    color: COLOR.mediumGray,
    zIndex: 10,
  },
  selectedLabel: {
    color: COLOR.darkGray,
  },
  placeholderStyle: {
    fontFamily: FONT.regular,
    color: COLOR.mediumGray,
  },
  selectedTextStyle: {
    fontFamily: FONT.medium,
    fontSize: moderateScale(16),
    color: COLOR.darkGray,
  },
  iconContainer: {
    marginRight: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: moderateScale(17),
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: "#FFEDCE", 
  },
  textItem: {
    fontFamily: FONT.regular,
    fontSize: moderateScale(16),
    color: COLOR.darkGray,
  },
  dropdownContainer: {
    borderRadius: moderateScale(12),
    marginTop: moderateScale(4),
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    ...(Platform.OS === 'android' && {
      elevation: 5,
    }),
    zIndex: 5000,
  },
  selectedTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(3),
    width: '100%',
  },
  boldSelectedText: {
    fontFamily: FONT.medium,
    fontSize: moderateScale(16),
    color: COLOR.darkGray,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(8),
    borderBottomWidth: 1,
    borderBottomColor: COLOR.lightGray,
  },
  searchIcon: {
    marginRight: moderateScale(10),
  },
  searchInput: {
    flex: 1,
    fontFamily: FONT.regular,
    fontSize: moderateScale(16),
    color: COLOR.darkGray,
    height: moderateScale(40),
    padding: 0,
  },
  connectorIconWrapper: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  connectorSelectedWrapper: {
    width: moderateScale(36),
    height: moderateScale(36),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10),
  },
  connectorListImage: {
    width: moderateScale(40),
    height: moderateScale(40),
    marginRight: moderateScale(16),
  },
  connectorSelectedImage: {
    width: moderateScale(36),
    height: moderateScale(36),
    marginRight: moderateScale(12),
  },
  itemImage: {
    width: moderateScale(30),
    height: moderateScale(30),
    marginRight: moderateScale(10),
  },
  selectedItemImage: {
    width: moderateScale(32),
    height: moderateScale(32),
    marginRight: moderateScale(12),
  },
  leftIconImage: {
    width: moderateScale(28),
    height: moderateScale(28),
    marginRight: moderateScale(10),
  },
});
// #endregion

export default DropDownComponent;