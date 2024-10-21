import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
// const fontSize = width / Dimensions.get('window').scale;

const setHeight = (h: number) => (height / 100) * h;
const setWidth = (w: number) => (width / 100) * w;
// const setFontSize = (f: number) => (fontSize / 100) * f;

export { setHeight, setWidth };
