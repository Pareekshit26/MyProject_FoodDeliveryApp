/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {setHeight, setWidth} from '../utils/Display';
import CATEGORIES from '../contants/Mock';
import RestaurentService from '../services/RestaurentService';
import StaticImageService from '../services/StaticImageService';
import Images from '../contants/Images';

const sortStyle = isActive =>
  isActive
    ? styles.sortListItem
    : {...styles.sortListItem, borderBottomColor: '#ffffff'};

const HomeScreen = ({navigation}: any) => {
  const [activeCategory, setActiveCategory] = useState();
  const [restaurants, setRestaurants] = useState([]);
  const [activeSortItem, setActiveSortItem] = useState('recent');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      RestaurentService.getRestaurantData().then(response => {
        if (response?.status) {
          // console.log('Fetched restaurant data:', response.data);
          setRestaurants(response.data);
        }
      });
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'#0A8791'} />
      <View style={styles.CurvedBackgroundContainer} />
      <View>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={setWidth(4)} color={'#fff'} />
          <Text style={styles.locationText}>Delivered to</Text>
          <Text style={styles.selectedLocationText}>Home</Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={setWidth(4)}
            color={'#FBA83C'}
          />
          <Feather
            name="bell"
            size={setWidth(5)}
            color={'#fff'}
            style={styles.bellIcon}
          />
          <View style={styles.alertBadge}>
            <Text style={styles.alertBadgeText}>12</Text>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchSection}>
            <Ionicons
              name="search-outline"
              color={'#C2C2CB'}
              size={setWidth(5)}
            />
            <TextInput
              placeholder="search..."
              placeholderTextColor={'#c2c2cb'}
              selectionColor={'#000'}
              style={styles.searchText}
            />
          </View>
          <Feather name="sliders" color={'#FBA83C'} size={setWidth(4)} />
        </View>
        <View style={styles.categoryContainer}>
          {CATEGORIES.map(({name, logo}) => {
            const isActive = activeCategory === name;
            return (
              <TouchableOpacity
                key={name}
                onPress={() => setActiveCategory(name)}
                style={{alignItems: 'center'}}>
                <Image
                  source={logo}
                  style={{
                    height: setWidth(9),
                    width: setWidth(9),
                    opacity: isActive ? 1 : 0.5,
                  }}
                />
                <Text
                  style={{
                    color: isActive ? '#FBA83C' : '#fff',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  {name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <ScrollView
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.horizontalListContainer}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitles}>Favourites</Text>
            <Text style={styles.listSubtitle}>see all</Text>
          </View>
          <FlatList
            data={restaurants}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              const posterUrl = StaticImageService.getPoster(
                item.images.poster,
              );
              // const logoUrl = StaticImageService.getLogo(item.images.logo);
              // console.log('Poster URL:', posterUrl);
              // console.log('Restart URL:', item);
              // console.log('Logo URL:', logoUrl);
              return (
                <TouchableOpacity style={styles.restaurantListContainer}>
                  <Image source={{uri: posterUrl}} style={styles.poster} />
                  <Text style={styles.restaurantName}>{item.name}</Text>
                  <Text style={styles.tagText}>
                    {item.tags?.slice(0, 5).join(' | ')}
                  </Text>
                  <View style={styles.footerContainer}>
                    <View style={styles.rowAndCenter}>
                      <FontAwesome
                        name="star"
                        size={setWidth(3)}
                        color={'#FBA83C'}
                      />
                      <Text style={styles.ratingText}>5</Text>
                      <Text style={styles.reviewText}>(10)</Text>
                    </View>
                    <View style={styles.timeAndDistance}>
                      <View style={styles.rowAndCenter}>
                        <View style={styles.timeAndDistanceContainer}>
                          <Ionicons
                            name="location-outline"
                            color={'#fba83c'}
                            size={setWidth(3)}
                          />
                          <Text style={styles.timeAndDistanceText}>
                            {item?.distance}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.rowAndCenter}>
                        <View style={styles.timeAndDistanceContainer}>
                          <Ionicons
                            name="time-outline"
                            color={'#fba83c'}
                            size={setWidth(3)}
                          />
                          <Text style={styles.timeAndDistanceText}>
                            {item.time}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={<Text>No restaurants available</Text>}
          />
        </View>
        <View style={styles.sortListContainer}>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'recent')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('recent')}>
            <Text style={styles.sortListItemText}>Recent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'favorite')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('favorite')}>
            <Text style={styles.sortListItemText}>Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'rating')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('rating')}>
            <Text style={styles.sortListItemText}>Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'popular')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('popular')}>
            <Text style={styles.sortListItemText}>Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sortStyle(activeSortItem === 'trending')}
            activeOpacity={0.8}
            onPress={() => setActiveSortItem('trending')}>
            <Text style={styles.sortListItemText}>Trending</Text>
          </TouchableOpacity>
        </View>
        {restaurants.map(item => {
          return (
            <View style={styles.posterContainer}>
              <View>
                <Image
                  source={{uri: StaticImageService.getLogo(item.images.logo)}}
                  style={styles.posterStyle}
                />
              </View>
              <View style={styles.labelContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleText}>{item.name}</Text>
                  <View style={styles.rowAndCenter}>
                    <FontAwesome
                      name="star"
                      size={setWidth(3)}
                      color={'#FBA83C'}
                    />
                    <Text style={styles.ratingText}>4.1</Text>
                    <Text style={styles.reviewText}>(211)</Text>
                  </View>
                </View>
                <Text style={styles.tagText}>
                  {item.tags.slice(0, 5).join(' | ')}
                </Text>
                <View style={styles.deliveryDetailsContainer}>
                  <View style={styles.rowAndCenter}>
                    <Image
                      source={Images.DELIVERY_CHARGE}
                      style={styles.deliveryDetailsIcon}
                    />
                    <Text style={styles.deliveryDetailsText}>
                      Free delivery
                    </Text>
                  </View>
                  <View style={styles.rowAndCenter}>
                    <Image
                      source={Images.DELIVERY_TIME}
                      style={styles.deliveryDetailsIcon}
                    />
                    <Text style={styles.deliveryDetailsText}>
                      {item.time} min
                    </Text>
                  </View>
                  <View style={styles.rowAndCenter}>
                    <Image
                      source={Images.PHONE}
                      style={styles.deliveryDetailsIcon}
                    />
                    <Text style={styles.deliveryDetailsText}>Contact</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: setWidth(4),
  },
  CurvedBackgroundContainer: {
    backgroundColor: '#0a8791',
    height: 2000,
    position: 'absolute',
    top: -1 * (2000 - 230),
    width: 2000,
    borderRadius: 2000,
    alignSelf: 'center',
    zIndex: -1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: setHeight(1.5),
  },
  locationText: {
    color: '#FFFFFF',
    marginLeft: setWidth(1),
    fontSize: setWidth(3),
    lineHeight: setWidth(3) * 1.4,
    fontFamily: 'Poppins-Medium',
  },
  selectedLocationText: {
    color: '#FBA83C',
    marginLeft: setWidth(1),
    fontSize: setWidth(3),
    lineHeight: setWidth(3) * 1.4,
    fontFamily: 'Poppins-Medium',
  },
  bellIcon: {
    position: 'absolute',
    right: 0,
  },
  alertBadge: {
    backgroundColor: '#fba83c',
    height: setWidth(4),
    width: setWidth(4),
    borderRadius: setWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: setWidth(-2),
    top: setWidth(-2),
  },
  alertBadgeText: {
    color: '#fff',
    fontSize: setWidth(2),
    lineHeight: setWidth(2) * 1.4,
    fontFamily: 'Poppins-Bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: setHeight(1.5),
    backgroundColor: '#fff',
    paddingHorizontal: setWidth(3),
    borderRadius: setWidth(10),
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: setWidth(1),
  },
  searchText: {
    marginLeft: setWidth(1),
    fontSize: setWidth(4),
    color: '#c2c2cb',
    width: '85%',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: setWidth(3),
    paddingVertical: setWidth(2),
    alignItems: 'center',
  },
  listContainer: {
    paddingVertical: setHeight(2),
    zIndex: setHeight(-1),
  },
  horizontalListContainer: {
    marginTop: setHeight(3),
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: setHeight(1),
    marginHorizontal: setWidth(4),
  },
  listTitles: {
    color: '#000',
    fontSize: setWidth(4),
    lineHeight: setWidth(4) * 1.4,
    fontFamily: 'Poppins-Medium',
  },
  listSubtitle: {
    color: '#fba83c',
    fontSize: setWidth(3),
    lineHeight: setWidth(3) * 1.4,
    fontFamily: 'Poppins-Regular',
  },
  restaurantListContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: setWidth(2),
    elevation: 7,
    marginBottom: setHeight(1),
    marginHorizontal: setWidth(1),
  },
  poster: {
    width: 1920 * 0.15,
    height: 1080 * 0.15,
    borderRadius: setWidth(2),
    margin: setWidth(1),
  },
  restaurantName: {
    color: '#000',
    fontSize: setWidth(4),
    lineHeight: setWidth(4) * 1.4,
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: setWidth(1),
  },
  tagText: {
    color: '#C2C2CB',
    fontSize: setWidth(3),
    lineHeight: setWidth(3) * 1.4,
    fontFamily: 'Poppins-Medium',
    marginLeft: setWidth(1.5),
    marginTop: setWidth(1),
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: setWidth(2),
    marginBottom: setHeight(1),
    justifyContent: 'space-between',
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: setWidth(1),
    fontSize: setWidth(3),
    lineHeight: setWidth(3) * 1.4,
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  reviewText: {
    fontSize: setWidth(3),
    lineHeight: setWidth(3) * 1.4,
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  timeAndDistanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: setWidth(1),
    backgroundColor: '#FCE6CD',
    borderRadius: setWidth(3),
    marginHorizontal: setWidth(1),
  },
  timeAndDistanceText: {
    paddingLeft: setWidth(1),
    color: '#fba83c',
    fontSize: setWidth(3),
    lineHeight: setWidth(3) * 1.4,
    fontFamily: 'Poppins-Medium',
  },
  timeAndDistance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookmark: {
    position: 'absolute',
    top: setWidth(2),
    right: setWidth(2),
    zIndex: setWidth(2),
  },
  sortListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: setHeight(1),
    elevation: 1,
  },
  sortListItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fba83c',
    height: setHeight(4.5),
  },
  sortListItemText: {
    color: '#000',
    fontSize: setWidth(3),
    lineHeight: 13 * 1.4,
    fontFamily: 'Poppins-SemiBold',
  },
  posterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: setHeight(2),
    elevation: 1,
    borderRadius: setWidth(2),
    marginTop: setHeight(1),
    backgroundColor: '#fff',
  },
  posterStyle: {
    width: setWidth(20),
    height: setWidth(20),
    borderRadius: setWidth(10),
    margin: setWidth(1),
  },
  labelContainer: {
    flex: 1,
    marginHorizontal: setWidth(2),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: setWidth(1),
  },
  titleText: {
    color: '#000',
    fontSize: setWidth(4),
    lineHeight: setWidth(4) * 1.4,
    fontFamily: 'Poppins-Medium',
    margin: setWidth(1),
  },
  deliveryDetailsIcon: {
    width: setWidth(4),
    height: setWidth(4),
  },
  deliveryDetailsText: {
    marginLeft: setHeight(1),
    color: '#000',
    fontSize: setWidth(3),
    lineHeight: setWidth(3) * 1.4,
    fontFamily: 'Poppins-Regular',
  },
});

export default HomeScreen;
