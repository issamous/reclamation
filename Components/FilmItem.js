// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image , TouchableOpacity } from 'react-native'
import {getImageFromApi} from '../API/TMDBApi'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
class FilmItem extends React.Component {

  constructor(props) {
  super(props)
  this.state = {
    films: []
  }
}
   render() {

      const { film, displayDetailForFilm } = this.props
       return (
         <TouchableOpacity style={styles.main_container} onPress={() => displayDetailForFilm(film)}>
                <Image
                   style={styles.image}
                //   source={{uri: 'http://www.assabahnews.tn/sites/default/files/styles/featured_news/public/main/articles/italie_41.jpg'}}
                       source={{uri: 'https://www.betroulette.net/benarous/public/upload/news/'+film.image }}
                    //source={require('../Images/newsImg.png')}
                   borderRadius={5}
                 />
                <View style={styles.content_container}>
                     <View style={styles.header_date}>
                       <Text style={styles.date}> <Material name='clock-outline' size={12} /> { film.dates } </Text>
                       </View>
                       <View style={styles.header_container}>
                         <Text style={styles.title_text}>{film.titre}</Text>
                       </View>
                       <View style={styles.description_container}>
                         <Text style={styles.description_text} numberOfLines={3}>
                        {film.description} ....</Text>
                       </View>
                 </View>
         </TouchableOpacity>

       )
   }
}
const styles = StyleSheet.create({
  main_container: {

    height: 120,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#b6b6b6',
  },
  image: {
    width: 100,
    height: 90,
    margin: 10,
    backgroundColor: 'gray'
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
    color:'#46B29A',
    fontSize: 10,
  },
  description_container: {
    flex: 4,
  },
  description_text: {
    textAlign: 'justify',
    color: '#666666',
    fontSize: 10,

  }
})

export default FilmItem
