import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductsScreen from '../../screens/ProductsScreen';
import SearchScreen from '../../screens/SearchScreen';
import HomeStack from '../StackScreens/HomeStack';
import CheckoutStack from '../StackScreens/CheckoutStack';
import { Image } from 'react-native';
import { Images } from '../../utils/Images';
import ProfileStack from '../StackScreens/ProfileStack';
import { getData } from '../../services/StorageService';
import { useCart } from '../../Context/Context';



const Tab = createBottomTabNavigator();


const Tabs = () => {
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const {cartItems} = useCart();
  console.log(cartItems)
  

  const handleCartItemCount = () => {
    let result = 0;
    if(cartItems.length) {
      result = cartItems.reduce((count: number, item: any) => {
        return  count + item.item_count
      }, 0)
    }
    setCartItemCount(result);

  //   getData('checkout_items').then(data => {
  //     if (data) {
  //       let parsedData = JSON.parse(data);
  //       result = parsedData.reduce((count: number, item: any) => {
  //         return count + item.item_count;
  //       }, 0)
  //       for (let i = 0; i < data.length; i++) {
  //         result += parsedData?.[i]?.item_count
  //       };
  //     };
  //   }).catch((e: any) => {
  //     console.log(e);
  //   }).finally(() => {
      
  //   });
  };



  useEffect(() => {
    console.log('count increased')
    handleCartItemCount();
  }, [cartItems.length])

  return (

    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffdd00',
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
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Image source={focused ? Images.CART_BLACK : Images.CART_GREY} style={{ width: 23, height: 23 }} />
            );
          },
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#B7C4CB',
          tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined
        }}

      />
      <Tab.Screen
        name='Profile'
        component={ProfileStack}
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