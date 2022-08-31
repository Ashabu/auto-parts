import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { navigate } from '../navigation/Navigation';
import { Images } from '../utils/Images';


const AppHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerLeft}>

            </View>
            <TouchableOpacity style={styles.headerMid} onPress={()=> navigate('Home', {screen: 'HomeS'})}>
               <Image source={Images.APP_LOGO} resizeMode = 'contain' style={{height: 40}}/>
            </TouchableOpacity>

            <View style={styles.headerRight}>
                <Image source={Images.FAVORITES_ICON} style={{width: 20, height: 18}}/>
            </View>
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
    },
    headerRight: {
        width: '10%',
        alignItems: 'center',
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
       
    }
})