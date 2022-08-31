import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UpdateOrderScreen from '../../screens/UpdateOrderScreen';
import CheckoutScreen from '../../screens/CheckoutScreen';
import AppHeader from '../../components/AppHeader';

const Stack = createNativeStackNavigator();

const CheckoutStack = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="CheckoutS" component={UpdateOrderScreen}
             options={{
                header: () => <AppHeader/>
            }} />
            <Stack.Screen name="UpdateOrder" component={CheckoutScreen} />
            
        </Stack.Navigator>
    );
};

export default CheckoutStack;
