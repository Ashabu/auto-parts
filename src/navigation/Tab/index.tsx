import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from '../../screens/SearchScreen';
import HomeStack from '../StackScreens/HomeStack';
import CheckoutStack from '../StackScreens/CheckoutStack';
import { Image, Platform, Text } from 'react-native';
import { Images } from '../../utils/Images';
import { useProduct } from '../../Context/ProductsContext';
import ProfileStack from '../StackScreens/ProfileStack';
import { useAuth } from '../../Context/Context';
import OrderHistoryScreen from '../../screens/OrderHistoryScreen';
import AppHeader from '../../components/AppHeader';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../utils/AppColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WishListScreen from '../../screens/WishListScreen';
import { useNotificationState } from '../../Context/NotificationContext';



const Tab = createBottomTabNavigator();


const Tabs = () => {
  const { t } = useTranslation();
  const {message} = useNotificationState();
  const { shoppingCart, wishList } = useProduct();
  const [counts, setCounts] = useState<{ cartCount: number, wishlistCount: number }>({
    cartCount: 0,
    wishlistCount: 0
  })


  const handleCount = () => {
    let tempCartCount: number = 0;
    let tempWishlistCount: number = 0;
    if (shoppingCart.length > 0) {
      shoppingCart.forEach(el => tempCartCount += el.count);
    };
    if (wishList.length > 0) {
      wishList.forEach(el => tempWishlistCount += el.count);
    };
    setCounts({cartCount: tempCartCount, wishlistCount: tempWishlistCount});
  };

  useEffect(() => {
      handleCount()
      console.log('here')
  }, [shoppingCart, wishList, message]);



  return (

    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.WHITE,
          height: Platform.OS === 'ios' ? 88 : 72,
          alignItems: 'center',
          justifyContent: 'center',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 12.0,
          elevation: 24,
        },
      }}>
      <Tab.Screen
        name='Home'
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Image source={focused ? Images.HOME_TAB_BLACK : Images.HOME_TAB_GREY} style={{ width: 25, height: 25 }} />
                <Text style={{ color: focused ? Colors.YELLOW : Colors.GREY, fontSize: 14, fontWeight: focused ? '700' : '400', marginTop: 5 }}>{t("homeTab")}</Text>
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name='Search'
        component={SearchScreen}
        options={{
          headerShown: true,
          header: () => <AppHeader hasSearch={false} hasBack />,
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Image source={focused ? Images.SEARCH_BLACK : Images.SEARCH_GREY} style={{ width: 25, height: 25 }} />
                <Text style={{ color: focused ? Colors.YELLOW : Colors.GREY, fontSize: 14, fontWeight: focused ? '700' : '400', marginTop: 5 }}>{t("search")}</Text>
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name='Wishlist'
        component={WishListScreen}
        options={{
          headerShown: true,
          header: () => <AppHeader hasSearch={false} hasBack />,
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Image source={focused ? Images.FAVORITES_ICON_ACTIVE : Images.FAVORITES_ICON} style={{ width: 25, height: 25 }} />
                <Text style={{ color: focused ? Colors.YELLOW : Colors.GREY, fontSize: 14, fontWeight: focused ? '700' : '400', marginTop: 5 }}>{'Wishlist'}</Text>
              </>
            );
          },
          tabBarBadge: counts.wishlistCount > 0 ? counts.wishlistCount : undefined
        }}
      />
      <Tab.Screen
        name='Checkout'
        component={CheckoutStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Image source={focused ? Images.CART_BLACK : Images.CART_GREY} style={{ width: 25, height: 25 }} />
                <Text style={{ color: focused ? Colors.YELLOW : Colors.GREY, fontSize: 14, fontWeight: focused ? '700' : '400', marginTop: 5 }}>{t("checkoutTab")}</Text>
              </>
            );
          },
          tabBarBadge: counts.cartCount > 0 ? counts.cartCount : undefined
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Image source={focused ? Images.PROFILE_BLACK : Images.PROFILE_GREY} style={{ width: 25, height: 25 }} />
                <Text style={{ color: focused ? Colors.YELLOW : Colors.GREY, fontSize: 14, fontWeight: focused ? '700' : '400', marginTop: 5 }}>{t("profileTab")}</Text>
              </>
            );
          }
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;