import React, { useEffect, useState } from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import RestaurentService from '../services/RestaurentService';
import StaticImageService from '../services/StaticImageService';
import ApiContants from '../contants/ApiContants';
import { setWidth } from '../utils/Display';

const Restaurants = ({ navigation, route: { params: { restaurantId } } }) => {
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    RestaurentService.getOneRestaurantById(restaurantId).then((response) => {
      console.log('Restaurant ID:', restaurantId);
      console.log('Response data:', response.data);
      setRestaurants(response.data);
    });
  }, [restaurantId]);

  if (!restaurants) {
    return <Text>Loading...</Text>; // Add a loading state
  }

  const coverImageUrl = StaticImageService.getGalleryImage(
    restaurants.images.cover,
    ApiContants.STATIC_IMAGE.SIZE.SQUARE,
    ApiContants.STATIC_IMAGE.QUALITY.SD
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" backgroundColor={'transparent'} />
      <Image
        source={{ uri: coverImageUrl }}
        style={styles.backgroundImage}
      />
      {/* Other content can go here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: setWidth(100),
    width: setWidth(100),
    resizeMode: 'cover',
  },
});

export default Restaurants;
