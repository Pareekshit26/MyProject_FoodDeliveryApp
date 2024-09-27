import { configureStore } from '@reduxjs/toolkit';
// import generalReducer from './reducers/GeneralReducer';
import RootReducer from './reducers/RootReducer';

const Store = configureStore({
  reducer: RootReducer,
});

const getToken = () => Store.getState().generalState.token;

export {Store, getToken};

// store.js
// import {createStore, combineReducers, applyMiddleware} from 'redux';
// import generalReducer from './reducers/GeneralReducer';
// import {thunk} from 'redux-thunk';

// const rootReducer = combineReducers({
//   generalState: generalReducer,
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;
