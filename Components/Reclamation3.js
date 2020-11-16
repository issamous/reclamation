import React from 'react';
import {Alert,Text, cropImage,Dimensions, View ,TextInput ,Easing ,Button,StyleSheet,TouchableHighlight,TouchableOpacity,ActivityIndicator,ImageBackground,Image,ScrollView,Platform,Animated} from 'react-native';
import ImagePicker from 'react-native-image-picker'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
//import axios from 'axios'
import RNFetchBlob from 'rn-fetch-blob'
import MapView ,  { PROVIDER_GOOGLE }   from 'react-native-maps';
import Modal from 'react-native-modalbox';
import Geocoder from 'react-native-geocoder';
const { width, height } = Dimensions.get('window');
var i=0;
export default class Reclamation extends React.Component {

  constructor(props, context) {
     super(props, context);
     this.state={
       reclamBoxShow:false,
       reclamationbox:[],
       markers:[],
       isOpen: false,
       isrec: false,
       etape:1,
       opactyinfo:0,
       openEtapeAnim2:false,
       isDisplayBoxEtape2:false,
       isDisplayBoxEtape:false,
       isDisplayBox:true,
       isDisabled: true,
       heightBox: new Animated.Value(60),
       iconBox:new Animated.Value(0),
       openEtape:false,
       openEtape2:false,
       open:false,
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

  _modalReclamation=()=>{
    this.setState({isOpen:true})
  }

  /******************Function Etap 2 **********************/

  _RetourEtape_2= () =>{
    //  this.setState({isDisplayBox:true,isDisplayBoxEtape:false,isrec:false,opactyinfo:0 ,heightBox: new Animated.Value(200),})

      this.setState({ etape:1,
                      isrec:true,
                      isDisplayBoxEtape:false ,
                      isDisplayBoxEtape2:false,
                      openEtapeAnim2:false,
                      openEtape2:false,
                      isOpen: false ,
                      isrec:true,
                      opactyinfo:1,
                      isDisplayBox:false,
                      isDisplayBoxEtape:true,
                      heightBox: new Animated.Value(150)})
  }
  _animationBoxEtape_2 = () =>{
    this.state.openEtapeAnim2=!this.state.openEtapeAnim2
    if(!this.state.openEtapeAnim2){
      Animated.timing(
        this.state.heightBox,
        {
          toValue: 250,
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
    else{
      Animated.timing(
        this.state.heightBox,
        {
          toValue: 40,
          duration: 300, // Le temps est en milliseconds ici (3000ms = 3sec)
         easing: Easing.ease,
        }
      ).start()
      Animated.timing(
        this.state.iconBox,
        {
          toValue: 0,
          duration: 300, // Le temps est en milliseconds ici (3000ms = 3sec)

        }
      ).start( )
    }
  }
  _diplayBoxEtape_2 = () =>{


      const rotation = this.state.iconBox.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
      })
      if(this.state.isDisplayBoxEtape2 && this.state.etape ==2){
        if(!this.state.openEtape2){

          this.setState({
            openEtape2:true
          })
          Animated.timing(
            this.state.heightBox,
            {
              toValue: 250,
              delay: 300,
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
      return (
         <Animated.View  style={{position: 'absolute',
         backgroundColor:'white',
         bottom:0,
         height:this.state.heightBox,
         paddingTop:10,
         borderTopLeftRadius:20,
         borderTopRightRadius:20,
         width:width}}>
             <TouchableOpacity onPress={this._animationBoxEtape_2}>

               <Animated.View  style={{transform: [{ rotate:rotation}] ,width:width, alignItems:'center',}}>
                 <Material name='apple-keyboard-control' size={24}  color= '#000'/>
               </Animated.View>

             </TouchableOpacity  >
             <TouchableOpacity  onPress={this._RetourEtape_2} style={{width:50}}>
               <View style={{paddingLeft:10}}>
                 <Material name='arrow-left' size={24}  color= '#5d2789'/>
               </View>
                </TouchableOpacity>
               <View style={{alignItems:'center'}} >
               <ScrollView  horizontal={true} >
                 {this._displayLoading()}
                 {this._photo()}
               </ScrollView>
               </View>
         </Animated.View>
       )
     }
    }

/****************** Fin FunctionEtap 2 **********************/

 /******************Function Etap 1 **********************/
  _RetourEtape_1 = () =>
  {
      this.setState({
        isDisplayBox:true,isDisplayBoxEtape:false,isrec:false,opactyinfo:0 ,heightBox: new Animated.Value(200)
      })
   }
  _animationBoxEtape_1 = () =>{
    if(this.state.openEtape){

      this.setState({
        openEtape:false
      })
      Animated.timing(
        this.state.heightBox,
        {
          toValue: 150,
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
    else{
      this.setState({
        openEtape:true
      })
      Animated.timing(
        this.state.heightBox,
        {
          toValue: 40,
          duration: 300, // Le temps est en milliseconds ici (3000ms = 3sec)
         easing: Easing.ease,
        }
      ).start()
      Animated.timing(
        this.state.iconBox,
        {
          toValue: 0,
          duration: 300, // Le temps est en milliseconds ici (3000ms = 3sec)

        }
      ).start( )
    }
  }
  _diplayBoxEtape_1 = () =>{
      const rotation = this.state.iconBox.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
      })
      if(this.state.isDisplayBoxEtape && this.state.etape ==1){

        if(!this.state.open){
          this.setState({
            open:true
          })
          Animated.timing(
            this.state.heightBox,
            {
              toValue: 150,
              delay: 300,
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
      return (
         <Animated.View  style={{position: 'absolute',
         backgroundColor:'white',
         bottom:0,
         height:this.state.heightBox,
         paddingTop:10,
         borderTopLeftRadius:20,
         borderTopRightRadius:20,
         width:width}}>
             <TouchableOpacity onPress={this._animationBoxEtape_1}>

               <Animated.View  style={{transform: [{ rotate:rotation}] ,width:width, alignItems:'center',}}>
                 <Material name='apple-keyboard-control' size={24}  color= '#000'/>
               </Animated.View>

             </TouchableOpacity>

             <TouchableOpacity  onPress={this._RetourEtape_1} style={{width:50}}>

                 <View style={{paddingLeft:10}}>
                   <Material name='arrow-left' size={24}  color= '#5d2789'/>
                 </View>

              </TouchableOpacity>

               <View style={{alignItems:'center'}} >
                <Text style={{fontSize:16,fontWeight:'bold'}} >
                    Choisir l'endroit
                </Text>


                <TouchableOpacity onPress={()=> {this.setState({etape:2,isrec:false,isDisplayBoxEtape:false, opactyinfo:0, isDisplayBoxEtape2:true})}}  style={{height:50,
                borderRadius:4,
                borderColor: '#5d2789',
                width:width-20,
                borderWidth: 2,
                marginTop:10,
                alignItems:'center',
                justifyContent:'center',
              }} >
                <Text style={{fontSize:20,fontWeight:'bold'}}>
                  Suivant
                </Text>
                </TouchableOpacity>
               </View>

         </Animated.View>
       )
     }
    }

  /****************** Fin FunctionEtap 2 **********************/


 /******************Function Etap 0 **********************/
  _diplayBox1 =() =>{
    const rotation = this.state.iconBox.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    })

    if(this.state.isDisplayBox){
        if(this.state.reclamBoxShow){

        return (
           <Animated.View  style={{position: 'absolute',
           backgroundColor:'white',
           bottom:0,
           height:this.state.heightBox,
           alignItems:'center',
           paddingTop:10,
           borderTopLeftRadius:20,
           borderTopRightRadius:20,
           width:width}}>
           <TouchableOpacity onPress={this._animationBox}>

             <Animated.View  style={{transform: [{ rotate:rotation}] }}>
               <Material name='apple-keyboard-control' size={24}  color= '#000'/>
             </Animated.View>

           </TouchableOpacity>

           <TouchableOpacity onPress={this._animationBox}>
             <Text>
                Réclamations  récentes
             </Text>
           </TouchableOpacity>

           <View  style={styles.btnAdd}>
             <TouchableOpacity onPress={this._modalReclamation}>
               <Material name='plus' size={24}  color= '#fff'    />
             </TouchableOpacity>
           </View >


           <ScrollView  showsHorizontalScrollIndicator={false} horizontal={true}  style={{marginTop:20,}}>
            {
                    this.state.reclamationbox.map(marker => { console.warn(marker);
                        return (  <TouchableOpacity onPress={this._animateMapToMarker(marker)}>
                        <View style={{width:width*2/3,height:90,  backgroundColor:'rgba(238, 238, 238, 0.5)', marginLeft:10,marginRight:5,borderRadius:5}}>

                          <View style={{flexDirection:'row',paddingTop:10,paddingLeft:10,paddingRight:10,alignItems:'center' }}>
                          <Image
                             style={ {width:50,height:50,borderRadius:50}}
                             source={{uri: 'https://pickaface.net/gallery/avatar/unr_xxxxdddxxxx_190111_2125_w2q3o.png'}}
                          />

                             <TouchableOpacity style={{  borderColor:'#000000' ,flex:2,  borderWidth: 0.5 ,borderRadius:5,alignItems:'center' ,marginLeft:35, justifyContent:'center',height:25,}}>
                                <Text style={{color:'black' ,fontSize:10,textAlign:'center'}}>Une réclamation </Text>
                             </TouchableOpacity>
                          </View>

                           <View style={{flexDirection:'row',paddingLeft:50,alignItems:'center' }}>
                             <Material name='map-marker-outline' size={10}  color= '#000'/>
                             <Text style={{color:'black',fontSize:10,textAlign:'center',marginTop:0 }}>cité ghazela ,Ariana</Text>
                           </View>

                            <View>
                              <Text style={{color:'#808080',fontSize:7,textAlign:'right' ,paddingRight:5}}>il y a 15 jours </Text>
                            </View>

                       </View>
                     </TouchableOpacity>)

                     })
            }



           </ScrollView>

           </Animated.View>
         )
      }

    }
  }
  _animationBox = () =>{
    if(!this.state.open){
      this.setState({
        open:true
      })
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
    else{
      this.setState({
        open:false
      })
      Animated.timing(
        this.state.heightBox,
        {
          toValue: 60,
          duration: 300, // Le temps est en milliseconds ici (3000ms = 3sec)
         easing: Easing.ease,
        }
      ).start()
      Animated.timing(
        this.state.iconBox,
        {
          toValue: 0,
          duration: 300, // Le temps est en milliseconds ici (3000ms = 3sec)

        }
      ).start()
    }

  }
  _NextEtap_1  = () =>{
                         this.setState({ isOpen: false ,isrec:true, opactyinfo:1,isDisplayBox: false ,isDisplayBoxEtape:true,heightBox: new Animated.Value(150)})
                        }
 /****************** Fin Function Etap 0 **********************/


/******************Function d'upload image **********************/
   _displayLoading=() => {
     if (this.state.isLoading) {
       return (
         <View style={{  justifyContent:'center',alignItems:'center',}}>
           <ActivityIndicator size='large' />
         </View>
       )
     }
   }
   _suppresionPhoto =(key) =>{
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
   _photo=() =>{
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
   _photoClicked=() => {
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

  /******************Fin Function d'upload image **********************/


  /******************Function Map  **********************/
   onRegionChange = (region) => {
        this.setState({isLoadingMap:true})
      const NY = {
        lat: this.state.region.latitude,
        lng: this.state.region.longitude
      };

      this.setState({ region : region});
      Geocoder.geocodePosition(NY).then(res => {


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
      console.warn(this.state.isrec);
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


    componentWillMount() {
               this._fetchDataMarker();
             }

    _animateMapToMarker = (e) => {
      console.warn('anim');
               var newRegion = {
                 latitude: Number(e.latitude),
                 longitude: Number(e.longitude)
               }

              // this._map.animateToCoordinate(newRegion, 500)
             }

     _fetchDataMarker = async () => {

         const response = await fetch("https://www.betroulette.net/benarous/public/api/listmarker");
         const json = await response.json();

          this.setState({
            reclamBoxShow:true,
           reclamationbox:  json.map(function(point){return point } ) ,
           markers: json.map(function(point){
               return {
                 id: point.id,
                 type: point.type,
                 latlng:{
                   latitude: parseFloat(point.latitude),
                   longitude: parseFloat(point.longitude)
                 }
               }
             })
          });


       }

     _markerRec =  () =>  {

           this.state.markers.map(marker => {
                   if(marker.type == 1 ) {
                       return(<MapView.Marker coordinate={marker.latlng}   image={require('../Images/1.png')} key={marker.id} /> );
                     }else if(marker.type == 2 ) {
                            return(<MapView.Marker coordinate={marker.latlng}   image={require('../Images/2.png')} key={marker.id} /> );
                     }else{
                       return(<MapView.Marker coordinate={marker.latlng}  key={marker.id} /> );
                     }
                 })
         }

     _reclamationBoxClient = () => {
             this.state.reclamationbox.map(marker => { console.warn(marker);

                 return (  <TouchableOpacity>
                 <View style={{width:width*2/3,height:90,  backgroundColor:'rgba(238, 238, 238, 0.5)', marginLeft:10,marginRight:5,borderRadius:5}}>

                   <View style={{flexDirection:'row',paddingTop:10,paddingLeft:10,paddingRight:10,alignItems:'center' }}>
                   <Image
                      style={ {width:50,height:50,borderRadius:50}}
                      source={{uri: 'https://pickaface.net/gallery/avatar/unr_xxxxdddxxxx_190111_2125_w2q3o.png'}}
                   />

                      <TouchableOpacity style={{  borderColor:'#000000' ,flex:2,  borderWidth: 0.5 ,borderRadius:5,alignItems:'center' ,marginLeft:35, justifyContent:'center',height:25,}}>
                         <Text style={{color:'black' ,fontSize:10,textAlign:'center'}}>Une réclamation </Text>
                      </TouchableOpacity>
                   </View>

                    <View style={{flexDirection:'row',paddingLeft:50,alignItems:'center' }}>
                      <Material name='map-marker-outline' size={10}  color= '#000'/>
                      <Text style={{color:'black',fontSize:10,textAlign:'center',marginTop:0 }}>cité ghazela ,Ariana</Text>
                    </View>

                     <View>
                       <Text style={{color:'#808080',fontSize:7,textAlign:'right' ,paddingRight:5}}>il y a 15 jours </Text>
                     </View>

                </View>
              </TouchableOpacity>)

              })

     }
/******************Fin Function Map  **********************/

  render() {

const { photos } = this.state
const rotation = this.state.iconBox.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '180deg']
})
    return (
      <View style={styles.container}>
        <MapView
          ref={component => this._map = component}
          showsUserLocation
          showsMyLocationButton
           provider={PROVIDER_GOOGLE}
           showsMyLocationButton={true}
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChangeComplete={this.onRegionChange}

        >
        {
              this.state.markers.map(marker => {
                         if(marker.type == 1 ) {
                             return(<MapView.Marker coordinate={marker.latlng}   image={require('../Images/1.png')} key={marker.id} /> );
                           }else if(marker.type == 2 ) {
                                  return(<MapView.Marker coordinate={marker.latlng}   image={require('../Images/2.png')} key={marker.id} /> );
                           }else{
                             return(<MapView.Marker coordinate={marker.latlng}  key={marker.id} /> );
                           }
                       }
                  )
          }
          <MapView.Marker
              coordinate={this.state.region}
              opacity={0}
           >
           </MapView.Marker>
      </MapView>



      <View  style={styles.info} >
        <View  style={styles.adress}  opacity={this.state.opactyinfo}>
          {this._displayLoadingMap()}
        </View>

        <Image
         opacity={this.state.opactyinfo}
          style={styles.pointeur}
          source={require('../Images/pointeur.png')}
        />
      </View>


      {this._diplayBox1()}
      {this._diplayBoxEtape_1()}
      {this._diplayBoxEtape_2()}



      <Modal style={[styles.modal, styles.modal3]} onClosed={() => this.setState({ isOpen: false })} isOpen={this.state.isOpen}>
          <Text style={styles.modalTitre}>Vous souhaitez signaler ?</Text>
          <TouchableOpacity onPress={this._NextEtap_1}>
            <View  style={styles.modalRec}>
            <Image
              style={{width:20,height:20,marginRight:25,marginLeft:25}}
              source={require('../Images/1.png')}
            />
            <Text >Une Réclamation</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._NextEtap_1}>
          <View  style={styles.modalDec}>
          <Image
            style={{width:20,height:20,marginRight:25,marginLeft:25}}
            source={require('../Images/2.png')}
          />
            <Text >Déchet de constuction</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ isOpen: false })}>
          <View >
            <Text style={styles.modalAnnuller} >Annuler</Text>
          </View>
          </TouchableOpacity>
      </Modal>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  modalAnnuller:{
    marginTop:10,
    color:'black',
    fontWeight:'bold',
    fontSize:20,
  },
  modalDec:{
    flexDirection: 'row',
    color:'black',
    padding:20,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  modalRec:{
    flexDirection: 'row',
    marginTop:20,
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    width: 300,
    fontWeight:'300',
    color:'black',
    padding:20,
  },
  modalTitre:{
    color:'black',
    fontWeight:'bold',

    fontSize:20,
    marginTop:20,
  },
  modal3: {
   height: 240,
   width: 300,
   borderRadius:10,
 },
 modal: {

   alignItems: 'center',
   borderRadius:10,
 },
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
      opacity:1 ,


    },
btnAdd:{
    position: 'absolute',
    backgroundColor:'#5b53d3',
    color:'white',
    top:10,
    right:10,
    width:40,
    height:40,
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
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center'
},





  })
