import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, TextInput, FlatList, Image } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { COLOR } from "../../constants/colors";
import { MaterialIcons } from "@expo/vector-icons"; 
import { useRouter } from "expo-router";
import StationsData from "../../components/bottom_sheets/StationsData/StationsData";
import HeadingText from "../../components/global/HeadingText";
import RegularText from "../../components/global/RegularText";

// Import assets
import BackIcon from "../../assets/images/back.png";
import SearchIcon from "../../assets/images/bottom_sheets/search.png";
import NoResultIcon from "../../assets/images/noresult.png";

const SearchScreen = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [filteredStations, setFilteredStations] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const sampleStations = [
    {
      id: '1',
      name: 'Brightline Fast Charging Station',
      location: '123 Main Street, Miami, FL',
      distance: '1.2 miles away',
      availablePorts: 4,
      chargerTypes: ['Type1', 'Type2', 'CHAdeMO'],
      status: 'open'
    },
    {
      id: '2',
      name: 'EcoCharge Downtown',
      location: '456 Ocean Drive, Miami Beach, FL',
      distance: '2.5 miles away',
      availablePorts: 2,
      chargerTypes: ['Type1', 'Type2'],
      status: 'open'
    },
    {
      id: '3',
      name: 'GreenPower Electric Vehicle Station',
      location: '789 Palm Avenue, Coral Gables, FL',
      distance: '3.8 miles away',
      availablePorts: 6,
      chargerTypes: ['Type2', 'CHAdeMO'],
      status: 'closed'
    },
    {
      id: '4',
      name: 'Urban Electric Charging Hub',
      location: '101 Brickell Avenue, Miami, FL',
      distance: '0.5 miles away',
      availablePorts: 1,
      chargerTypes: ['Type1'],
      status: 'open'
    },
    {
      id: '5',
      name: 'SunPower EV Station',
      location: '202 Sunset Drive, South Miami, FL',
      distance: '4.7 miles away',
      availablePorts: 3,
      chargerTypes: ['CHAdeMO', 'Type2'],
      status: 'open'
    }
  ];

  // Search only when user types something
  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredStations([]);
      setHasSearched(false);
    } else {
      setHasSearched(true);
      const lowercaseQuery = searchText.toLowerCase();
      const filtered = sampleStations.filter(station => 
        station.name.toLowerCase().includes(lowercaseQuery) ||
        station.location.toLowerCase().includes(lowercaseQuery)
      );
      setFilteredStations(filtered);
    }
  }, [searchText]);

  const handleBackPress = () => {
    router.back();
  };

  const handleClearSearch = () => {
    setSearchText("");
  };

  const renderNoResults = () => (
    <View style={styles.noResultsContainer}>
      <Image 
        source={NoResultIcon} 
        style={styles.noResultImage}
        resizeMode="contain"
      />
      <HeadingText
        text="Oops! No Matching Results"
        textStyles={styles.noResultTitle}
      />
      <RegularText
        text="We couldn't find the station you were looking for. Please check for spelling errors or try again."
        textStyles={styles.noResultText}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Image source={BackIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Image source={SearchIcon} style={styles.searchIcon} resizeMode="contain" />
          <TextInput
            style={styles.searchInput}
            placeholder="Find a station"
            placeholderTextColor={COLOR.mediumGray}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch}>
              <MaterialIcons name="close" size={16} color={COLOR.darkGray} style={styles.crossIcon} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {/* Show stations only when user has searched and there are results */}
      {hasSearched && filteredStations.length > 0 && (
        <FlatList
          data={filteredStations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <StationsData stationData={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.stationList}
        />
      )}
      
      {/* Show no results message when user has searched but there are no matches */}
      {hasSearched && filteredStations.length === 0 && renderNoResults()}
      
      {/* Show nothing when user hasn't searched yet */}
      {!hasSearched && <View style={styles.emptySpace} />}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingTop: 0,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: '16@s',

  },
  backButton: {
    marginRight: '8@s',
  },
  backIcon: {
    width: '41@s',
    height: '41@s',
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: COLOR.lightGray,
    borderWidth: 0,
    paddingHorizontal: '12@s',
    height: '44@vs',
    
  },
  searchIcon: {
    width: '16@s',
    height: '16@s',
    marginRight: '8@s',
  },
  searchInput: {
    flex: 1,
    fontSize: '16@s',
    color: COLOR.darkGray,
    paddingVertical: 0,
    height: '32@vs',
    textAlignVertical: 'center',
  },
  crossIcon: {
    marginLeft: '8@s',
  }, 
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '24@s',
  },
  noResultImage: {
    width: '120@s',
    height: '120@s',
    marginBottom: '24@vs',
  },
  noResultTitle: {
    fontSize: '24@s',
    textAlign: 'center',
    marginBottom: '16@vs',
  },
  noResultText: {
    fontSize: '16@s',
    textAlign: 'center',
    color: COLOR.darkGray,
    lineHeight: '24@s',
  },
  emptySpace: {
    flex: 1,
  }
});

export default SearchScreen;