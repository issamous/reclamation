
import React from 'react';
import {  Text, View,TouchableOpacity ,Image ,StyleSheet,FlatList , ActivityIndicator} from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import data from '../Helpers/filmData'
import FilmItem from './FilmItem'
class News extends React.Component {

   constructor(props) {
    super(props);
    this.page = 0
    this.totalPages = 0
       this.state={
                   data: [],
                   isLoading: true,
                   refreshing:false,
                   isLoadingPgae: false,
                  }
   }

   componentWillMount() {
      this._fetchData();
    }

  _displayDetailForFilm = (itemContent) => {
    this.props.navigation.navigate("NewsDetail", { ContentNews : itemContent} )
  }

  _displayLoading = ()  => {
    if (this.state.isLoading) {
          return (
            <View style={styles.loading_container}>
             <ActivityIndicator size='large' />
           </View>)
     }
  }

  _displayLoadingPage = ()  => {
    if (this.state.isLoadingPgae) {
          return (
            <View style={styles.loading_container_page}>
             <ActivityIndicator size='large' />
           </View>)
     }
  }

  _handleRefresh = () => {
  //   console.warn("handleRefresh");
        this.setState({
          data: [],
        }) ;

        this.state.refreshing = true ;
        this.page = 0 ;
        this.totalPages = 0 ;
        this._fetchData();

  }

  _fetchData = async () => {
     var page = this.page + 1 ;

     if(!this.state.refreshing){   this.setState({ isLoading: true }); }
     const response = await fetch("https://www.betroulette.net/benarous/public/api/listnews?page="+page);
     const json = await response.json();

     this.setState({
       data: [ ...this.state.data, ...json.data ],
       isLoading: false,
       isLoadingPgae: false,
       refreshing: false
     });
     this.page = json.current_page ;
     this.totalPages =json.last_page ;

   };

  render() {

            return (
              <View >
                    <FlatList
                      style={styles.list}
                      data={ this.state.data}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({item}) => (
                        <FilmItem
                          film={item}
                          displayDetailForFilm={this._displayDetailForFilm}
                        />
                      )}
                      onEndReachedThreshold={0.5}
                      onEndReached={() => {
                        if (this.state.data.length > 0) {
                              // console.warn("onEndReached page "+this.page+" totalPages"+this.totalPages)
                               if (this.page < this.totalPages) {
                                       this.setState({ isLoadingPgae: true  });
                                       this._fetchData();
                                  }
                            }
                      }}
                      refreshing={this.state.refreshing}
                      onRefresh={this._handleRefresh}
                    />
                    {this._displayLoading()}
                    {this._displayLoadingPage()}
                  </View>
                );



          }
}

const styles = StyleSheet.create({
  main_container: {

    height: 120,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',

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
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 230,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading_container_page :{
    height:40,
    borderColor:"#DCDCDC",
    backgroundColor:'#DCDCDC',
    borderWidth:1,
    marginTop:20,
    marginBottom:20,
    marginLeft:10,
    marginRight:10
  },

})
export default News
