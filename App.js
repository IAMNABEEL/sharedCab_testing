import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MainApp from './components/MainApp';

// redux here
const initialstate = {counter : 0}
 
const reduser = (state = initialstate , action ) => {
  switch(action.type){
    case 'INCREAMENT':
      return {counter:state.counter + action.value};
      break;
    case 'DECREAMENT':
      return {counter:state.counter - action.value};
      break;
    default :
      return state
  }
  return state
}

const store = createStore(reduser)

export default function App() {

  return (
    <Provider store = {store} >
      <MainApp props={store} />
    </Provider>
  );
}




