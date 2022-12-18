import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './navigation/Navigation';
import AppNavigation from './navigation';
import { ProductsProvider } from './Context/ProductsContext';
import { useAuth, useLang } from './Context/Context';
import { getData } from './services/StorageService';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { CarsProvider } from './Context/CarsContext';
import { Colors } from './utils/AppColors';
import { NotificationProvider } from './Context/NotificationContext';

const AppIndex = () => {
  const { handleSignIn } = useAuth();
  const { i18n } = useTranslation();
  const { handleSetLang } = useLang()

  const handleSetLanguage = () => {
    try {
      getData("lang").then(value => {
        if (value) {
          handleSetLang(value);
        };
      }).catch((err: any) => {
        throw err
      })
    } catch (err: any) {
      console.log(JSON.parse(JSON.stringify(err.response.data.message)))
    }
  };


  const getCatalogueList = () => {
    axios.get('/src/utils/PravusExel.json').then(res => {
    }).catch(e => console.log('sssssssssssss', e))
  }


  const handleAuthorization = () => {
    getData('access_token').then(res => {
      if (res) handleSignIn(true);
    }).catch((err: any) => {
      console.log(JSON.parse(JSON.stringify(err.response.data.message)));
    });
  };

  useEffect(() => {
    getCatalogueList()
    handleAuthorization();
    handleSetLanguage();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.BLACK} barStyle='dark-content' translucent />
      <NotificationProvider>
        <NavigationContainer ref={navigationRef}>
          <CarsProvider>
            <ProductsProvider >
              <AppNavigation />
            </ProductsProvider>
          </CarsProvider>
        </NavigationContainer>
      </NotificationProvider>
    </SafeAreaView>
  );
};

export default AppIndex;