import React from 'react'
import {Alert,Text, cropImage,Dimensions, View ,TextInput ,Easing ,Button,StyleSheet,TouchableHighlight,TouchableOpacity,ActivityIndicator,ImageBackground,Image,ScrollView,Platform,Animated} from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            navigated: this.props.navigation,
        }
    }
    render() {

        return (
          <View>
              <TouchableOpacity style={styles.btn} onPress={()=>{this.state.navigated.navigate('Profil') }}>
                  <View style={{ flexDirection:'row'}} >
                     <Material name='account-outline' size={20}  color="#000000"/>
                      <Text style={styles.btnText}> Mon compte </Text>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btn} onPress={()=>{  this.state.navigated.navigate('Mesreclamation') }}>
                     <View style={{ flexDirection:'row'}} >
                           <Material name='emoticon-sad' size={20} color="#000000" />
                           <Text style={styles.btnText}>Mes réclamation</Text>
                      </View>
             </TouchableOpacity>

             <TouchableOpacity  style={styles.btn} onPress={()=>{this.state.navigated.navigate('Information') }}>
                     <View style={{ flexDirection:'row'}} >
                           <Material name='information-outline' size={20} color="#000000" />
                           <Text style={styles.btnText}>Informatrion</Text>
                      </View>
            </TouchableOpacity>

             <TouchableOpacity style={styles.btn} onPress={()=>{this.state.navigated.navigate('Login') }}>
                 <View style={{ flexDirection:'row'}} >
                       <Material name='logout' size={20} color="#000000" />
                       <Text style={styles.btnText}>Déconnexion</Text>
                  </View>
              </TouchableOpacity>
          </View>
        );
      }
}



const styles = StyleSheet.create({
  btn:{
    height:50,
    borderBottomColor: '#b6b6b6',
    borderBottomWidth :1 ,
    paddingLeft:10 ,
    justifyContent:'center',
  },
  btnText:{
    paddingLeft:5,
    fontSize:16,
    color:'#000000'
  }

  })
