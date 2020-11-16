import React from 'react';
import {  Text, View , StyleSheet , Image ,TouchableOpacity } from 'react-native';
import Communications from 'react-native-communications';
import numeroutile from '../Images/numeroutile.png';
import demarche from '../Images/Demarch.png';
import suggestions from '../Images/suggestions.png';
import information from '../Images/information.png';
import prele from '../Images/prele.png';
import collecte from '../Images/collecte.png';

export default class Guid extends React.Component {
  render() {
    return (
      <View style={styles.main_container} >


          <View style={styles.block_container}  >

              <TouchableOpacity style={styles.row_container}   >
                <Image style={ styles.image}  source={numeroutile}    />
                <Text style={ styles.title} >Numéro utiles</Text>
              </TouchableOpacity >

              <TouchableOpacity style={styles.row_container} onPress={() => Communications.web('http://www.commune-benarous.gov.tn')} >
                <Image  style={ styles.image}  source={{uri: 'https://www.betroulette.net/benarous/public/upload/appliactionmobile/Demarch.png'}}    />
                <Text style={ styles.title}>le Site Web</Text>
                <Text style={ styles.title2}></Text>
              </TouchableOpacity >

          </View>


          <View style={styles.block_container2}  >
              <View style={styles.row_container} >
                <Image   style={ styles.image}   source={{uri: 'https://www.betroulette.net/benarous/public/upload/appliactionmobile/suggestions.png'}}   />
                <Text style={ styles.title}>Vos</Text>
                <Text style={ styles.title2}>suggestions</Text>
              </View >


              <View style={styles.row_container} >
                <Image  style={ styles.image}   source={{uri: 'https://www.betroulette.net/benarous/public/upload/appliactionmobile/information.png'}}  />
                <Text style={ styles.title} >informations</Text>
                    <Text style={ styles.title2} >pratiques</Text>
              </View >
          </View>

          <View style={styles.block_container2}  >
              <View style={styles.row_container} >
                <Image     style={ styles.image}    source={{uri: 'https://www.betroulette.net/benarous/public/upload/appliactionmobile/prele.png'}}  />
                <Text style={ styles.title} >Prélévement</Text>
                  <Text style={ styles.title2} > des poubelles</Text>
              </View >

              <View style={styles.row_container } >
                    <Image style={ styles.image }   source={{uri: 'https://www.betroulette.net/benarous/public/upload/appliactionmobile/collecte.png'}}  />
                    <Text style={ styles.title}>Collecte</Text>
                    <Text style={ styles.title2}>des déchets</Text>
              </View >
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex:1,

  },
  bg:{
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
 block_container: {
    flex:1,
    flexDirection: 'row',
    justifyContent:'center',

  },
  block_container2: {
     flex:1,
     flexDirection: 'row',
     justifyContent:'center',
          opacity:0.5
   },
  row_container: {
   backgroundColor: '#3EC4E8',
    borderColor: '#3EC4E8',
    borderWidth:2,
    borderRadius:5,
    justifyContent:'center',
    margin:10,
    padding:40,

   },
   row_container2: {
     borderColor: 'white',

     borderWidth:2,
     borderRadius:5,
     justifyContent:'center',
     margin:10,
     padding:40,
     opacity:0.5

    },
  image: {
    width: 60,
    height: 60,
    marginLeft:0,
    marginRight:0,


  },
  title:{
    fontSize:10,
    fontWeight: 'bold',
    color:'white',
    marginTop:10,
    flexWrap:'wrap',
    marginLeft:0,
    textAlign:'center'
  },
  title2:{
    fontSize:10,
    fontWeight: 'bold',
    color:'white',

    flexWrap:'wrap',
    marginLeft:0,
    marginRight:0,
    textAlign:'center'
  },
  content_container: {
    flex:1,
    flexDirection: 'column',
    marginTop:10
  },
  header_date :{
        flex: 1,
        marginBottom:2
    },
    date:{
      marginTop:0,
      fontSize: 10,
    },

  header_container: {
    flex: 2,
    justifyContent:'flex-end',
    marginBottom:2

  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 10,

  },
  description_container: {
    flex: 4,
  },
  description_text: {
    textAlign: 'justify',
    fontStyle: 'italic',
    color: '#666666',
    fontSize: 12,

  },

})
