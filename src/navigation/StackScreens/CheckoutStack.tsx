import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UpdateOrderScreen from '../../screens/UpdateOrderScreen';
import CheckoutScreen from '../../screens/CheckoutScreen';

const Stack = createNativeStackNavigator();

const CheckoutStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CheckoutS" component={UpdateOrderScreen} />
            <Stack.Screen name="UpdateOrder" component={CheckoutScreen} />
            
        </Stack.Navigator>
    );
};

export default CheckoutStack;
