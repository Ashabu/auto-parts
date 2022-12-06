import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from '../../screens/SearchScreen';
import HomeStack from '../StackScreens/HomeStack';
import CheckoutStack from '../StackScreens/CheckoutStack';
import { Image } from 'react-native';
import { Images } from '../../utils/Images';
import { useProduct } from '../../Context/ProductsContext';
import ProfileStack from '../StackScreens/ProfileStack';
import { useAuth } from '../../Context/Context';
import OrderHistoryScreen from '../../screens/OrderHistoryScreen';
import AppHeader from '../../components/AppHeader';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../utils/AppColors';
import {  useSafeAreaInsets } from 'react-native-safe-area-context';
import WishListScreen from '../../screens/WishListScreen';



const Tab = createBottomTabNavigator();


const Tabs = () => {
  const { isAuthorized } = useAuth();
  const {t} = useTranslation();
  const TabIconSize = 25;

  const { totalItemCount } = useProduct();
  const {bottom} = useSafeAreaInsets()

  return (

    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: Colors.YELLOW,
          paddingBottom: 5,
          paddingTop: 5
        },
      }}>
      <Tab.Screen
        name='Home'
        component={HomeStack}
        options={{
          title: t("homeTab"),
          tabBarIcon: ({ focused }) => {
            return (
              <Image source={focused ? Images.HOME_TAB_BLACK : Images.HOME_TAB_GREY}   style={{ width: 25, height: 25 }} />
            );
          },
          tabBarActiveTintColor: Colors.BLACK,
          tabBarInactiveTintColor: Colors.DARK_GREY,
        }}
      />
      
      <Tab.Screen
        name='Search'
        component={SearchScreen}
        options={{
          headerShown: true,
          header: () => <AppHeader hasSearch={false} hasBack/>,  
          title: t("search"),
          tabBarIcon: ({ focused }) => {
            return (
              <Image source={focused ? Images.SEARCH_BLACK : Images.SEARCH_GREY}  style={{ width: 25, height: 25 }} />
            );
          },
          tabBarActiveTintColor: Colors.BLACK,
          tabBarInactiveTintColor: Colors.DARK_GREY
        }}
      />
      <Tab.Screen
        name='Wishlist'
        component={WishListScreen}
        options={{
          headerShown: true,
          header: () => <AppHeader hasSearch={false} hasBack/>,  
          title: t("search"),
          tabBarIcon: ({ focused }) => {
            return (
              <Image source={focused ? Images.HEART_YELLOW : Images.HEART_YELLOW}  style={{ width: 25, height: 25 }} />
            );
          },
          tabBarActiveTintColor: Colors.BLACK,
          tabBarInactiveTintColor: Colors.DARK_GREY
        }}
      />
      <Tab.Screen
        name='Checkout'
        component={CheckoutStack}
        options={{
          headerShown: false,
          title: t("checkoutTab"),
          tabBarIcon: ({ focused }) => {
            return (
              <Image source={focused ? Images.CART_BLACK : Images.CART_GREY}  style={{ width: 25, height: 25 }} />
            );
          },
          tabBarActiveTintColor: Colors.BLACK,
          tabBarInactiveTintColor: Colors.DARK_GREY,
          tabBarBadge: totalItemCount > 0 ? totalItemCount : undefined
        }}

      />
      <Tab.Screen
        name='Profile'
        component={ProfileStack}
        options={{
          title: t("profileTab"),
          tabBarIcon: ({ focused}) => {
            return (
              <Image source={focused ? Images.PROFILE_BLACK : Images.PROFILE_GREY}  style={{ width: 25, height: 25 }} />
            );
          },
          tabBarActiveTintColor: Colors.BLACK,
          tabBarInactiveTintColor: Colors.DARK_GREY
        }}
      />
      
    </Tab.Navigator>
  );
};

export default Tabs;