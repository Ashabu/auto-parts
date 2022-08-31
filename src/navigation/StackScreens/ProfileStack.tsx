import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../Navigation';

import AppHeader from '../../components/AppHeader';
import Profile from '../../screens/Profile/Profile';
import SignInScreen from '../../screens/SignInScreen';
import SignUpScreen from '../../screens/SignUpScreen';


const Stack = createNativeStackNavigator();


const ProfileStack = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen
                name='ProfileS'
                component={Profile}
                options={{
                    header: () => <AppHeader />
                }} />

            <Stack.Screen
                name='Sign In'
                component={SignInScreen}
                options={{
                   
                }} />
                <Stack.Screen
                name='Sign Up'
                component={SignUpScreen}
                options={{
                   
                }} />

        </Stack.Navigator>
    );
}

export default ProfileStack;