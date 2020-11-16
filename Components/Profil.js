import React from 'react'
import{connect} from 'react-redux'
import {Alert,Text, cropImage,Dimensions, View ,TextInput ,Easing ,Button,StyleSheet,TouchableHighlight,TouchableOpacity,ActivityIndicator,ImageBackground,Image,ScrollView,Platform,Animated} from 'react-native';
import{loginUser} from './../actions'
import{loginFb} from './../actions'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

class Profil extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          nom: (this.props.user.nom) ? this.props.user.nom : this.props.userfb.nom  ,
          prenom:(this.props.user.prenom) ? this.props.user.prenom : this.props.userfb.prenom ,
        }

        if(this.props.user) {
            if(this.props.user.photo.length == 0 )    {  this.state.photo = 'https://pickaface.net/gallery/avatar/unr_xxxxdddxxxx_190111_2125_w2q3o.png';  }
            else{  this.state.photo = this.props.user.photo; }
        }

        if(this.props.userfb) {

          this.state.photo = 'https://graph.facebook.com/v3.2/'+this.props.userfb.facebook_id+'/picture?type=large';
        }

    }


    render() {

        return (
          <View  style={{flex:1}}>


          <View style={{flex:2 ,alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity     style={styles.btn_add_Photo}>
              <View >
              <Image
                 style={ {width:100,height:100,borderRadius:100}}
                 source={{uri:this.state.photo }}
              />

              </View>
            </TouchableOpacity>
          </View>

          <View style={{flex:3, }} >
              <View>
                  <View style={{ marginLeft:20,marginRight:20,flexDirection:'row',alignItems:'center'}}>
                        <Material name='account' size={20} />
                        <TextInput
                              style={styles.Input}
                              editable={false}
                              placeholder="Nom"
                              editable={false}
                            //  onChangeText={(nom) => this.setState({nom})}
                              value={this.state.nom}
                         />
                     </View>
                </View>

              <View>
                <View style={{ marginLeft:20,marginRight:20,flexDirection:'row',alignItems:'center'}}>
                      <Material name='account' size={20} />
                      <TextInput
                            style={styles.Input}
                            editable={false}
                            placeholder="Prénom"
                          //  onChangeText={(prenom) => this.setState({prenom})}
                            value={this.state.prenom}
                       />
                  </View>
              </View>
            </View>

          </View>
        );
      }

}

const styles = StyleSheet.create({
  btn_add_Photo:{
    alignItems:'center',
    justifyContent:'center',
    height:100,
    width:100,
    backgroundColor:'rgb(211,211,211)',
    borderRadius:50,
  },
  Input:{
    flex:6,
    borderColor: '#000000',
    borderBottomWidth:1,
    height:40,
    marginLeft:20,
    marginRight:20,
    color: '#000',
  },
  btnc:{
    borderRadius:25,
    height:50,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#76D7C4',
    alignItems:'center',
    justifyContent:'center',
  },
  btn:{
    borderRadius:25,
    height:40,

    marginLeft:20,
    marginRight:20,
    backgroundColor:'#76D7C4',
    borderWidth: 1,
    alignItems:'center',
    justifyContent:'center',
  },
  btnText:{
    fontSize:16,
    color:'#ffffff'
  },image: {
    height: 200,
  },
  error:{
    color:'red',
    marginLeft:0,
  },
  btnf:{
    marginTop:15,
    borderRadius:25,
    height:50,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#4267b2',
    alignItems:'center',
    justifyContent:'center',
  },
  btnTextf:{

    fontSize:16,
    color:'white'
  },
  })


  const mapStateToProps =state =>{
  	return{
  		error :state.auth.error ,
  		loading :state.auth.loading,
  		user:state.auth.user,

      errorfb :state.authfb.error ,
      loadingfb :state.authfb.loading,
      userfb:state.authfb.user,
  		}
  }
  export default connect(mapStateToProps,{loginUser,loginFb})(Profil)
