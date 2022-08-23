import React from 'react'
import Tabs from './navigation/Tab';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './navigation/Navigation';

const AppIndex = () => {
    return (
        <NavigationContainer ref={navigationRef}>
        <Tabs />
        </NavigationContainer>
    );
};

export default AppIndex;