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
import { Images } from '../../utils/Images';



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
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'yellow',
          }
        }}>
        <Tab.Screen
          name='Home'
          component={HomeStack}
        />
        <Tab.Screen
          name='Products'
          component={ProductsScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Image source={focused ? Images.PRODUCT_BLACK : Images.PRODUCT_GREY} style={{ width: 23, height: 23 }} />
              );
            },
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#B7C4CB'
          }}
        />
        <Tab.Screen
          name='Search'
          component={SearchScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Image source={focused ? Images.SEARCH_BLACK : Images.SEARCH_GREY} style={{ width: 23, height: 23 }} />
              );
            },
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#B7C4CB'
          }}
        />
        <Tab.Screen
          name='Checkout'
          component={CheckoutStack}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Image source={focused ? Images.CART_BLACK : Images.CART_GREY} style={{ width: 23, height: 23 }} />
              );
            },
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#B7C4CB'
          }}

        />
        <Tab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Image source={focused ? Images.PROFILE_BLACK : Images.PROFILE_GREY} style={{ width: 23, height: 23 }} />
              );
            },
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#B7C4CB'
          }}
        />
      </Tab.Navigator>
  );
};

export default Tabs;