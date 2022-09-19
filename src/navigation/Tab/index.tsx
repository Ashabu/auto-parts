import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductsScreen from '../../screens/ProductsScreen';
import SearchScreen from '../../screens/SearchScreen';
import HomeStack from '../StackScreens/HomeStack';
import CheckoutStack from '../StackScreens/CheckoutStack';
import { Image } from 'react-native';
import { Images } from '../../utils/Images';
import { useCartItems } from '../../Context/useProducts';
import ProfileStack from '../StackScreens/ProfileStack';
import { useAuth } from '../../Context/Context';
import OrderHistoryScreen from '../../screens/OrderHistoryScreen';
import AppHeader from '../../components/AppHeader';
import { useTranslation } from 'react-i18next';



const Tab = createBottomTabNavigator();


const Tabs = () => {
  const { isAuthorized } = useAuth();
  const {t} = useTranslation()

  const { totalItems } = useCartItems();

  return (

    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffdd00',
        },
      }}>
      <Tab.Screen
        name='Home'
        component={HomeStack}
        options={{
          title: t("homeTab"),
        }}
      />
      <Tab.Screen
        name='Products'
        component={ProductsScreen}
        options={{
          title: t("productsTab"),
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
          title: t("search"),
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
          headerShown: false,
          title: t("checkoutTab"),
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Image source={focused ? Images.CART_BLACK : Images.CART_GREY} style={{ width: 23, height: 23 }} />
            );
          },
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#B7C4CB',
          tabBarBadge: totalItems > 0 ? totalItems : undefined
        }}

      />
      <Tab.Screen
        name='Profile'
        component={ProfileStack}
        options={{
          title: t("profileTab"),
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Image source={focused ? Images.PROFILE_BLACK : Images.PROFILE_GREY} style={{ width: 23, height: 23 }} />
            );
          },
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#B7C4CB'
        }}
      />
      {
        isAuthorized &&
        <Tab.Screen
          name='OrderHistory'
          component={OrderHistoryScreen}
          options={{
            headerShown: true,
            header: () => <AppHeader/>,  
            title: t("ordersTab"),
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Image source={focused ? Images.BASKET_BLACK : Images.BASKET_BLACK} style={{ width: 23, height: 23 }} />
              );
            },
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#B7C4CB'
          }}
        />

      }
    </Tab.Navigator>
  );
};

export default Tabs;