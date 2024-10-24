import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgorPasswordScreen from '../screens/ForgotPasswordScreen';
import PhoneRegisterScreen from '../screens/PhoneRegisterScreen';
import VerificationScreen from '../screens/VerificationScreen';
import HomeScreen from '../screens/HomeScreen';
import Restaurants from '../screens/RestaurantScreen';

import { useDispatch, useSelector } from 'react-redux';
import GeneralAction from '../actions/GeneralAction';

const Stack = createNativeStackNavigator();

function Navigators() {

  const {isAppLoading, token, isFirstTimeUse} = useSelector(
    state => state.generalState,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GeneralAction.appStart());
  }, []);
  // console.log('Navigation:', token);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAppLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : !token || token === null || token === '' ? (
          <>
            {isFirstTimeUse && (
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
            )}

            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgorPasswordScreen}
            />
            <Stack.Screen
              name="PhoneRegister"
              component={PhoneRegisterScreen}
            />
            <Stack.Screen name="Verification" component={VerificationScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Restaurants" component={Restaurants} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default (Navigators);
