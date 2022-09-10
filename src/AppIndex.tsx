import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './navigation/Navigation';
import AppNavigation from './navigation';

const AppIndex = () => {
    return (
        <NavigationContainer ref={navigationRef}>
        <AppNavigation />
        </NavigationContainer>
    );
};

export default AppIndex;