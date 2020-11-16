import React from 'react'
import {Alert,Text, cropImage,Dimensions, View ,TextInput ,Easing ,Button,StyleSheet,TouchableHighlight,TouchableOpacity,ActivityIndicator,ImageBackground,Image,ScrollView,Platform,Animated} from 'react-native';
import ImagePicker from 'react-native-image-picker'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFetchBlob from 'rn-fetch-blob'
import { LoginButton, AccessToken, GraphRequestManager, GraphRequest ,LoginManager  } from 'react-native-fbsdk';
export default class Login extends React.Component {
  constructor(props, context) {
     super(props, context);
     this.state={
       email:'',
       msgEmail:'',
       isLoading: false
     }
   }
   _ResetPassword = ()=>{
    this.setState({
      isLoadingLogin:true,
    })
    const navigate = this.props.navigation;
    fetch('https://www.betroulette.net/benarous/public/api/password/reset', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                email: this.state.email,
                              })
                            }).then((res) =>res.json()).then((response) => {
                                response
                                //console.warn(response)
                              //console.warn(response)
                            });
  }
  _envoyer= () => {
    console.warn('hello')
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(this.state.email) === false)
        {
            this.setState({msgEmail:' Email  '})
        }
    if( this.state.email =='' ){
                if(this.state.email ==''){
                      this.setState({msgEmail:'le champ Email est obligatoire '})
                }else{
                  this.setState({msgEmail:''})
                }
      }else{
         this._ResetPassword();

      }
   }

  render() {
    return (
      <View>
        <TextInput
                        style={styles.Input}
                        placeholder="Login"
                      /* placeholderTextColor="#000"*/
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
        />
         <View style={{ marginLeft:60,marginTop:5,bottom:0}}>
            <Text style={styles.error} >{this.state.msgEmail}</Text>
        </View>
        <TouchableOpacity   onPress={this._envoyer}    style={styles.btnc}>
             <Text style={styles.btnText}>
             Envoyer mot de passe
             </Text>
           </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  btn_add_Photo:{
    alignItems:'center',
    justifyContent:'center',
    height:80,
    width:80,
    backgroundColor:'rgb(211,211,211)',
    borderRadius:50,
  },
  Input:{

    marginTop:40,
    borderColor: '#000000',
    borderBottomWidth:1,
    height:40,
    marginLeft:20,
    marginRight:20,
    color: '#000',
  },
  btnc:{
    borderRadius:25,
    marginTop:20,
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
