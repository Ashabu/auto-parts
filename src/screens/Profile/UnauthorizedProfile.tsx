import React from 'react'
import {Button, Text, View} from 'react-native';
import {navigate} from '../../navigation/Navigation';

const UnauthorizedProfile = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>
                Unauthorized Profile
            </Text>
            <Button title='Update Order' onPress={() => navigate('Checkout', { screen: 'UpdateOrder' })} />
        </View>
  )
}

export default UnauthorizedProfile