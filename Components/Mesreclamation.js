import React from 'react'
import{connect} from 'react-redux'
import {Alert,Text, FlatList ,cropImage,Dimensions, View ,TextInput ,Easing ,Button,StyleSheet,TouchableHighlight,TouchableOpacity,ActivityIndicator,ImageBackground,Image,ScrollView,Platform,Animated} from 'react-native';
import{loginUser} from './../actions'
import pick1 from '../Images/1.png';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

import MesreclamationItem from './MesreclamationItem'


class Mesreclamation extends React.Component {
    constructor(props) {
        super(props);
      //  console.warn(this.props.user);
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
         const response = await fetch("https://www.betroulette.net/benarous/public/api/listreclamation?page="+page);
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
                    <MesreclamationItem
                      reclamation={item}

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

const mapStateToProps =state =>{
    return {
      errors :state.auth.error,
      isLoadingLogin :state.auth.isLoadingLogin,
      user:state.auth.user,
      }
  }

export default connect(mapStateToProps,{loginUser})(Mesreclamation)
