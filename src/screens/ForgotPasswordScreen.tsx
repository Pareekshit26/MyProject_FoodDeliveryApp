import React from 'react';
import {
    View,
    Text,
    TextInput,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';
import { setHeight, setWidth } from '../utils/Display';

import Iconicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

function ForgorPasswordScreen(props: any) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
        <View style={styles.headerContainer}>
          <Iconicons
            name="chevron-back-outline"
            size={setWidth(6)}
            onPress={() => props.navigation.goBack()}
            color={'#000'}
          />
          <Text style={styles.headerTitle}>Sign up</Text>
        </View>
        <Text style={styles.title}>Forget Password</Text>
      <Text style={styles.content}>
        Please enter your email so we can help you in recovering your password.
      </Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputSubContainer}>
            <Feather
              name="mail"
              size={setWidth(5)}
              color={'#c2c2cb'}
              style={{margin: setWidth(2)}}
            />
            <TextInput
              placeholder="Email address"
              placeholderTextColor={'#c2c2cb'}
              selectionColor={'#c2c2cb'}
              style={styles.inputText}
              keyboardType="email-address"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.signinBtn}>
        <Text style={styles.signinText}>Reset Password</Text>
      </TouchableOpacity>
      </View>
    );
}

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
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
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
    content: {
      fontSize: setWidth(4),
      color: '#000',
      fontFamily: 'Poppins-Medium',
      lineHeight: setWidth(4) * 1.4,
      marginTop: setHeight(1.6),
      marginBottom: setHeight(2.5),
      marginHorizontal: setWidth(5),
    },
    inputContainer: {
      backgroundColor: '#F8F7F7',
      paddingHorizontal: setWidth(2),
      marginHorizontal: setWidth(5),
      borderRadius: setWidth(3),
      // borderWidth: 0.5,
      borderColor: '#000',
      justifyContent: 'center',
    },
    inputSubContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputText: {
      fontSize: setWidth(4),
      textAlignVertical: 'center',
      padding: 0,
      height: setHeight(6),
      color: '#000',
      flex: 1,
    },
    signinBtn: {
      backgroundColor: '#0a8791',
      height: setHeight(6),
      marginHorizontal: setWidth(5),
      // borderWidth: 0.5,
      borderRadius: setWidth(2),
      marginTop: setHeight(3),
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

export default ForgorPasswordScreen;
