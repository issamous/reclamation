import React from 'react'
import {Alert,Text, cropImage,Dimensions, View ,TextInput ,Easing ,Button,StyleSheet,TouchableHighlight,TouchableOpacity,ActivityIndicator,ImageBackground,Image,ScrollView,Platform,Animated} from 'react-native';
import pick1 from '../Images/1.png';
import pick2 from '../Images/2.png';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

class MesreclamationItem extends React.Component {
    constructor(props) {
        super(props);
        //console.warn(this.props.user);
        this.state = {
          reclamation: this.props.reclamation
        }
    }

    render() {
            const { reclamation } = this.props
            let imgpick;
            if(this.state.reclamation.type == 1 ) {
                imgpick =  {uri:'https://www.betroulette.net/benarous/public/upload/appliactionmobile/1.png'} ;
            }else {
                imgpick =   {uri:'https://www.betroulette.net/benarous/public/upload/appliactionmobile/2.png'} ;
            }

        return (
          <View>
          <TouchableOpacity>
             <View style={{height:80,  backgroundColor:'#ffffff',borderBottomColor:"#0000",borderBottomWidth:2, marginLeft:5,marginRight:5, marginBottom:5,borderRadius:5}}>
               <View style={{flexDirection:'row',paddingTop:10,paddingLeft:10,paddingRight:10,alignItems:'center' }}>

               <View style={{flex:1 }} >
              <Image   style={ {width:25,height:25,borderRadius:25}}    source={imgpick} />

              </View>

              <View style={{flex:5 ,justifyContent:'flex-start' ,textAlign:'left'}}>
                 <Text  style={{color:'black'  }} >Une Réclamation</Text >
              </View>

                  <TouchableOpacity    style={{ flex:2 , borderColor:'#000000' , flexDirection:'row', borderWidth: 0.5 ,borderRadius:5,alignItems:'center',justifyContent:'center' ,height:25}}>
                      <Material name='clock-outline' size={8}  color= '#000'/>
                      <Text style={{color:'black' ,fontSize:10,paddingLeft:5,textAlign:'center'   }}> en attente </Text>
                  </TouchableOpacity>

               </View>

            <View style={{position:"absolute" , bottom:10, left:10 }}>
                  <View style={{flexDirection:'row' }}>
                    <Material name='map-marker-outline' size={12}  color= '#000' style={{bottom:0   }} />
                    <Text style={{color:'black',bottom:0  ,fontSize:10 }}>{ reclamation.adresse }</Text>
                  </View>
              </View>


                 <View style={{position:"absolute" , bottom:10, right:10  }}>
                   <Text style={{color:'#808080',fontSize:7,textAlign:'right'}}> { reclamation.dates } </Text>
                 </View>

            </View>
          </TouchableOpacity>
          </View>
        );
      }
}


export default MesreclamationItem
