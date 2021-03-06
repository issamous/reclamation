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
       data:[],
       msgNom:'',
       msgPreom:'',
       msgEmail:'',
       msgPassword:'',
       nom:'',
       prenom:'',
       email:'',
       password:'',
       photo:'',
      isLoading: false
     }
   }

  _envoyer= () => {

    if(this.state.nom =='' ||  this.state.password == '' || this.state.email =='' || this.state.prenom ==''){

                if(this.state.nom ==''){
                  this.setState({msgNom:'le champ nom est obligatoire '})
                }else{
                  this.setState({msgNom:''})
                }

                if(this.state.prenom ==''){
                  this.setState({msgPreom:'le champ prénom est obligatoire '})
                }else{
                  this.setState({msgPreom:''})
                }

                if(this.state.email ==''){
                      this.setState({msgEmail:'le champ Email est obligatoire '})
                }else{
                  this.setState({msgEmail:''})
                }

                if(this.state.password ==''){
                      this.setState({msgPassword:'le champ Mot de passe est obligatoire '})
                }else{
                  this.setState({msgPassword:''})
                }

      }else{

        this.state.data.push(
        { name :'nom', data :"'"+this.state.nom+"'"},
        { name :'prenom', data :"'"+this.state.prenom+"'"},
        { name :'email', data :"'"+this.state.email+"'"},
        { name :'password', data :"'"+this.state.password+"'"})
        console.warn(this.state.data);
         this._storeData();

      }
   }
  _photoClicked= () => {
    console.log('L\'utilisateur a annulé')


      ImagePicker.showImagePicker({}, (response) => {
        if (response.didCancel) {
          console.log('L\'utilisateur a annulé')
        }
        else if (response.error) {
          console.log('Erreur : ', response.error)
          this.setState({
            isLoading: false
          })
        }
        else {
          console.log('Photo : ', response.uri )
          let requireSource = { uri: response.uri }
          this.setState(
            state => ({
         data: [...state.data,{ "name" : 'filename[0]', "type"  : response.type , "filename" : response.fileName, "data":RNFetchBlob.wrap(response.uri)} ],
         photo:response.uri,

       })
            )
             }
      })
  }
  _imageUser= () =>{
    if (this.state.photo=='') {
      return (
        <View style={{alignItems:'center',marginTop:10}}>
        <TouchableOpacity onPress={this._photoClicked}     style={styles.btn_add_Photo}>
          <View >
              <Material name='plus' color={'white'} size={25} />
          </View>

        </TouchableOpacity>
          <Text>
            Ajouter votre image
          </Text>
        </View>
      )
    }
    else{
      return (
        <View style={{alignItems:'center',marginTop:10}}>
        <TouchableOpacity onPress={this._photoClicked}     style={styles.btn_add_Photo}>
          <View >
          <Image
        style={{width: 80, height: 80,borderRadius:50}}
        source={{uri:this.state.photo}}
      />
          </View>

        </TouchableOpacity>

        </View>
      )
    }

  }
  _storeData= ()=> {

/*this.state.photos.forEach((item, i) => {
this.state.Images.push({ "name" : item.fileName, "type"  : item.type , "filename" : item.fileName, "data":item.data })
}
)*/
    const navigate = this.props.navigation;
  RNFetchBlob.fetch('POST', 'https://www.betroulette.net/benarous/public/api/register', {
    Authorization : "Bearer access-token",
    otherHeader : "foo",
    'Content-Type' : 'multipart/form-data'
    },
      // element with property `filename` will be transformed into `file` in form data
         this.state.data
    )
    // listen to upload progress event
    .uploadProgress({ interval : 250 },(written, total) => {

      //console.warn('uploaded', 100*written / total)
  })
  // listen to download progress event, every 10%
  .progress({ count : 10 }, (received, total) => {
      console.log('progress', received / total)
  })

    .then((resp) => {

       alert(resp.data);

       let profile =  {
         name:  this.state.nom,
         email: this.state.email,
       } ;
       navigate.navigate('News' , profile);


    }).catch((err) => {
      console.warn(err);
 })

   }

  _fbAuth() {

    const navigate = this.props.navigation;
 this.setState({ isLoading: true  });
LoginManager.logInWithReadPermissions(["public_profile","email"]).then(
  function(result) {
    if (result.isCancelled) {
      console.warn("Login cancelled");
    } else {
      console.warn("Login success with permissions: " + result.grantedPermissions.toString() );

      AccessToken.getCurrentAccessToken().then(
                (data) => {
                  let accessToken = data.accessToken;
                  console.warn(accessToken.toString());

                  const responseInfoCallback = (error, result) => {
  setTimeout(()=>{
                    if (error) {
                      console.warn('1111111111'+error);
                    //  alert('Error fetching data: ' + error.toString());
                    } else {

                       console.warn(result);
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
}

  render() {
    return (
      <View  style={{flex:1}}>
      <TouchableOpacity onPress={this._fbAuth.bind(this) }      style={styles.btnf}  >

      <Text style={styles.btnTextf }>
        S'authentifier avec Facebook
      </Text>
      </TouchableOpacity>
        {this._imageUser()}
          <View style={{flex:3,  justifyContent: 'space-evenly',}} >
          <View>
              <View style={{ marginLeft:20,marginRight:20,flexDirection:'row',alignItems:'center'}}>
                    <Material name='account' size={20} />
                    <TextInput
                          style={styles.Input}
                          placeholder="Nom"
                          onChangeText={(nom) => this.setState({nom})}
                          value={this.state.nom}
                     />
                 </View>
                 <View style={{ marginLeft:60,marginTop:5,bottom:0}}>
                    <Text style={styles.error} >{this.state.msgNom}</Text>
                </View>
            </View>

          <View>
            <View style={{ marginLeft:20,marginRight:20,flexDirection:'row',alignItems:'center'}}>
                  <Material name='account' size={20} />
                  <TextInput
                        style={styles.Input}
                        placeholder="Prénom"
                        onChangeText={(prenom) => this.setState({prenom})}
                        value={this.state.prenom}
                   />
              </View>
              <View style={{ marginLeft:60,marginTop:5,bottom:0}}>
                  <Text style={styles.error} >{this.state.msgPreom}</Text>
              </View>
          </View>

          <View>
            <View style={{ marginLeft:20,marginRight:20,flexDirection:'row',alignItems:'center'}}>
                  <Material name='email-outline' size={20} />
                  <TextInput
                        style={styles.Input}
                        placeholder="Email"
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                   />
              </View>
                  <View style={{ marginLeft:60,marginTop:5,bottom:0}}>
                      <Text style={styles.error} >{this.state.msgEmail}</Text>
                  </View>
          </View>

          <View>
              <View style={{ marginLeft:20,marginRight:20,flexDirection:'row',alignItems:'center'}}>
                <Material name='lock-outline' size={20}  />
                 <TextInput
                       style={styles.Input}
                       placeholder="Password"
                       secureTextEntry={true}
                      onChangeText={(password) => this.setState({password})}
                  />
              </View>
              <View style={{ marginLeft:60,marginTop:5,bottom:0}}>
                    <Text style={styles.error} >{this.state.msgPassword}</Text>
              </View>
          </View>

           <TouchableOpacity  onPress={this._envoyer}    style={styles.btnc}>
             <Text style={styles.btnText}>
              Continuer à l'application
             </Text>
           </TouchableOpacity>

        </View>

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
