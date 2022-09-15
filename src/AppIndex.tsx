import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './navigation/Navigation';
import AppNavigation from './navigation';
import { ProductsProvider } from './Context/useProducts';
import {useAuth} from './Context/Context';
import {getData} from './services/StorageService';
import {useEffect} from 'react';

const AppIndex = () => {
    const { handleSignIn } = useAuth();

    const handleAuthorization = () => {
      getData('access_token').then(res => {
        console.log(res)
        if (res) handleSignIn(true);
      }).catch((err: any) => {
        console.log(JSON.parse(JSON.stringify(err.response.data.message)));
      });
    };

    useEffect(() => {
        handleAuthorization()
      }, []);

    return (
        <NavigationContainer ref={navigationRef}>
            <ProductsProvider >
                <AppNavigation />
            </ProductsProvider>
        </NavigationContainer>
    );
};

export default AppIndex;