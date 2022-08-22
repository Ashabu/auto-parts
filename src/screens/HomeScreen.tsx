import React from 'react'
import {Text, View, Button} from 'react-native';
import {navigate} from '../navigation/Navigation';

const HomeScreen = () => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>
                Home Screen
            </Text>
            <Button title='About Us' onPress={()=>navigate('AboutUs')}/>
        </View>
    )
}

export default HomeScreen