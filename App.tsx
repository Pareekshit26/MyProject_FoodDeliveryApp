import React from 'react';
import {} from 'react-native';
import Navigators from './src/navigators/Navigators';
import { Provider } from 'react-redux';
import {Store} from './src/Store';

// export default function App() {
//   return (
//     <Provider store={Store}>
//       <Navigators />
//     </Provider>
//   );
// }

export default () => (
  <Provider store={Store}>
    <Navigators />
  </Provider>
);
