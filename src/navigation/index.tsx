import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useEffect, useState } from 'react';
import { getData } from '../services/StorageService';
import LandingStack from './StackScreens/LandingStack';
import Tabs from './Tab';
import AppHeader from '../components/AppHeader';
import ProductDetailScreen from '../screens/ProductDetailScreen';


const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    const [isOnboarding, setIsOnboarding] = useState<boolean>(false);
    const [initialized, setIsInitialized] = useState<boolean>(false);

    const onAppInitialize = () => {
        getData('onboarding').then(response => {
            if (response) {
                setIsOnboarding(true);
            }
        }).finally(() => {
            setIsInitialized(true);
        });
    };
    useEffect(() => {
        onAppInitialize();
    }, [])

    return (
        !initialized && !isOnboarding ?
            <LandingStack />
            :
            <Stack.Navigator>
                <Stack.Screen name="Root" component={Tabs} options={{headerShown: false}}/>
                <Stack.Screen
                    name="ProductDetails"
                    component={ProductDetailScreen}
                    options={{
                        header: () => <AppHeader hasBack />
                    }} />
            </Stack.Navigator>
    );
};

export default AppNavigation;