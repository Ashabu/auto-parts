import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdateOrderScreen from '../../screens/UpdateOrderScreen';
import CheckoutScreen from '../../screens/CheckoutScreen';
import AppHeader from '../../components/AppHeader';
import WishListScreen from '../../screens/WishListScreen';
import MainCategories from '../../screens/CategoriesScreens/MainCategories';
import AllCategoriesScreen from '../../screens/CategoriesScreens/AllCategoriesScreen';


const Stack = createNativeStackNavigator();

const CategoriesStack = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="MainCategories" component={MainCategories}
                options={{
                    header: () => <AppHeader />
                }} />
            <Stack.Screen
                name="AllCategories"
                component={AllCategoriesScreen}
                options={{
                    header: () => <AppHeader hasBack />
                }} />
        </Stack.Navigator>
    )
}

export default CategoriesStack