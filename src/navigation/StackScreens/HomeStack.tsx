import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';
import AboutUsScreen from '../../screens/AboutUsScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeS" component={HomeScreen} />
            <Stack.Screen name="AboutUs" component={AboutUsScreen} />
        </Stack.Navigator>
    );
};

export default HomeStack;
