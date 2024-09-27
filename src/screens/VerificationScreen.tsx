import React, {useRef, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Iconicons from 'react-native-vector-icons/Ionicons';

import {setHeight, setWidth} from '../utils/Display';

export default function VerificationScreen(props: any) {
  const firstInp = useRef();
  const secondInp = useRef();
  const thirdInp = useRef();
  const fourthInp = useRef();
  const [otp, setOtp] = useState({1: '', 2: '', 3: '', 4: ''});

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
      {/* <Separator height={StatusBar.currentHeight} /> */}
      <View style={styles.headerContainer}>
        <Iconicons
          name="chevron-back-outline"
          size={setWidth(6)}
          onPress={() => props.navigation.goBack()}
          color={'#000'}
        />
        <Text style={styles.headerTitle}>Verification</Text>
      </View>
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.content}>
        Enter the OTP number just sent you at{' '}
        <Text style={styles.phoneNumber}>{props.route.params.phoneNumber}</Text>
      </Text>
      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <TextInput
            ref={firstInp}
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={text => {
              setOtp({...otp, 1: text});
              text && secondInp.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            ref={secondInp}
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={text => {
              setOtp({...otp, 2: text});
              text ? thirdInp.current.focus() : firstInp.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            ref={thirdInp}
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={text => {
              setOtp({...otp, 3: text});
              text ? fourthInp.current.focus() : secondInp.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            ref={fourthInp}
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={text => {
              setOtp({...otp, 4: text});
              !text && thirdInp.current.focus();
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.signinBtn}
        activeOpacity={0.8}
        onPress={() => {
          console.log(otp);
        }}>
        <Text style={styles.signinText}>Verify</Text>
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
  phoneNumber: {
    fontSize: setWidth(4),
    color: '#FBA83C',
    fontFamily: 'Poppins-Regular',
    lineHeight: setWidth(4) * 1.4,
  },
  otpContainer: {
    marginHorizontal: setWidth(5),
    marginVertical: setHeight(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  otpBox: {
    borderWidth: 0.5,
    borderRadius: setWidth(1),
    borderColor: '#0a8791',
  },
  otpText: {
    fontSize: setWidth(5),
    paddingVertical: setWidth(4),
    paddingHorizontal: setWidth(4),
    padding: 0,
    textAlign: 'center',
    color: '#000',
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
