import React, { useEffect} from 'react';;
import AppIndex from './src/AppIndex';
import { ContextProvider, useAuth } from './src/Context/Context';
import { GetFinaAuthToken } from './src/Api';
import { getData } from './src/services/StorageService';

const App = () => {
 

  useEffect(() => {
    GetFinaAuthToken();
  }, []);

 

  return (
    <ContextProvider>
      <AppIndex />
    </ContextProvider>

  );
};


export default App;
