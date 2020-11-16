
import React from 'react';
import {  Text, View ,ScrollView,Image,StyleSheet ,Dimensions ,TouchableOpacity } from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import Communications from 'react-native-communications';

export default class NewsDetail extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      EvenementDetail: "",
      isLoading: false
    }
  }



    componentDidMount() {

     this.setState({
       EvenementDetail:    this.props.navigation.state.params.ContentEvent,
       isLoading: false
     });

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


  render() {
    var width = Dimensions.get('window').width; //full width
    return (
  <View style={styles.view_container}>
      <ScrollView style={styles.scrollview_container}>
        <Image
          style={ styles.image}
           source={{uri: 'https://www.betroulette.net/benarous/public/upload/agenda/'+this.state.EvenementDetail.image }}
        />

        <View style={styles.main_container} >
              <Text  style={styles.title_text} >{this.state.EvenementDetail.titre}</Text>
              <Text  style={styles.date_text} > <Material name='clock-outline' size={10} /> { this.state.EvenementDetail.dates } </Text>
              <Text  style={styles.description_text }> {this.state.EvenementDetail.description}</Text>
          </View>

      </ScrollView>
      <View style={styles.footer_container , {  width: width ,  fontSize: 10,  justifyContent:'center', flexDirection:'row', alignItems: 'center' , backgroundColor:'#3EC4E8', height : 50 ,}} >
            <TouchableOpacity onPress={() => Communications.phonecall(' 71 381 263', true)}>
                      <View >
                        <Text style={styles.footer_phone } > <Material name='cellphone' size={10} /> 71 381 263</Text>
                      </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Communications.email(['municipalesbenarous@hotmail.com'],null,null,'Contact municipales benarous ','Beinvenu municipales benarous')}>
                   <View >
                      <Text style={styles.footer_email} > <Material name='email-outline' size={10} /> municipalesbenarous@hotmail.com</Text>
                   </View>
           </TouchableOpacity>
      </View>
  </View>

    );
  }
}
const styles = StyleSheet.create({
  view_container: {
    flex: 1
  },

  scrollview_container: {
    flex: 1
  },
  main_container: {
    flex: 1,
    paddingRight:25,
    paddingLeft:25,
    paddingTop:25,
    textAlign:'justify'

  },
  image: {
    height: 169,
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#46B29A',

  },

date_text :{
  color: '#46B29A',
  paddingTop : 10 ,
  paddingBottom : 10
},

description_text:{
  color: '#000000',
  paddingTop : 10 ,
  paddingBottom : 10
},

footer_container: {
    position: 'absolute',
    bottom: 0,
  },
footer_phone: {
      color: 'white',
      fontSize: 10,
    },
footer_email: {
    color: 'white',
    fontSize: 10,
    marginLeft:20
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



  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_container: {
    alignItems: 'center', // Alignement des components enfants sur l'axe secondaire, X ici
},favorite_image: {
    width: 40,
    height: 40
}
})
