import React, { type PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/navigation/Tab';
import Stacks from './src/navigation/StackScreens';
import AppIndex from './src/AppIndex';
import { ContextProvider } from './src/Context/Context';

const App = () => {

  return (
    <ContextProvider>
      <AppIndex />
    </ContextProvider>

  );
};


export default App;
