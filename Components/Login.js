import React from 'react'
import { Alert ,NetInfo,TextInput, StyleSheet, View, Text, Image , TouchableOpacity,Dimensions,ActivityIndicator } from 'react-native'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { LoginButton, AccessToken, GraphRequestManager, GraphRequest ,LoginManager  } from 'react-native-fbsdk';
import imagSlide from   '../Images/earth.png' ;
import{connect} from 'react-redux'
import{loginUser} from './../actions'
import{loginFb} from './../actions'


import { NavigationActions, withNavigation  } from 'react-navigation';

const { width } = Dimensions.get('window');

class Login extends React.Component {

  constructor(props) {
   super(props);
   //console.warn(this.props.navigation ) ;
   this.state={
               navigated: this.props.navigation,
               isConnected:true,
               email:'',
               password:'',
              }
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
     NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
   }

  handleConnectivityChange = isConnected => {
   this.setState({ isConnected });
  }

  _miniOfflineSign = () => {

  if (!this.state.isConnected) {
   return (
     <View style={styles.offlineContainer}>
       <Text style={styles.offlineText}>No Internet Connection</Text>
     </View>
   );
 }
 }


  componentWillReceiveProps(nextProps) {

            if (nextProps.user) {
              this.props.navigation.navigate('News');
            }else{
               if (nextProps.error) {
                   return (
                     Alert.alert(
                           "Erreur d'authentification",
                           'le email ou le mot de passe entré est incorrect!!',
                           [
                             {text: 'ok', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                           ],
                           { cancelable: false },
                           { onDismiss: () => {} }
                         )

                   );

               }

            }

            if (nextProps.userfb) {
              this.props.navigation.navigate('News');
            }
    }

  _onloginPressed=()=>{

    NetInfo.isConnected.fetch().then(isConnected => {
     if(!isConnected){
                this.setState({isConnected:false}) ;
       }else{

             const{ email,password } =this.state;
             this.setState({change:true}) ;
             this.props.loginUser({email,password})
       }
    })
  }

  _fbAuth = ()  => {
    NetInfo.isConnected.fetch().then(isConnected => {
     if(!isConnected){
                this.setState({isConnected:false}) ;
       }else{
             this.props.loginFb()
       }
    })
}


  _displayLoading = () => {
    if (this.props.loading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    if (this.props.loadingfb) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

/*  _fbAuth() {

      const navigate = this.props.navigation;
   //this.setState({ isLoading: true  });
  LoginManager.logInWithReadPermissions(["public_profile","email"]).then(
    function(result) {
      if (result.isCancelled) {
        //console.warn("Login cancelled");
      } else {
      //  console.warn("Login success with permissions: " + result.grantedPermissions.toString() );

        AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    let accessToken = data.accessToken;
                    //console.warn(accessToken.toString());

                    const responseInfoCallback = (error, result) => {
    setTimeout(()=>{
                      if (error) {
                      //  console.warn('1111111111'+error);
                      //  alert('Error fetching data: ' + error.toString());
                      } else {

                      //   console.warn(result);
                        // console.warn(result);
                      //  alert('222222222222 Success fetching data: ' + result.toString());

                          fetch('https://www.betroulette.net/benarous/public/api/loginfb', {
                            method: 'POST',
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              nom :result.last_name,
                              prenom:result.first_name,
                              name: result.name,
                              email: result.email,
                              facebook_id: result.id,
                            }),
                          }).then((res) => res.json())
                            .then((response) => {
//console.warn(response);
   //this.setState({ isLoading: false  });

                              console.log('Nom:'+ response.nom+' prenom:'+ response.prenom+' photo:'+ response.photo+' id Facebook:'+ response.facebook_id);
                                            let profile =  {
                                                            name: response.nom+' '+response.prenom,
                                                            photo: response.photo,
                                                            facebook_id: response.id,
                                                          } ;

                                                           navigate.navigate('News' , profile);

                                                })
                            .catch((error) => {       console.warn('error:'+ error);   });
                      }
},200)

                    }

                    const infoRequest = new GraphRequest(
                      '/me',
                      {
                        accessToken: accessToken,
                        parameters: {
                          fields: {
                            string: 'email,name,first_name,middle_name,last_name'
                          }
                        }
                      },
                      responseInfoCallback
                    );
                    // Start the graph request.
                    new GraphRequestManager().addRequest(infoRequest).start();
                  })
              }
            }, function(error) {
              console.log("Login fail with error: " + error);
        });
} */
/*_authLogin = ()=>{

  const{ username,password } =this.state;
  this.props.loginUser({username,password})

  this.setState({isLoadingLogin:true,   isLoading:true, })

  const navigate = this.props.navigation;
  fetch('https://www.betroulette.net/benarous/public/api/login', {
                            method: 'POST',
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              email: this.state.email,
                              password:this.state.password
                            })
                          }).then((res) =>res.json()).then((response) => {
                            this.setState({
                              isLoadingLogin:false,
                                isLoading:false,
                            })

                            if(response.status){
                              //console.warn(response.status);
                              Alert.alert(
                                    "Erreur d'authentification",
                                    'le email ou le mot de passe entré est incorrect!!',
                                    [
                                      {text: 'ok', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                    ],
                                    { cancelable: false },
                                    { onDismiss: () => {} }
                                  )

                            }
                            else{
                              let profile =  {
                                name: response.name,
                                email: response.email,
                              } ;
                              navigate.navigate('News' , profile);
                            }
                            //console.warn(response)

                          });
}*/

  render() {
       const {navigate} = this.props.navigation;
    return (
      <View  style={{flex:1}}>
        {this._miniOfflineSign()}
        {this._displayLoading()}

         <View style={{flex:1 }} >
            <View  style={{itemContent:'center',alignItems:'center',marginTop:50}} >
              <Image   style={styles.image}   source={{uri:'https://www.betroulette.net/benarous/public/upload/appliactionmobile/earth.png'}}  />
            </View>

         </View>

          <View style={{flex:3,   justifyContent: 'space-evenly',}} >
            <View style={{ marginLeft:20,marginRight:20,flexDirection:'row',alignItems:'center'}}>
                  <Material name='email-outline' size={20} />
                  <TextInput
                        style={styles.Input}
                        placeholder="Login"
                      /*  placeholderTextColor="#000"*/
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                   />
              </View>


          <View style={{ marginLeft:20,marginRight:20,flexDirection:'row',alignItems:'center'}}>
            <Material name='lock-outline' size={20}  />
             <TextInput
                   style={styles.Input}
                   placeholder="Password"
                   secureTextEntry={true}
                  /* placeholderTextColor="#000"*/
                   onChangeText={(password) => this.setState({password})}
                   value={this.state.password}
              />
           </View>



           <TouchableOpacity   style={styles.btn} onPress={this._onloginPressed}>
             <Text style={styles.btnText}>
                  S'authentifier
             </Text>
           </TouchableOpacity>

           <TouchableOpacity   onPress={this._fbAuth.bind(this) }  style={styles.btnf}  >
              <Text style={styles.btnTextf }>
                S'authentifier avec Facebook
              </Text>
           </TouchableOpacity>

           <TouchableOpacity   onPress={() => this.props.navigation.navigate('Register')}    style={styles.btnc}>
             <Text style={styles.btnTextc}>
               Créer un compte
             </Text>
           </TouchableOpacity>

           <TouchableOpacity   onPress={() => this.props.navigation.navigate('Reset')}    style={styles.btnd} >
             <Text style={styles.btnTextd}>
               Mot de passe oublié ?
             </Text>
           </TouchableOpacity>

        </View>

      </View>
    );
  }
};

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
export default connect(mapStateToProps,{loginUser,loginFb})(Login)

const styles = StyleSheet.create({
  loading_container: {
    backgroundColor:'#6A9E9D',
    position: 'absolute',
    zIndex: 1 ,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    opacity:0.3
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

  btn:{
    borderRadius:25,
    height:50,
    marginLeft:30,
    marginRight:30,
    borderColor: '#000000',
    borderWidth: 1,
    alignItems:'center',
    justifyContent:'center',
  },
    btnf:{
      borderRadius:25,
      height:50,
      marginLeft:30,
      marginRight:30,
      backgroundColor:'#4267b2',
      alignItems:'center',
      justifyContent:'center',
    },
      btnc:{
        borderRadius:25,
        height:50,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#76D7C4',
        alignItems:'center',
        justifyContent:'center',
      },  btnd:{

          marginLeft:30,
          marginRight:30,
          alignItems:'center',
          justifyContent:'center',
        },
    btnTextf:{
      fontSize:16,
      color:'white'
    },
    btnTextc:{
      fontSize:16,
      color:'white'
    },
    btnTextd:{
      fontSize:16,
      color:'#76D7C4'

    },
  btnText:{
    fontSize:16,
    color:'#000000'
  },image: {
    height: 120,
      width: 120,
  },
   offlineContainer: {
      backgroundColor: '#b52424',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width:width,
      position: 'absolute',
      top:0,
      zIndex:999,
    },
    offlineText: {
      color: '#fff'
    }

  })
