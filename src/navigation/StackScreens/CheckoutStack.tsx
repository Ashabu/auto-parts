import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdateOrderScreen from '../../screens/UpdateOrderScreen';
import CheckoutScreen from '../../screens/CheckoutScreen';
import AppHeader from '../../components/AppHeader';
import WishListScreen from '../../screens/WishListScreen';
import ProductDetailScreen from '../../screens/ProductDetailScreen';

const Stack = createNativeStackNavigator();

const CheckoutStack = () => {
    return (
        <Stack.Navigator  >
            <Stack.Screen
                name="CheckoutS"
                component={CheckoutScreen}
            // options={{
            //     header: () => <AppHeader />
            // }} 
            />
            <Stack.Screen name="UpdateOrder" component={UpdateOrderScreen} />
            <Stack.Screen
                name="WishList"
                component={WishListScreen}
            // options={{
            //     header: () => <AppHeader hasBack />
            // }} 
            />
        </Stack.Navigator>
    );
};

export default CheckoutStack;
