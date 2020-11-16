
import React from 'react';
import { Text, View,Image,StyleSheet ,TouchableOpacity,FlatList,ActivityIndicator} from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import data from '../Helpers/filmData'
import EventItem from './EventItem'
export default class Evenement extends React.Component {

    constructor(props) {
      super(props);
      this.page = 0;
      this.totalPages = 0;
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

   _displayDetailForEvent = (itemContent) => {
     this.props.navigation.navigate("EvenementDetail", { ContentEvent : itemContent} )
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

     if(this.state.refreshing){ this.setState({ isLoading: false, }); }
      const response = await fetch("https://www.betroulette.net/benarous/public/api/listevent?page="+page);
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
      <View style={styles.main_container} >
          {this._displayLoading()}
            <FlatList
              style={styles.list}
              data={ this.state.data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => (
                <EventItem
                  evenemnt={item}
                  displayDetailForEvent={this._displayDetailForEvent}
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
            {this._displayLoadingPage()}
          </View>

    );
  }
}
const styles = StyleSheet.create({
  eventItem:{
  },
  main_container: {
    flex:1,
  },
  loading_container :{
    flex:1,
    top: 100,
    justifyContent: 'center',
    alignItems:'center'
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
  bg:{
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

})
