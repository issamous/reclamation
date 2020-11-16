// Navigation/Navigation.js
import React from 'react'
import { createStackNavigator ,createBottomTabNavigator ,createSwitchNavigator , createDrawerNavigator , createAppContainer } from 'react-navigation'
import { StyleSheet, Image , View , TouchableOpacity , Button} from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

import News from '../Components/News'
import NewsDetail from '../Components/NewsDetail'

import Evenement from '../Components/Evenement'
import EvenementDetail from '../Components/EvenementDetail'

import Guid from '../Components/Guid'
import Reclamation from '../Components/Reclamation'

import Login from '../Components/Login'
import Register from '../Components/Register'

import Menu from '../Components/menu'
import Profil from '../Components/Profil'

import Mesreclamation from '../Components/Mesreclamation'
import Information from '../Components/Information'

import Reset from '../Components/resetPassword'

//////////////////////////////////////////////////////////////


const NavNavigator = createStackNavigator({
  Menu: {
    screen: Menu,
    navigationOptions:({ navigate, navigation }) =>  ( {
      title: 'Paramètre',
      headerTitleStyle :{fontSize: 16, color: '#ffffff' , marginLeft:0 },
      headerLeft  : <TouchableOpacity style={{marginLeft:10  }} onPress={()=>navigation.navigate('News')} ><Material name='keyboard-return'   size={24}  color= '#ffffff'     /></TouchableOpacity>,
      headerStyle:{
         backgroundColor :  '#76D7C4',
         fontSize: 10,
      }
    })
  },

  Profil: {
    screen: Profil,
    navigationOptions:({ navigate, navigation }) =>  ({
      title: 'Mon Compte',
      headerTitleStyle :{fontSize: 16, color: '#ffffff' , marginLeft:0},
      headerTintColor:'white',
      headerStyle:{
         backgroundColor :  '#76D7C4',
         fontSize: 10,

      }
    })
  },

  Mesreclamation: {
    screen: Mesreclamation,
    navigationOptions:({ navigate, navigation }) =>  ({
      title: 'Mes Reclamation',
      headerTitleStyle :{fontSize: 16, color: '#ffffff' , marginLeft:0},
      headerTintColor:'white',
      headerStyle:{
         backgroundColor :  '#76D7C4',
         fontSize: 10,

      }
    })
  },

  Information: {
    screen: Information,
    navigationOptions:({ navigate, navigation }) =>  ({
      title: 'Information',
      headerTitleStyle :{fontSize: 16, color: '#ffffff' , marginLeft:0},
      headerTintColor:'white',
      headerStyle:{
         backgroundColor :  '#76D7C4',
         fontSize: 10,

      }
    })
  },


});


////////////////////////////////////////////////////////////////
const LoginNavigator = createStackNavigator({
  Login: {
    screen: Login,
      navigationOptions: {
        header: null
      }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: 'Créer un compte',
      headerTitleStyle :{fontSize: 16, color: '#ffffff',   textAlign: 'center', flex: 1,},
      headerRight : <View style={{marginRight:10  }} ></View> ,
      headerTintColor: '#ffffff',
      headerStyle:{
         backgroundColor :  '#76D7C4',
         color :'#ffffff' ,
         fontSize: 10,
      }
    }
  },
Reset: {
  screen: Reset,
  navigationOptions: {
    title: 'Réinitialiser le mot de passe',
    headerTitleStyle :{fontSize: 16, color: '#ffffff',   textAlign: 'center', flex: 1,},
    headerRight : <View style={{marginRight:10  }} ></View> ,
    headerTintColor: '#ffffff',
    headerStyle:{
       backgroundColor :  '#76D7C4',
       color :'#ffffff' ,
       fontSize: 10,
    }
  }
},

});

const ReclamationNavigator = createStackNavigator({
  Reclamation: {
    screen: Reclamation,
    navigationOptions: ({ navigate, navigation }) =>  ( {
      title: 'Déposer une réclamation',
      headerTitleStyle :{fontSize: 16, color: '#ffffff',   textAlign: 'center'},
      headerRight:<View style={{marginRight:10 }} >
                      <TouchableOpacity onPress={ ()=>{ navigation.navigate('Menu'); }}>
                       <Material name='menu'     size={24}  color= '#ffffff'    />
                      </TouchableOpacity>
                    </View> ,
      headerStyle:{
         backgroundColor :  '#76D7C4',
         fontSize: 10,
      }
    })
  }
})


const GuidNavigator = createStackNavigator({
  Guid: {
    screen: Guid,
    navigationOptions: ({ navigate, navigation }) =>  ( {
      title: 'Guide des services',
      headerTitleStyle :{fontSize: 16, color: '#ffffff',   textAlign: 'center'},
      headerRight:<View style={{marginRight:10 }} >
                      <TouchableOpacity onPress={ ()=>{ navigation.navigate('Menu'); }}>
                       <Material name='menu'     size={24}  color= '#ffffff'    />
                      </TouchableOpacity>
                    </View> ,
      headerStyle:{
         backgroundColor :  '#76D7C4',
         fontSize: 10,
      }
    })
  }
})


const NewskNavigator = createStackNavigator({
  News: {
      screen: News,
      navigationOptions:({ navigate, navigation }) =>  ( {
        title: 'Actualités de la commune',
        headerTitleStyle :{fontSize: 16, color: '#ffffff',alignSelf: 'center',textAlign: 'center' },
        headerRight:<View style={{marginRight:10 }} >
                        <TouchableOpacity onPress={ ()=>{ navigation.navigate('Menu'); }}>
                         <Material name='menu'     size={24}  color= '#ffffff'    />
                        </TouchableOpacity>
                      </View> ,

        headerStyle:{
           backgroundColor :  '#76D7C4',
           fontSize: 10,
        }
      })
    },
  NewsDetail: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
    screen: NewsDetail,
    navigationOptions:({ navigate, navigation }) =>  ( {
      title: 'Detail de Actualit',
      headerTitleStyle :{fontSize: 16, color: '#ffffff',   textAlign: 'center', flex: 1,},
      headerRight:<View style={{marginRight:10 }} >
                      <TouchableOpacity onPress={ ()=>{ navigation.navigate('Menu'); }}>
                       <Material name='menu'     size={24}  color= '#ffffff'    />
                      </TouchableOpacity>
                    </View> ,
      //headerLeft  : <TouchableOpacity style={{marginLeft:10  }} onPress={()=>navigation.goback()} ><Material name='keyboard-return'   size={24}  color= '#ffffff'     /></TouchableOpacity> ,
      //headerLeftStyle  : {color: '#ffffff',  } ,
      headerTintColor: '#ffffff',
      headerStyle:{
         backgroundColor :  '#76D7C4',
         color :'#ffffff' ,
         fontSize: 10,
      }
    })
  }
})

const EvenementkNavigator = createStackNavigator({
  Evenement: {
    screen: Evenement,
    navigationOptions: ({ navigate, navigation }) =>  ( {
      title: 'Agenda des évènements',
      headerTitleStyle :{fontSize: 16, color: '#ffffff',   textAlign: 'center'},
      headerRight:<View style={{marginRight:10 }} >
                      <TouchableOpacity onPress={ ()=>{ navigation.navigate('Menu'); }}>
                       <Material name='menu'     size={24}  color= '#ffffff'    />
                      </TouchableOpacity>
                    </View> ,
      headerStyle:{
         backgroundColor :  '#76D7C4',
         fontSize: 10,
      }
    })
  },
  EvenementDetail: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
    screen: EvenementDetail,
    navigationOptions: ({ navigate, navigation }) =>  ( {
      title: 'Detail de Evenement',
      headerTitleStyle :{fontSize: 16, color: '#ffffff',   textAlign: 'center', flex: 1,},
      headerRight:<View style={{marginRight:10 }} >
                      <TouchableOpacity onPress={ ()=>{ navigation.navigate('Menu'); }}>
                       <Material name='menu'     size={24}  color= '#ffffff'    />
                      </TouchableOpacity>
                    </View> ,
      //headerLeft  : <TouchableOpacity style={{marginLeft:10  }} onPress={()=>navigation.goback()} ><Material name='keyboard-return'   size={24}  color= '#ffffff'     /></TouchableOpacity> ,
      //  headerLeftStyle  : {color: '#ffffff',  } ,
      headerTintColor: '#ffffff',
      headerStyle:{
         backgroundColor :  '#76D7C4',
         color :'#ffffff' ,
         fontSize: 10,
      }
    })
  }
})

const TabNavigator = createBottomTabNavigator({

  News: {
    screen: NewskNavigator,
    navigationOptions: {
      title: 'Actualités',
      tabBarIcon: ({tintColor}) => <Material name='message-alert-outline' size={24} style={{ color: tintColor }} />
    },
    animationEnabled: true

  },
  Reclamation: {
   screen: ReclamationNavigator,
   navigationOptions: {
     title: 'Réclamation',
     tabBarIcon: ({tintColor}) => <Material name='emoticon-sad' size={24} style={{ color: tintColor }} />

   }
 },
   Evenement: {
    screen: EvenementkNavigator,
    navigationOptions: {
      title: 'Agenda',
      tabBarIcon: ({tintColor}) => <Material name='calendar-text' size={24} style={{ color: tintColor }} />

    }
  },
Guid: {
 screen: GuidNavigator,
 navigationOptions: {
   title: 'Guide',
   tabBarIcon: ({tintColor}) => <Material name='briefcase-outline' size={24} style={ {color: tintColor,marginBottom:0}} />
     }
   },

},{
    tabBarOptions: {
      activeTintColor:'#FFFFFF',
      inactiveTintColor:'rgba(255,255,255, 0.8)',
      activeBackgroundColor: '#46B29A', // Couleur d'arrière-plan de l'onglet sélectionné
      inactiveBackgroundColor: '#46B29A', // Couleur d'arrière-plan des onglets non sélectionnés
      showLabel: true, // On masque les titres
      showIcon: true, // On informe le TabNavigator qu'on souhaite afficher les icônes définis
      tabStyle :{
      color : 'red',
      borderTop : 'none'
    },
    style:{
     borderTopColor:'#46B29A',
     marginBottom:20,

   },
   tabStyle: {
    height: 69,
     padding:0 ,
     margin:0,
  },
  labelStyle : {
       padding:0 ,
       marginTop:-15,
       marginBottom:15,
   },
    }
  }
);


const styles = StyleSheet.create({
  icon: {
    opacity:0.8
  },
  icons: {
    width: 24,
    height: 24,
  }
})

const AppNavigator = createSwitchNavigator({
  //Mesreclamation:Mesreclamation,

    Login: LoginNavigator,
    Home: TabNavigator,
    Menu:NavNavigator,

});


export default AppNavigator
