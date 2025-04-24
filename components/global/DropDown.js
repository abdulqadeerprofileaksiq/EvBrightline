// #region Imports
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Platform,
  TextInput
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
  filterFunction, // Add custom filter function prop
}) => {
  // #region State
  const [isFocus, setIsFocus] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(options);
  // #endregion

  // #region Effects
  // Update filtered data when search query changes or options change
  useEffect(() => {
    if (filterFunction) {
      // Use the custom filter function if provided
      setFilteredData(options.filter(item => filterFunction(item, searchQuery)));
    } else {
      // Default filtering behavior
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

  // #region Auto-select first option on mount
  useEffect(() => {
    // Only auto-select if no value is provided and there are options available
    if ((!value || value === '') && options.length > 0) {
      // Get the first option's value
      const firstOptionValue = options[0].value;
      
      // Call the onSelect callback with the first option's value
      if (onSelect) {
        onSelect(firstOptionValue);
      }
    }
  }, [options]);
  // #endregion

  // Check if a value is selected
  const hasValue = value && options.some(option => option.value === value);

  // #region Render Item
  const renderItem = (item) => {
    return (
      <View style={[
        styles.item, 
        value === item.value && styles.selectedItem
      ]}>
        {showIcon && item.icon && (
          <View style={styles.iconContainer}>
            {item.icon()}
          </View>
        )}
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  // #endregion

  // #region Selected Item
  const renderSelectedItem = (item) => {
    // Determine if an actual item is selected (vs. showing placeholder)
    const isItemSelected = item && options.some(option => option.value === item.value);
    
    return (
      <View style={styles.selectedTextContainer}>
        {showIcon && item?.icon && (
          <View style={styles.iconContainer}>
            {item.icon()}
          </View>
        )}
        <Text style={[
          styles.selectedText,
          // Apply semi-bold style only when an actual item is selected
          isItemSelected && styles.boldSelectedText
        ]}>
          {item?.label || placeholder}
        </Text>
      </View>
    );
  };
  // #endregion

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
        // Apply dark gray color to label when an item is selected
        hasValue && styles.selectedLabel
      ]}>
        {label}
      </Text>
      
      <Dropdown
        style={[
          styles.dropdown,
          // Apply dark gray border when an item is selected
          hasValue && styles.selectedDropdown
        ]}
        containerStyle={styles.dropdownContainer}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={filteredData} // Use filtered data instead of all options
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
        renderRightIcon={() => (
          <FontAwesome6 
            name={isFocus ? "angle-up" : "angle-down"} 
            size={moderateScale(16)} 
            color={COLOR.darkGray} 
          />
        )}
        renderItem={renderItem}
        renderSelectedItem={renderSelectedItem}
        activeColor='transparent'
        keyboardAvoiding={true}
      />
    </View>
  );
  // #endregion
};

// #region Styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: moderateScale(5),
    zIndex: 5000, // Higher zIndex to ensure dropdown appears above other elements
  },
  dropdown: {
    height: moderateScale(56),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: COLOR.lightGray,
    paddingHorizontal: moderateScale(16),
    backgroundColor: COLOR.white,
  },
  // New style for selected dropdown
  selectedDropdown: {
    borderColor: COLOR.darkGray,
    borderWidth: 1,
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
  // New style for selected label
  selectedLabel: {
    color: COLOR.darkGray,
  },
  placeholderStyle: {
    fontFamily: FONT.regular,
    color: COLOR.mediumGray,
  },
  selectedTextStyle: {
    fontFamily: FONT.regular,
    fontSize: moderateScale(16),
    color: COLOR.darkGray,
  },
  iconContainer: {
    marginRight: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: moderateScale(16),
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
    zIndex: 5000, // Higher zIndex for dropdown container
  },
  selectedTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedText: {
    fontFamily: FONT.regular,
    fontSize: moderateScale(16),
    color: COLOR.mediumGray, // Default color for placeholder
  },
  boldSelectedText: {
    fontFamily: FONT.medium,
    fontSize: moderateScale(16),
    color: COLOR.darkGray, // Black text for selected item
  },
  // Search styling
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
});
// #endregion

export default DropDownComponent;