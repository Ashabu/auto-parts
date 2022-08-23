import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../../screens/LandingScreen';
import OnboardingScreen from '../../screens/OnboardingScreen';



const Stack = createNativeStackNavigator();

const LandingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='landing' component={LandingScreen}/>
        <Stack.Screen name='onboarding' component={OnboardingScreen}/>
    </Stack.Navigator>
  )
}

export default LandingStack