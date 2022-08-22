import React from 'react'
import { Button, Text, View } from 'react-native';
import {navigate} from '../navigation/Navigation';

const CheckoutScreen = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>
                Checkout Screen
            </Text>
            <Button title='Update Order' onPress={()=>navigate('Checkout', {screen: 'UpdateOrder'})}/>
        </View>
    )
}

export default CheckoutScreen  