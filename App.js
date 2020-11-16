import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar } from 'react-native';
import {createBottomTabNavigator,  createStackNavigator  } from 'react-navigation';
import Navigation from './Navigation/Navigation';
import SplashScreen from 'react-native-splash-screen'

import {createStore , applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'

export default class App extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        isLoading: false
      }
    }

  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  }

  _displayLoading() {
//    if (this.state.isLoading) {
      //return (<Navigation/>)
  //  }else{
      return (<Navigation/>)
  //  }
  }

  render() {
    console.disableYellowBox = false;
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    return (
      <View style={{flex:1}}>
      <Provider store={createStore(reducers,{},applyMiddleware(ReduxThunk))}>
          <StatusBar  backgroundColor="#000000"   />
              {this._displayLoading()}
      </Provider>
      </View>
    );
  }
}
