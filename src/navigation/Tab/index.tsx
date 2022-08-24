import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductsScreen from '../../screens/ProductsScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import SearchScreen from '../../screens/SearchScreen';
import HomeStack from '../StackScreens/HomeStack';
import CheckoutStack from '../StackScreens/CheckoutStack';
import { useOnboarding } from '../../Context/Context';
import LandingStack from '../StackScreens/LandingStack';
import { getData } from '../../services/StorageService';
import { Image } from 'react-native';



const Tab = createBottomTabNavigator();


const Tabs = () => {
  const [isOnboarding, setIsOnboarding] = useState<boolean>(false);
  const [initialized, setIsInitialized] = useState<boolean>(false);

  const onAppInitialize = () => {
    getData('onboarding').then(response => {
      if (response) {
        setIsOnboarding(true);
      }
    }).finally(() => {
      setIsInitialized(true);
    });
  };
  useEffect(() => {
    onAppInitialize();
  }, [])

  return (
    !initialized && !isOnboarding ?
      <LandingStack />
      :
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={HomeStack}
        />
        <Tab.Screen
          name='Products'
          component={ProductsScreen}
        />
        <Tab.Screen
          name='Search'
          component={SearchScreen}
          // options={{
          //   tabBarIcon: ({ focused, color, size }) => {
          //     return (
          //       <Image/>
          //     )
          //   },
          //   tabBarActiveTintColor: 'tomato',
          //   tabBarInactiveTintColor: 'gray',
          // }}
        />
        <Tab.Screen
          name='Checkout'
          component={CheckoutStack}
        />
        <Tab.Screen
          name='Profile'
          component={ProfileScreen}
        />
      </Tab.Navigator>
  );
};

export default Tabs;