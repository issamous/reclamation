import React from 'react'
import{connect} from 'react-redux'
import {Alert,Text, cropImage,Dimensions, View ,TextInput ,Easing ,Button,StyleSheet,TouchableHighlight,TouchableOpacity,ActivityIndicator,ImageBackground,Image,ScrollView,Platform,Animated} from 'react-native';
import{loginUser} from './../actions'
class Information extends React.Component {
    constructor(props) {
        super(props);
        console.warn(this.props.user);
    }
    render() {
        return (
          <View style={{flex:1, alignItems:'center' , justifyContent:'center'}}>
           <Text>
              Application de Reclamation de ben arous
           </Text>
          </View>
        );
      }
}
const mapStateToProps =state =>{
    return {
      errors :state.auth.error,
      isLoadingLogin :state.auth.isLoadingLogin,
      user:state.auth.user,
      }
  }
export default connect(mapStateToProps,{loginUser})(Information)
