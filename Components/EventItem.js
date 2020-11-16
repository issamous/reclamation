import React from 'react'
import { StyleSheet, View, Text, Image , TouchableOpacity,Dimensions } from 'react-native'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
export default class EventItem extends React.Component {


  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    var width = Dimensions.get('window').width; //full width
    const { evenemnt, displayDetailForEvent } = this.props
    //console.warn(evenemnt);
    return (


<TouchableOpacity style={{margin:10}}  onPress={() => displayDetailForEvent(evenemnt)}>
    <View style={styles.main}>

        <View style={styles.containerTop} >
          <View style={styles.image}>
            <Image
              style={  {  width: width -40 , flex:1  }}
              source={{uri: 'https://www.betroulette.net/benarous/public/upload/agenda/'+evenemnt.image }}
            />

          </View>
          <View style={styles.starBlock}>
              <View>
                 <Image source={require('../Images/bookmark-ribbon.png')} />
              </View>

              <View style={styles.star}>
                  <Material name='star' color='#46B29A'  size={26}  />
              </View>
          </View>

        </View>

        <View style={styles.containerBottom}>
          <View style={styles.textLeft}>
            <Text style={{fontSize:12,color:'black',marginTop:10}} numberOfLines={1}>
              {evenemnt.titre }
            </Text>
            <Text style={{fontSize:12,color:'#727272'}} >
              <Material name='map-marker-outline' color='gray'  size={10}  />{evenemnt.lieu}
            </Text>
          </View>

          <View style={styles.textRight}>
            <View style={{alignItems:'center',justifyContent: 'center',}}>
              <Text style={styles.day}>
                {evenemnt.day}
              </Text>
              <Text style={styles.month}>
                {evenemnt.moth}
              </Text>
            </View>
          </View>

        </View>

    </View>
  </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  containerTop:{
    position:'relative',
    height:200,
  },
  starBlock:{
    position:'absolute',
    right:30
  },
  star:{
    position:'absolute',
    top:15,
    left:14,
  },
  containerBottom:{
    flexDirection:'row',
    height:50,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor:'white',
  },
  main:{
    flex:1,
  },
  image: {
    marginLeft: 10,
    marginRight: 10,
    flex:1,
    backgroundColor: 'gray'
  },
  textRight:{
    flex:1,
    alignItems:'flex-end',
    paddingRight:20,
  },
  textLeft:{
    flex:2,
    paddingLeft:10,
    alignItems:'flex-start',
  },
  day:{
    fontSize:20,
    fontWeight: "bold",
    color:'#3EC4E8',
  },
  month:{
      color:'#3EC4E8',
  }
})
