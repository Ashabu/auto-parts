import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CheckoutScreen from '../../screens/CheckoutScreen';
import HomeScreen from '../../screens/HomeScreen';
import ProductsScreen from '../../screens/ProductsScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import SearchScreen from '../../screens/SearchScreen';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../Navigation';
import HomeStack from '../StackScreens/HomeStack';
import CheckoutStack from '../StackScreens/CheckoutStack';
import LandingScreen from '../../screens/LandingScreen';
import {useLang} from '../../Context/Context';


const Tab = createBottomTabNavigator();




const Tabs = () => {
  const {lang} = useLang();

  return (
    !lang ?
    <LandingScreen/>
    :
      <NavigationContainer ref={navigationRef}>
        <Tab.Navigator>
          <Tab.Screen name='Home' component={HomeStack} />
          <Tab.Screen name='Products' component={ProductsScreen} />
          <Tab.Screen name='Search' component={SearchScreen} />
          <Tab.Screen name='Checkout' component={CheckoutStack} />
          <Tab.Screen name='Profile' component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  )
}

export default Tabs;