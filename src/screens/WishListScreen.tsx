import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '../utils/Images';
import {navigate} from '../navigation/Navigation';

const WishListScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Image source ={Images.FAVORITES_ICON} style={{ width: 82, height: 74 , alignSelf: 'center' }} />
                <Text style={styles.title}>
                    Wishlist Is Empty
                </Text>
                <Text style={styles.subtitle}>
                    There is no item in wishlist
                </Text>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={()=> navigate('Search')}>
                    <Text style={styles.buttonTitle}>Shop Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default WishListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 9,
        justifyContent: 'center'
    },
    footer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginVertical: 10
    },
    subtitle: {
        textAlign: 'center'
    },
    button: {
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: '#ffdd00',
        width: 180,
        alignSelf: 'center'
    },
    buttonTitle: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center'
    }
})