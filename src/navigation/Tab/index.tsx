import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductsScreen from '../../screens/ProductsScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import SearchScreen from '../../screens/SearchScreen';
import HomeStack from '../StackScreens/HomeStack';
import CheckoutStack from '../StackScreens/CheckoutStack';
import { useOnboarding } from '../../Context/Context';
import LandingStack from '../StackScreens/LandingStack';


const Tab = createBottomTabNavigator();


const Tabs = () => {
  const { isOnboard } = useOnboarding();

  return (
    !isOnboard ?
      <LandingStack />
      :
      <Tab.Navigator>
        <Tab.Screen name='Home' component={HomeStack} />
        <Tab.Screen name='Products' component={ProductsScreen} />
        <Tab.Screen name='Search' component={SearchScreen} />
        <Tab.Screen name='Checkout' component={CheckoutStack} />
        <Tab.Screen name='Profile' component={ProfileScreen} />
      </Tab.Navigator>
  );
};

export default Tabs;