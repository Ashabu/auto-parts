import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './navigation/Navigation';
import AppNavigation from './navigation';
import { ProductsProvider } from './Context/useProducts';

const AppIndex = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <ProductsProvider >
                <AppNavigation />
            </ProductsProvider>
        </NavigationContainer>
    );
};

export default AppIndex;