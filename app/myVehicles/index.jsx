import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useRouter } from 'expo-router';
import Header from '../../components/global/Header';
import { COLOR } from '../../constants/colors';
import Expandable from '../../components/global/expandable';
import NoResult from '../../components/global/NoResult';

const MyVehicles = () => {
  const router = useRouter();
  const [expandedVehicle, setExpandedVehicle] = useState('');

  // Vehicle data
  const vehicles = [{
    id: 'model3',
    name: 'Tesla Model3',
    licensePlate: 'MM 4919 RGN',
    image: require('../../assets/images/carModels/black.png'),
    batteryCapacity: '37.3 kWh',
    range: '120 km/h',
    connectorType: 'Type-3c',
    brand: 'Tesla',
    model: 'Model3',
    isPrimary: true,
    deleteTitle: "Delete Vehicle"
  },
  {
    id: 'model2',
    name: 'Tesla Model2',
    licensePlate: 'MM 4919 RGN',
    image: require('../../assets/images/carModels/white.png'),
    batteryCapacity: '35.8 kWh',
    range: '110 km/h',
    connectorType: 'Type-3c',
    brand: 'Tesla',
    model: 'Model2',
    isPrimary: false,
    deleteTitle: "Delete Vehicle"

  },
  {
    id: 'model1',
    name: 'Tesla Model1',
    licensePlate: 'MM 4919 RGN',
    image: require('../../assets/images/carModels/yellow.png'),
    batteryCapacity: '32.5 kWh',
    range: '100 km/h',
    connectorType: 'Type-3c',
    brand: 'Tesla',
    model: 'Model1',
    isPrimary: false,
    deleteTitle: "Delete Vehicle"

  }


  ];

  const handleVehicleClick = (vehicleId) => {
    if (expandedVehicle === vehicleId) {
      setExpandedVehicle(null);
    } else {
      setExpandedVehicle(vehicleId);
    }
  };

  const handleAddNewVehicle = () => {
    console.log("Add new vehicle");
    // Navigate to add vehicle screen
  };

  const handleDeleteVehicle = (vehicleId) => {
    console.log("Delete vehicle", vehicleId);
  };

  const handleTogglePrimary = (vehicleId) => {
    console.log("Toggle primary vehicle", vehicleId);
  };

  return (
    <View style={styles.container}>
      <Header
        text="My Vehicles"
        showAddNew={true}
        onAddNew={handleAddNewVehicle}
      />

      {vehicles && vehicles.length > 0 ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {vehicles.map((vehicle, index) => (
            <Expandable
              key={vehicle.id}
              item={vehicle}
              isExpanded={expandedVehicle === vehicle.id}
              onPress={handleVehicleClick}
              onDelete={handleDeleteVehicle}
              onTogglePrimary={handleTogglePrimary}
              isFirst={index === 0}
              deleteTitle="Delete Vehicle"
              imageStyle={{ width: 64, height: 40 }} // Car image sizing
              extraFields={[
                // Example of how to add custom fields if needed
                // { label: "Custom Field", value: "Custom Value" }
              ]}
            />
          ))}
        </ScrollView>
      ) : (
        <NoResult
          image={require('../../assets/images/myVehicleImgs/nodataimage.png')}
          title="No Vehicle Added!"
          message="You haven't added a vehicle yet! Add one now to easily find and enjoy nearby EV charging stations."
          showButton={true}
          buttonText="+Add New"
        />
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default MyVehicles;