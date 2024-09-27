import React, {useState} from 'react';
import {TouchableOpacity, Animated, StyleSheet, Easing} from 'react-native';
import { setWidth } from '../src/utils/Display';

const containerStyle = (size, isActive) => ({
  backgroundColor: isActive ? '#0a8791' : '#c2c2cb',
    height: setWidth(6) * size,
    width: setWidth(12) * size,
    borderRadius: setWidth(6),
    padding: setWidth(0.5) * size,
});

const toggleStyle = (size, animatedValue) => ({
  height: setWidth(5) * size,
  width: setWidth(5) * size,
  backgroundColor: '#fff',
  borderRadius: setWidth(5),
  transform: [
    {
      translateX: animatedValue,
    },
  ],
});

const ToggleButton = ({size}) => {
  const [isActive, setIsActive] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

  const toggleHandle = () => {
    Animated.timing(animatedValue, {
      toValue: isActive ? 0 : setWidth(5) * size,
      duration: 250,
      easing: Easing.bounce,
      delay: 0,
      useNativeDriver: true,
    }).start();
    setIsActive(!isActive);
  };

  return (
    <TouchableOpacity
      style={containerStyle(size, isActive)}
      onPress={() => toggleHandle()}
      activeOpacity={0.8}>
      <Animated.View style={toggleStyle(size, animatedValue)} />
    </TouchableOpacity>
  );
};

export default ToggleButton;
