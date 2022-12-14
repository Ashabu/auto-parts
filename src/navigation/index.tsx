import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useEffect, useState } from 'react';
import { getData } from '../services/StorageService';
import LandingStack from './StackScreens/LandingStack';
import Tabs from './Tab';
import AppHeader from '../components/AppHeader';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import AddCarScreen from '../screens/AddCarScreen';
import { useOnboarding } from '../Context/Context';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SupportScreen from '../screens/SupportScreen';
import DeliveryAddressScreen from '../screens/DeliveryAddressScreen';
import ChoseLanguageScreen from '../screens/ChoseLanguageScreen';
import { useTranslation } from 'react-i18next';
import ProductDetail from '../screens/ProductDetail';


const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    const [isOnboarding, setIsOnboarding] = useState<boolean>(false);
    const [initialized, setIsInitialized] = useState<boolean>(false);
    const { isOnboard } = useOnboarding();
    const { t } = useTranslation();

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

    useEffect(() => {
        setIsOnboarding(isOnboard)
    }, [isOnboard])
    return (
        initialized && !isOnboarding ?
            <LandingStack />
            :
            <Stack.Navigator
                screenOptions={{
                    headerTintColor: '#FFFFFF',
                    headerStyle: {
                        backgroundColor: '#000'
                    }
                }} >
                <Stack.Screen name="Root" component={Tabs} options={{ headerShown: false }} />
                <Stack.Screen
                    name="ProductDetails"
                    component={ProductDetailScreen}
                    options={{
                        header: () => <AppHeader hasBack />
                    }} />
                <Stack.Screen
                    name="ProductDetail"
                    component={ProductDetail}
                    options={{
                        header: () => <AppHeader hasBack />
                    }} />
                <Stack.Screen
                    name="AddCar"
                    component={AddCarScreen}
                    options={{
                        header: () => <AppHeader hasBack />
                    }} />
                <Stack.Screen
                    name='SignIn'
                    component={SignInScreen}
                    options={{
                        title: t('signIn')
                    }}
                />
                <Stack.Screen
                    name='SignUp'
                    component={SignUpScreen}
                    options={{
                        title: t('signUp')
                    }}
                />
                <Stack.Screen
                    name='Support'
                    component={SupportScreen}
                    options={{
                        header: () => <AppHeader hasBack />
                    }} />
                <Stack.Screen
                    name='Address'
                    component={DeliveryAddressScreen}
                    options={{
                        header: () => <AppHeader hasBack />
                    }} />
                <Stack.Screen
                    name='ChooseLanguage'
                    component={ChoseLanguageScreen}
                    options={{
                        headerTitle: t('settings')
                    }} />

            </Stack.Navigator>
    );
};

export default AppNavigation;