import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdateOrderScreen from '../../screens/UpdateOrderScreen';
import AboutUsScreen from '../../screens/AboutUsScreen';
import Tabs from '../Tab';
import { NavigationContainer } from '@react-navigation/native';
import {navigationRef} from '../Navigation';


const Stack = createNativeStackNavigator();


const Stacks = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Tabs} />
                <Stack.Screen name="UpdateOrder" component={UpdateOrderScreen} />
                <Stack.Screen name="AboutUs" component={AboutUsScreen} />
            </Stack.Navigator> */}
        </NavigationContainer>
    )
}

export default Stacks