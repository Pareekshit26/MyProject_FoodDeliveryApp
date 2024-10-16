/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  Image,
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
import { setHeight, setWidth } from '../utils/Display';
import CATEGORIES from '../contants/Mock';

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState('');

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
          {CATEGORIES.map(({ name, logo }) => {
            const isActive = activeCategory === name;
            return (
              <TouchableOpacity
                key={name}
                onPress={() => setActiveCategory(name)}>
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
                    textAlign: 'center',
                  }}>
                  {name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
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
    marginHorizontal: setWidth(4),
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
    marginHorizontal: setWidth(4),
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
    padding: setWidth(2),
    alignItems: 'center',
  },
});

export default HomeScreen;
