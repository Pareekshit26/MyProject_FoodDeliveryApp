import React, {useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Iconicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';

import ToggleButton from '../../components/ToggleButton';
import Images from '../contants/Images';
import {setHeight, setWidth} from '../utils/Display';
import AuthenticationService from '../services/AuthenticationService';

import GeneralAction from '../actions/GeneralAction';
import StorageService from '../services/StorageService';
import {useDispatch} from 'react-redux';
// import {connect} from 'react-redux';

function SigninScreen({navigation}: any) {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  const signIn = async () => {
    setisLoading(true);
    let user = {
      username,
      password,
    };
    AuthenticationService.login(user).then(response => {
      setisLoading(false);
      // console.log(response);
      // setToken(response.data);
      if (response.status) {
        StorageService.setToken(response.data).then(() => {
          dispatch(GeneralAction.setToken(response.data));
        });
      } else {
        setErrorMessage(response.message);
      }
    });
    // props.navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
      <View style={styles.headerContainer}>
        <Iconicons
          name="chevron-back-outline"
          size={setWidth(6)}
          onPress={() => navigation.goBack()}
          color={'#000'}
        />
        <Text style={styles.headerTitle}>Sign in</Text>
      </View>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.content}>
        Enter your email address or phone number to sign in. Enjoy your food.
      </Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="user"
            size={setWidth(5)}
            color={'#c2c2cb'}
            style={{margin: setWidth(2)}}
          />
          <TextInput
            placeholder="Username"
            placeholderTextColor={'#c2c2cb'}
            selectionColor={'#c2c2cb'}
            onChangeText={text => setUsername(text)}
            style={styles.inputText}
          />
        </View>
      </View>
      <View style={{height: setHeight(3)}} />
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="lock"
            size={setWidth(5)}
            color={'#c2c2cb'}
            style={{margin: setWidth(2)}}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={'#c2c2cb'}
            selectionColor={'#c2c2cb'}
            secureTextEntry={!isPasswordShow}
            onChangeText={text => setPassword(text)}
            style={styles.inputText}
          />
          <Feather
            name={isPasswordShow ? 'eye' : 'eye-off'}
            size={setWidth(5)}
            color={'#c2c2cb'}
            style={{margin: setWidth(2)}}
            onPress={() => setIsPasswordShow(!isPasswordShow)}
          />
        </View>
      </View>
      <View style={styles.forgorPasswordContainer}>
        <View>
          <View style={styles.toggleContainer}>
            <ToggleButton size={0.5} />
            <Text style={styles.rememberMeText}>Remember me</Text>
          </View>
        </View>
        <Text
          style={styles.forgotPasswordText}
          onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot password?
        </Text>
      </View>
      <Text style={styles.errorMsg}>{errorMessage}</Text>
      <TouchableOpacity
        style={styles.signinBtn}
        activeOpacity={0.8}
        onPress={signIn}>
        {isLoading ? (
          <LottieView source={Images.LOADING} autoPlay style={styles.Lottie} />
        ) : (
          <Text style={styles.signinText}>Sign in</Text>
        )}
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={styles.accountText}>Do not have an account?</Text>
        <Text
          style={styles.signupText}
          onPress={() => navigation.navigate('Signup')}>
          Sign up
        </Text>
      </View>
      <Text style={styles.orText}>OR</Text>
      <TouchableOpacity style={styles.facebookBtn}>
        <View style={styles.socialBtnContainer}>
          <View style={styles.signinBtnContainer}>
            <Image source={Images.FACEBOOK} style={styles.signinBtnLogo} />
          </View>
          <Text style={styles.socialSigninText}>Connect with Facebook</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleBtn}>
        <View style={styles.socialBtnContainer}>
          <View style={styles.signinBtnContainer}>
            <Image source={Images.GOOGLE} style={styles.signinBtnLogo} />
          </View>
          <Text style={styles.socialSigninText}>Connect with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

// const mapDispatchToProps = (
//   dispatch: (arg0: {type: string; payLoad: any}) => any,
// ) => ({
//   setToken: (token: any) => dispatch(GeneralAction.setToken(token)),
// });

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
  inputContainer: {
    backgroundColor: '#F8F7F7',
    paddingHorizontal: setWidth(2),
    marginHorizontal: setWidth(5),
    borderRadius: setWidth(3),
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
  forgorPasswordContainer: {
    marginHorizontal: setWidth(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rememberMeText: {
    color: '#c2c2cb',
    marginLeft: setWidth(2),
    fontSize: setWidth(3),
    lineHeight: setWidth(3) * 1.4,
    fontFamily: 'Poppins-Medium',
  },
  forgotPasswordText: {
    color: '#0a8791',
    fontSize: setWidth(3),
    lineHeight: setWidth(3) * 1.4,
    fontFamily: 'Poppins-Bold',
  },
  signinBtn: {
    backgroundColor: '#0a8791',
    height: setHeight(6),
    marginHorizontal: setWidth(5),
    borderRadius: setWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinText: {
    color: '#fff',
    fontSize: setWidth(5),
    lineHeight: setWidth(5) * 1.4,
    fontFamily: 'Poppins-Medium',
  },
  signupContainer: {
    marginHorizontal: setWidth(5),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: setHeight(3),
  },
  accountText: {
    color: '#000',
    marginRight: setWidth(1),
    fontSize: setWidth(3),
    lineHeight: setWidth(3) * 1.4,
    fontFamily: 'Poppins-Medium',
  },
  signupText: {
    color: '#0a8791',
    fontSize: setWidth(3),
    lineHeight: setWidth(3) * 1.4,
    fontFamily: 'Poppins-Medium',
  },
  orText: {
    color: '#000',
    fontSize: setWidth(4),
    lineHeight: setWidth(4) * 1.4,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
  },
  facebookBtn: {
    backgroundColor: '#4A61A8',
    marginHorizontal: setWidth(5),
    paddingVertical: setHeight(1.5),
    borderRadius: setWidth(2),
    marginVertical: setHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleBtn: {
    backgroundColor: '#53A0F4',
    marginHorizontal: setWidth(5),
    paddingVertical: setHeight(1.5),
    borderRadius: setWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinBtnLogo: {
    height: setWidth(4),
    width: setWidth(4),
  },
  signinBtnContainer: {
    backgroundColor: '#fff',
    padding: setWidth(1.7),
    borderRadius: setWidth(2),
    position: 'absolute',
    left: setWidth(6),
  },
  socialBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  socialSigninText: {
    color: '#fff',
    fontSize: setWidth(3.5),
    fontFamily: 'Poppins-Medium',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Lottie: {
    height: '100%',
    width: '100%',
  },
  errorMsg: {
    fontSize: setWidth(3),
    fontFamily: 'Poppins-Medium',
    marginHorizontal: setWidth(5),
    marginTop: setHeight(1),
    textAlign: 'center',
    color: '#F53920',
  },
});

export default SigninScreen;
