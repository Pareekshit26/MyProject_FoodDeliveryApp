import React from 'react';
import { View, Text, StatusBar, StyleSheet, Image } from 'react-native';
import Images from '../contants/Images';
import { setHeight, setWidth } from '../utils/Display';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'#0A8791'}
        translucent
      />
      <Image source={Images.PLATE} style={styles.image} />
      <Text style={styles.titleText}>Food House</Text>
      <Text style={styles.welcomeText}>Welcome to Food House</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A8791',
  },
  image: {
    resizeMode: 'contain',
    height: setHeight(30),
    width: setWidth(60),
  },
  titleText: {
    color: '#fff',
    fontSize: setWidth(7),
    fontFamily: 'Poppins-Bold',
  },
  welcomeText:{
    color: '#fff',
    fontSize: setWidth(5),
    fontFamily: 'Poppins-Regular',
    position: 'absolute',
    bottom: 0,
  },
});
