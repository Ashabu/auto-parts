import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { goBack, navigate } from '../navigation/Navigation';
import { Images } from '../utils/Images';

interface IHeaderProps {
    hasBack?: boolean
}

const AppHeader:React.FC<IHeaderProps> = ({hasBack}) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.headerLeft} onPress={()=> goBack()}>
                {hasBack && <Text style={{color: '#FFFFFF'}}>Back</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerMid} onPress={()=> navigate('Home', {screen: 'HomeS'})}>
               <Image source={Images.APP_LOGO} resizeMode = 'contain' style={{height: 40}}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.headerRight} onPress={()=> navigate('Checkout', {screen: 'WishList'})}>
                <Image source={Images.FAVORITES_ICON} style={{width: 20, height: 18}}/>
            </TouchableOpacity>
        </View>
    )
}

export default AppHeader;

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        backgroundColor: '#000',
        paddingHorizontal: 15
    },
    headerRight: {
        width: '10%',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    headerMid: {
        width: '80%',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerLeft: {
        width: '10%',
        justifyContent: 'center'
    }
})