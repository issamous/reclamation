import React from 'react'
import { alert ,TextInput, StyleSheet, View, Text, Image , TouchableOpacity,Dimensions,ActivityIndicator } from 'react-native'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { LoginButton, AccessToken, GraphRequestManager, GraphRequest ,LoginManager  } from 'react-native-fbsdk';
import imagSlide from   '../Images/earth.png' ;

import { NavigationActions, withNavigation  } from 'react-navigation';

export default class Login extends React.Component {

  constructor(props) {
   super(props);
   //console.warn(this.props.navigation ) ;
   this.state={
               navigated: this.props.navigation,
               isLoading: false,
              }
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

 _fbAuth() {

      const navigate = this.props.navigation;
   this.setState({ isLoading: true  });
  LoginManager.logInWithReadPermissions(["public_profile","email"]).then(
    function(result) {
      if (result.isCancelled) {
        console.log("Login cancelled");
      } else {
        console.log("Login success with permissions: " + result.grantedPermissions.toString() );

        AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    let accessToken = data.accessToken;
                    console.log(accessToken.toString());

                    const responseInfoCallback = (error, result) => {
    setTimeout(()=>{
                      if (error) {
                        console.log('1111111111'+error);
                      //  alert('Error fetching data: ' + error.toString());
                      } else {

                         console.log(result);
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
                            .catch((error) => {       console.log('error:'+ error);   });
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
}

  render() {
       const {navigate} = this.props.navigation;
    return (
      <View  style={{flex:1}}>
  {this._displayLoading()}
         <View style={{flex:2 ,backgroundColor:'#caece5'}} >
            <View  style={{flex:1,itemContent:'center',alignItems:'center',marginTop:50}} >
              <Image   style={styles.image}   source={imagSlide}  />
            </View>
         </View>

          <View style={{flex:3,   justifyContent: 'space-evenly',}} >
            <View style={{ marginLeft:20,marginRight:20,flexDirection:'row',alignItems:'center'}}>
                  <Material name='email-outline' size={20} />
                  <TextInput
                        style={styles.Input}
                        placeholder="Login"
                      /*  placeholderTextColor="#000"
                        onChangeText={(login) => this.setState({login})}
                        value={this.state.login}*/
                   />
              </View>

          <View style={{ marginLeft:20,marginRight:20,flexDirection:'row',alignItems:'center'}}>
            <Material name='lock-outline' size={20}  />
             <TextInput
                   style={styles.Input}
                   placeholder="Password"
                  /* placeholderTextColor="#000"
                   onChangeText={(password) => this.setState({password})}
                   value={this.state.password}*/
              />
           </View>
           <TouchableOpacity   style={styles.btn} >
              <Text style={styles.btnText}>
               S'authentifier
              </Text>
           </TouchableOpacity>

           <TouchableOpacity onPress={this._fbAuth.bind(this) }      style={styles.btnf}  >

              <Text style={styles.btnTextf }>
                S'authentifier avec Facebook
              </Text>
           </TouchableOpacity>
           <TouchableOpacity   onPress={() => this.props.navigation.navigate('Register')}    style={styles.btnc}>
             <Text style={styles.btnTextc}>
               Créer un compte
             </Text>
           </TouchableOpacity>


        </View>

      </View>
    );
  }
};



const styles = StyleSheet.create({
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 200,
    //backgroundColor:'red',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
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
      },
    btnTextf:{
      fontSize:16,
      color:'white'
    },
    btnTextc:{
      fontSize:16,
      color:'white'
    },
  btnText:{
    fontSize:16,
    color:'#000000'
  },image: {
    //height: 250,
  }

  })
