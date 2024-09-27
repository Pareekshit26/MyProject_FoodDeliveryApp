import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Iconicons from 'react-native-vector-icons/Ionicons';

import { setHeight, setWidth } from '../utils/Display';
import StaticImageService from '../services/StaticImageService';
import CountryCode from '../contants/CountryCode';

const getDropdownStyle = (y: number) => ({
  ...styles.countryDropdown,
  top: y + setHeight(7),
});

const PhoneRegisterScreen = (props: any) => {
  const [selectedCountry, setSelectedCountry] = useState(
    CountryCode.find(country => country.name === 'India'),
  );
  const [inputsContainer, setInputsContainer] = useState(0);
  const [isDropdownOpen, setisDropDownOpen] = useState(false);
  const [dropdownLayout, setDropdownLayout] = useState({});
  const [phoneNumber, setPhoneNumber] = useState('');

  const closeDropdown = (pageX, pageY) => {
    if (isDropdownOpen) {
      if (
        pageX < dropdownLayout?.x ||
        pageX > dropdownLayout?.x + dropdownLayout.width ||
        pageY < dropdownLayout?.y ||
        pageY > dropdownLayout?.y + dropdownLayout?.height
      ) {
        setisDropDownOpen(false);
      }
    }
  };

  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
    setisDropDownOpen(false);
    // console.log('Selected country:', country);
  };

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={({nativeEvent: {pageX, pageY}}) =>
        closeDropdown(pageX, pageY)
      }>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
      <View style={styles.headerContainer}>
        <Iconicons
          name="chevron-back-outline"
          size={setWidth(6)}
          onPress={() => props.navigation.goBack()}
          color={'#000'}
        />
        <Text style={styles.headerTitle}>Log in into Food House</Text>
      </View>
      <Text style={styles.title}>
        Enter your registered phone number to login
      </Text>
      <View
        style={styles.inputContainer}
        onLayout={({
          nativeEvent: {
            layout: {y},
          },
        }) => setInputsContainer(y)}>
        <TouchableOpacity
          style={styles.countryListContainer}
          onPress={() => setisDropDownOpen(!isDropdownOpen)}>
          <Image
            source={{
              uri: StaticImageService.getFlatIcon(selectedCountry?.code),
            }}
            style={styles.flagIcon}
          />
          <Text style={styles.countryCodeText}>
            {selectedCountry?.dial_code}
          </Text>
          <MaterialIcons name="keyboard-arrow-down" size={setWidth(4)} />
        </TouchableOpacity>
        <View style={styles.phoneInpContainer}>
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor={'#c2c2cb'}
            selectionColor={'#c2c2cb'}
            keyboardType="number-pad"
            onFocus={() => setisDropDownOpen(false)}
            onChangeText={text =>
              setPhoneNumber(selectedCountry?.dial_code + text)
            }
            style={styles.inpText}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.signinBtn}
        activeOpacity={0.8}
        onPress={() => {
          props.navigation.navigate('Verification', {phoneNumber});
        }}>
        <Text style={styles.signinText}>Continue</Text>
      </TouchableOpacity>

      {isDropdownOpen ? (
        <View
          style={getDropdownStyle(inputsContainer)}
          onLayout={({
            nativeEvent: {
              layout: {x, y, height, width},
            },
          }) => setDropdownLayout({x, y, height, width})}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={CountryCode}
            keyExtractor={item => item.code}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.listContant}
                onPress={() => handleCountrySelect(item)}>
                <Image
                  source={{uri: StaticImageService.getFlatIcon(item.code)}}
                  style={styles.flatImage}
                />
                <Text style={styles.flagText}>{item.dial_code}</Text>
                <Text style={styles.flagText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: setHeight(2),
    paddingHorizontal: setWidth(4),
  },
  headerTitle: {
    fontSize: setWidth(5),
    fontFamily: 'Poppins-Medium',
    lineHeight: setWidth(5) * 1.4,
    width: setWidth(80),
    textAlign: 'center',
    color: '#000',
  },
  title: {
    fontSize: setWidth(5),
    color: '#000',
    fontFamily: 'Poppins-Medium',
    lineHeight: setWidth(5) * 1.4,
    marginTop: setHeight(8),
    marginBottom: setHeight(2.5),
    marginHorizontal: setWidth(5),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: setWidth(5),
    marginVertical: setHeight(5),
  },
  countryListContainer: {
    backgroundColor: '#F8F7F7',
    width: setWidth(22),
    height: setHeight(6),
    marginRight: setWidth(2.5),
    borderRadius: setWidth(2),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#eaeaea',
  },
  phoneInpContainer: {
    flex: 1,
    backgroundColor: '#F8F7F7',
    paddingHorizontal: setWidth(2.5),
    borderRadius: setWidth(2),
    borderWidth: 0.5,
    justifyContent: 'center',
    borderColor: '#eaeaea',
  },
  flagIcon: {
    height: setWidth(5),
    width: setWidth(5),
  },
  countryCodeText: {
    fontSize: setWidth(4),
    lineHeight: setWidth(4) * 1.4,
    color: '#000',
    fontFamily: 'Poppins-Medium',
  },
  inpText: {
    fontSize: setWidth(4),
    textAlignVertical: 'center',
    padding: 0,
    height: setHeight(6),
    color: '#000',
  },
  countryDropdown: {
    backgroundColor: '#F8F7F7',
    position: 'absolute',
    width: setWidth(80),
    height: setHeight(50),
    marginLeft: setWidth(5),
    borderRadius: setWidth(2.5),
    borderWidth: 0.5,
    borderColor: '#eaeaea',
    zIndex: 3,
  },
  listContant:{
    flexDirection: 'row',
    alignItems: 'center',
    padding: setWidth(2),
  },
  flatImage: {
    height: setWidth(6),
    width: setWidth(6),
    marginRight: setWidth(2.5),
  },
  flagText: {
    fontSize: setWidth(3),
    lineHeight: setWidth(3) * 1.4,
    color: '#000',
    fontFamily: 'Poppins-Medium',
    marginRight: setWidth(2.5),
  },
  signinBtn: {
    backgroundColor: '#0a8791',
    height: setHeight(6),
    marginHorizontal: setWidth(5),
    // borderWidth: 0.5,
    borderRadius: setWidth(2),
    // marginTop: setHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinText: {
    color: '#fff',
    fontSize: setWidth(5),
    lineHeight: setWidth(5) * 1.4,
    fontFamily: 'Poppins-Medium',
  },
});

export default PhoneRegisterScreen;
