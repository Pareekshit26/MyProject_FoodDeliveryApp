import React, {useState} from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Iconicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LottieView from 'lottie-react-native';

import {setHeight, setWidth} from '../utils/Display';
import Images from '../contants/Images';
import AuthenticationService from '../services/AuthenticationService';

const inputStyle = state => {
  switch (state) {
    case 'valid':
      return {
        ...styles.inputContainer,
        borderWidth: 1,
        borderColor: '#24C869',
      };
    case 'invalid':
      return {
        ...styles.inputContainer,
        borderWidth: 1,
        borderColor: '#F53920',
      };
    default:
      return styles.inputContainer;
  }
};

const showMaker = state =>{
  switch (state) {
    case 'valid':
      return (
        <AntDesign
          name="checkcircleo"
          color={'#24C869'}
          size={setWidth(4)}
          style={{marginLeft: setWidth(1)}}
        />
      );
      case 'invalid':
        return (
          <AntDesign
            name="closecircleo"
            color={'#F53920'}
            size={setWidth(4)}
            style={{marginLeft: setWidth(1)}}
          />
        );
    default:
      break;
  }
};

export default function SignupScreen(props: any) {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [emailState, setEmailState] = useState('default');
  const [usernameState, setUsernameState] = useState('default');

  const register = () => {
    setIsLoading(true);

    if (!username || !email || !password) {
      setErrorMessage('Please fill up all fields');
      setIsLoading(false);
      return;
    }

    const usernameRegex = /^[A-Z][a-zA-Z]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!usernameRegex.test(username)) {
      Alert.alert(
        'Username must start with a capital letter and contain only letters.',
      );
      setIsLoading(false);
      return;
    }
    if (!emailRegex.test(email)) {
      Alert.alert('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }
    if (!passwordRegex.test(password)) {
      Alert.alert(
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
      );
      setIsLoading(false);
      return;
    }

    let user = {
      username,
      email,
      password,
    };
    console.log(user);

    AuthenticationService.register(user)
      .then((response: any) => {
        console.log(response);
        if (!response.status) {
          setErrorMessage(response.message);
        } else {
          // props.navigation.navigate('PhoneRegister');
        }
      })
      .catch((err: any) => {
        setErrorMessage(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const checkUserExist = async (type, value) => {
    if (value?.length > 0) {
      AuthenticationService.checkUserExist(type, value).then(response => {
        if (response?.status) {
          type === 'email' && emailErrorMessage
            ? setEmailErrorMessage('')
            : null;
          type === 'username' && usernameErrorMessage
            ? setUsernameErrorMessage('')
            : null;
          type === 'email' ? setEmailState('valid') : null;
          type === 'username' ? setUsernameState('valid') : null;
        } else {
          type === 'email' ? setEmailErrorMessage(response?.message) : null;
          type === 'username'
            ? setUsernameErrorMessage(response?.message)
            : null;
          type === 'email' ? setEmailState('invalid') : null;
          type === 'username' ? setUsernameState('invalid') : null;
        }
      });
    }
  };

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
        <Text style={styles.headerTitle}>Sign up</Text>
      </View>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.content}>
        Enter your name, email and password for sign up.{' '}
        <Text
          onPress={() => props.navigation.navigate('Signin')}
          style={styles.alreadyLogin}>
          Already have an account?
        </Text>
      </Text>
      <View style={inputStyle(usernameState)}>
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
            onChangeText={text => setUsername(text.trim())}
            style={styles.inputText}
            onEndEditing={({nativeEvent: {text}}) =>
              checkUserExist('username', text)
            }
          />
          {showMaker(usernameState)}
        </View>
      </View>
      <Text style={styles.errorMsg}>{usernameErrorMessage}</Text>
      <View style={inputStyle(emailState)}>
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
            onChangeText={text => setEmail(text.trim())}
            keyboardType="email-address"
            onEndEditing={({nativeEvent: {text}}) =>
              checkUserExist('email', text)
            }
          />
          {showMaker(emailState)}
        </View>
      </View>
      <Text style={styles.errorMsg}>{emailErrorMessage}</Text>
      {/* <View style={{height: setHeight(3)}} /> */}
      {/* <Separator height={setHeight(3)} /> */}
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
            secureTextEntry={isPasswordShow ? false : true}
            onChangeText={text => setPassword(text.trim())}
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
      <Text style={styles.errorMsg}>{errorMessage}</Text>
      <TouchableOpacity
        style={styles.signinBtn}
        activeOpacity={0.8}
        onPress={() => {
          register();
        }}>
        {isLoading ? (
          <LottieView
            source={Images.LOADING}
            autoPlay
            style={{height: '100%', width: '100%'}}
          />
        ) : (
          <Text style={styles.signinText}>Create Account</Text>
        )}
      </TouchableOpacity>
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
  alreadyLogin: {
    color: '#0a8791',
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
    marginTop: setHeight(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinText: {
    color: '#fff',
    fontSize: setWidth(5),
    lineHeight: setWidth(5) * 1.4,
    fontFamily: 'Poppins-Medium',
  },
  orText: {
    color: '#000',
    fontSize: setWidth(4),
    lineHeight: setWidth(4) * 1.4,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
    marginTop: setHeight(2),
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
    // marginVertical: setHeight(3),
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
  errorMsg: {
    fontSize: setWidth(3),
    // lineHeight: setWidth(2) * 1.4,
    fontFamily: 'Poppins-Medium',
    marginHorizontal: setWidth(5),
    marginTop: setHeight(1),
    textAlign: 'center',
    color: '#F53920',
  },
});
