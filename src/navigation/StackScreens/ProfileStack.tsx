import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {navigationRef} from '../Navigation';
import Index from '../../screens/Profile';
import AppHeader from '../../components/AppHeader';


const Stack = createNativeStackNavigator();


const ProfileStack = () => {
    return (
            <Stack.Navigator >
                <Stack.Screen 
                name='ProfileS' 
                component={Index}
                options={{
                    header: () => <AppHeader/>
                }}/>
                
            </Stack.Navigator> 
    );
}

export default ProfileStack;