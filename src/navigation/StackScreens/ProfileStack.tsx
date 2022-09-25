import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppHeader from '../../components/AppHeader';
import ProfileScreen from './../../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen
                name='ProfileS'
                component={ProfileScreen}
                options={{
                    header: () => <AppHeader hasBack/>
                }} />
        </Stack.Navigator>
    );
}

export default ProfileStack;