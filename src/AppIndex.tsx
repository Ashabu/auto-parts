import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './navigation/Navigation';
import AppNavigation from './navigation';
import { ProductsProvider } from './Context/useProducts';
import { useAuth, useLang } from './Context/Context';
import { getData } from './services/StorageService';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const AppIndex = () => {
  const { handleSignIn } = useAuth();
  const { i18n } = useTranslation();
  const {handleSetLang} = useLang()

  const handleSetLanguage = () => {
    try {
      getData("lang").then(value => {
        console.log('handleSetLanguage',value)
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
      console.log('***********************************************************************************************************************************',res.data)
    }).catch(e => console.log('sssssssssssss', e))
  }


  const handleAuthorization = () => {
    getData('access_token').then(res => {
      console.log(res)
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
    <NavigationContainer ref={navigationRef}>
      <ProductsProvider >
        <AppNavigation />
      </ProductsProvider>
    </NavigationContainer>
  );
};

export default AppIndex;