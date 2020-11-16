// Navigation/Navigation.js
import React from 'react'
import { createStackNavigator ,createBottomTabNavigator ,createAppContainer } from 'react-navigation'
import { StyleSheet, Image } from 'react-native';
import News from '../Components/News'
import NewsDetail from '../Components/NewsDetail'

import Evenement from '../Components/Evenement'
import EvenementDetail from '../Components/EvenementDetail'

import Guid from '../Components/Guid'
import Reclamation from '../Components/Reclamation'

const NewsStackNavigator = createStackNavigator({
  News: {
    screen: News,
    navigationOptions: {
      title: 'Actualité'
    }
  },
  NewsDetail: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
    screen: NewsDetail,
    navigationOptions: {
      title: 'Detail'
    }
  }
})


const EvenementStackNavigator = createStackNavigator({
  Evenement: {
    screen: Evenement,
    navigationOptions: {
      title: 'Actualité'
    }
  },
  EvenementDetail: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
    screen: EvenementDetail,
    navigationOptions: {
      title: 'Detail'
    }
  }
})


const TabNavigator = createBottomTabNavigator({
  News: {
    screen: NewsStackNavigator,
    navigationOptions: {
      tabBarIcon: () => { // On définit le rendu de nos icônes par les images récemment ajoutés au projet
        return <Image
          source={require('../Images/ic_search.png')}
          style={styles.icon}/> // On applique un style pour les redimensionner comme il faut
      }
    }
  },
  Evenement: {
   screen: EvenementStackNavigator,
   navigationOptions: {
     tabBarIcon: () => {
       return <Image
         source={require('../Images/ic_favorite.png')}
         style={styles.icon}/>
     }
   }
 },
 Reclamation: {
  screen: Reclamation,
  navigationOptions: {
    tabBarIcon: () => {
      return <Image
        source={require('../Images/ic_favorite.png')}
        style={styles.icon}/>
    }
  }
},
Guid: {
 screen: Guid,
 navigationOptions: {
   tabBarIcon: () => {
     return <Image
       source={require('../Images/ic_favorite.png')}
       style={styles.icon}/>
   }
 }
},
},{
    tabBarOptions: {
      activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
      inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
      showLabel: false, // On masque les titres
      showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
    }
  }
);

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default createAppContainer(NewsStackNavigator)
