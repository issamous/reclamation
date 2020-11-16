// Navigation/Navigation.js
import React from 'react'
import { createStackNavigator ,createBottomTabNavigator ,createSwitchNavigator , createDrawerNavigator , createAppContainer } from 'react-navigation'
import { StyleSheet, Image , View , TouchableOpacity , Button} from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

class menu extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../Images/avatar.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
