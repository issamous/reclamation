import React from 'react';
import {Alert,Text, cropImage,Dimensions, View ,TextInput ,Easing ,Button,StyleSheet,TouchableOpacity,ActivityIndicator,ImageBackground,Image,ScrollView,Platform,Animated} from 'react-native';
import ImagePicker from 'react-native-image-picker'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

import RNFetchBlob from 'rn-fetch-blob'
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
const { width, height } = Dimensions.get('window');

export default class Reclamation extends React.Component {
  constructor(props, context) {
     super(props, context);
     this.state={
       heightBox: new Animated.Value(50),
       iconBox:new Animated.Value(0),
       reclamation:null,
       photos:[],
       isLoading:false,
       isLoadingMap:false,
       Images:[],
       address:null,
       region: {
       latitude: 36.875466,
       longitude: 10.2943692,
       latitudeDelta: 0.0922,
       longitudeDelta: 0.0421,
     },
     }
      this._photoClicked = this._photoClicked.bind(this)
   }


  _displayBox = () =>{
    Animated.timing(
      this.state.heightBox,
      {
        toValue: 200,
        duration: 300, // Le temps est en milliseconds ici (3000ms = 3sec)
       easing: Easing.ease,
      }
    ).start()
    Animated.timing(
      this.state.iconBox,
      {
        toValue: 1,
        duration: 300, // Le temps est en milliseconds ici (3000ms = 3sec)

      }
    ).start()
  }

   _displayLoading=() => {
     if (this.state.isLoading) {
       return (
         <View style={{  justifyContent:'center',alignItems:'center',}}>
           <ActivityIndicator size='large' />
         </View>
       )
     }
   }
      _suppresionPhoto(key){
        console.log(key)
        var tab=this.state.photos.slice(0).reverse()
        console.log(tab)
        console.log('_____________||___________________')
        var res = tab[key];
          console.log(res)
        if(res!==undefined){
          console.log(res)
console.log('------- Tab-----------');
            console.log(tab)
  console.log('------- Tab-----------');
         tab.splice(key,1);
        console.log('-------New Tab-----------');
            console.log(tab)
            console.log('-----End New Tab--------------');
          this.setState({
            photos:tab.slice(0).reverse()
          })
            console.log(this.state.photos)
        }

      }

   _photo(){

       console.log('Photossss : ' )
       return (this.state.photos.slice(0).reverse().map((photo,index) => (
          <TouchableOpacity  key={photo.key} onPress={()=>Alert.alert(
                'Suppresion'+index,
                'Vous voulez supprimer cette photo!!',
                [
                  {text: '', onPress: () => console.log('Ask me later pressed')},
                  {text: 'Annuler', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'Supprimer', onPress: () => this._suppresionPhoto(index)},
                ],
                { cancelable: false },
                { onDismiss: () => {} }
              )
                }>

          <Image
            key={photo.uri}
            source={{ uri: photo.uri }}
            style={{ width: 100, height: 100 ,marginLeft:5,marginRight:5,borderRadius:5}}

          />
          </TouchableOpacity>
        )))
     }
  /* handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photos: response })
      }
    })
  }*/
   _photoClicked() {
     console.log('L\'utilisateur a annulé')
     this.setState({
       isLoading: true
     })

       ImagePicker.showImagePicker({}, (response) => {
         if (response.didCancel) {
           console.log('L\'utilisateur a annulé')
           this.setState({
             isLoading: false,
           })
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
           console.warn(this.state.Images.length);
           this.setState(
             state => ({
          photos: [...state.photos, response],
          isLoading: false,
          Images:[...state.Images,{ "name" : 'filename['+this.state.Images.length+']', "type"  : response.type , "filename" : response.fileName, "data":RNFetchBlob.wrap(response.uri) } ]

        })
             )
             console.log(this.state.photos)         }
       })
   }


   uploadImage = ()=> {
console.warn("11111111");

/*this.state.photos.forEach((item, i) => {
this.state.Images.push({ "name" : item.fileName, "type"  : item.type , "filename" : item.fileName, "data":item.data })
}
)*/

 console.warn(this.state.Images)
   RNFetchBlob.fetch('POST', 'https://www.betroulette.net/benarous/public/api/upload', {
     Authorization : "Bearer access-token",
     otherHeader : "foo",
        'Content-Type' : 'octet-stream'
     },
       // element with property `filename` will be transformed into `file` in form data
          this.state.Images
     )
     // listen to upload progress event
     .uploadProgress({ interval : 250 },(written, total) => {
       console.log('uploaded', written / total)
   })
   // listen to download progress event, every 10%
   .progress({ count : 10 }, (received, total) => {
       console.log('progress', received / total)
   })

     .then((resp) => {
       console.warn(resp.data);
       alert('your image22222 uploaded successfully');

     }).catch((err) => {
     console.warn(err);
  })

    }
    
    onRegionChange = (region) => {
        this.setState({isLoadingMap:true})
      const NY = {
        lat: this.state.region.latitude,
        lng: this.state.region.longitude
      };
         var adress="" ;
      this.setState({ region : region});
      Geocoder.geocodePosition(NY).then(res => {
        console.warn(res);

         if(res[0].streetName == "null") {
                    if (res[0].locality == null) { adress =  "Tunis ("+res[0].position.lng+","+res[0].position.lat+")" ;}
                    else{  adress =  res[0].locality+" ("+res[0].position.lng+","+res[0].position.lat+")" ;  }
                 }
        else   if(res[0].streetName == "Unnamed Road")  {

                    if (res[0].locality == null ) { adress =  "Tunisie ("+res[0].position.lng+","+res[0].position.lat+")" ;}
                    else{  adress =   res[0].locality+" ("+res[0].position.lng+","+res[0].position.lat+")" ;  }
                }
        else {  adress =res[0].formattedAddress ;}

          this.setState({address:adress})
          this.setState({isLoadingMap:false})
          // res is an Array of geocoding object (see below)
      }).catch(err => console.warn(err))
    }


    _displayLoadingMap() {
      if (this.state.isLoadingMap) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='small' />
          </View>
        )
      }
      else{
        return (
        <Text style={styles.textAdd} >
            {this.state.address}
        </Text>
      )
      }
    }

  render() {

const { photos } = this.state
const rotation = this.state.iconBox.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '180deg']
})
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          initialRegion={this.state.region}
          onRegionChangeComplete={this.onRegionChange}  >
              <MapView.Marker
                  coordinate={this.state.region}
                  title={"title"}
                  description={"description"}
                  opacity={0.0}
               >
            </MapView.Marker>
       </MapView>

   <View  style={styles.info}>
      <View  style={styles.adress}>
        {this._displayLoadingMap()}
      </View>

      <Image
        style={styles.pointeur}
        source={require('../Images/pointeur.png')}
      />
  </View>
      <Animated.View  style={{position: 'absolute',
      backgroundColor:'white',
      bottom:0,
      height:this.state.heightBox,
      alignItems:'center',
      paddingTop:10,
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      width:width}}>
      <TouchableOpacity onPress={this._displayBox}>

        <Animated.View  style={{transform: [{ rotate:rotation}] }}>
          <Material name='apple-keyboard-control' size={24}  color= '#000'/>
        </Animated.View>
      </TouchableOpacity>
      <ScrollView horizontal={true}  style={{marginTop:20,}}>
      <TouchableOpacity>
        <View style={{width:width/2,height:100,  backgroundColor:'#D3D3D3', marginLeft:10,marginRight:10,borderRadius:5}}>
          <Text style={{color:'white'}}>+</Text>
        </View >
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={{width:width/2,height:100,  backgroundColor:'#D3D3D3', marginLeft:10,marginRight:10,borderRadius:5}}>
          <Text style={{color:'white'}}>+</Text>
        </View >
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={{width:width/2,height:100,  backgroundColor:'#D3D3D3', marginLeft:10,marginRight:10,borderRadius:5}}>
          <Text style={{color:'white'}}>+</Text>
        </View >
      </TouchableOpacity>
      </ScrollView>

      </Animated.View>

        <View  style={styles.btnAdd}>
          <Material name='plus' size={24}  color= '#fff'    />
        </View >

      </View>


    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex:1,
    //backgroundColor:'#5b53d3',
  },
  bg:{
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  Input:{
    height: 40,
    borderColor: '#ffffff',
    borderWidth: 1,
    marginLeft:20,
    marginRight:20,
    marginTop:10,
    paddingLeft:15,
    borderRadius:5,
    color: '#ffffff',

  },
  photo:{
    margin:20,
    height:50,
    backgroundColor:'white',
    justifyContent: "center",
    borderRadius:5,
    alignItems: 'center',
  },
  photoRec:{
    marginLeft:20,
    marginRight:20,
    width:150,
    height:150,
    justifyContent:'center',
    alignItems:'center',
  },
  textArea: {
    justifyContent: "flex-start",
    borderColor: '#ffffff',
    borderWidth: 1,
    marginLeft:20,
    marginRight:20,
    marginTop:10,
    paddingLeft:15,
    borderRadius:5,
    color: '#ffffff',
  },
  button: {
    justifyContent: "center",
    borderColor: '#ffffff',
    borderWidth: 1,
    marginLeft:20,
    marginRight:20,
    marginTop:10,
    borderRadius:5,
    color:'white',
    height:75,
    backgroundColor:'white',
    alignItems: 'center',
  },
  buttonText:{
      color:'#5b53d3',

  }
,
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
adress:{
    backgroundColor:'#FFFFFF',
    paddingLeft:10,
    paddingRight:10,
    height:40,
    borderRadius:50,
    justifyContent:'center',
    alignItems: 'center',
    opacity: 1,
    fontWeight:'bold',
    fontSize:12,
},
info:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  bottom:28,

},
pointeur:{
},
btnAdd:{
    position: 'absolute',
    backgroundColor:'#5b53d3',
    color:'white',
    bottom:5,
    right:5,
    width:60,
    height:60,
    borderRadius:50,
    justifyContent:'center',
    alignItems: 'center',
    opacity: 0.9,
    fontWeight:'bold',
    fontSize:15,
},
barre:{
  position: 'absolute',
  backgroundColor:'red',
  bottom:5,
  height:10,
  width:500,
  right:5,
},
textAdd:{
  fontWeight:'bold',
  fontSize:15,
},
loading_container: {
  left: 0,
  right: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center'
}



  })
