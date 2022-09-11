import React, { useEffect, type PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/navigation/Tab';
import Stacks from './src/navigation/StackScreens/ProfileStack';
import AppIndex from './src/AppIndex';
import { ContextProvider } from './src/Context/Context';
import {GetFinaAuthToken} from './src/Api';

const App = () => {

  useEffect(() => {
    GetFinaAuthToken();
  }, [])

  return (
    <ContextProvider>
      <AppIndex />
    </ContextProvider>

  );
};


export default App;
