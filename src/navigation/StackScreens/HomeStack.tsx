import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';
import AboutUsScreen from '../../screens/AboutUsScreen';
import AppHeader from '../../components/AppHeader';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen 
            name="HomeS" 
            component={HomeScreen} 
            options={{
                header: () => <AppHeader/>
            }}/>
            <Stack.Screen name="AboutUs" component={AboutUsScreen} />
        </Stack.Navigator>
    );
};

export default HomeStack;
