import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { navigate } from '../navigation/Navigation';
import { Colors } from '../utils/AppColors';
import { Images } from '../utils/Images';

const OrderHistoryScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Image source={Images.BASKET_BLACK} style={{ width: 72, height: 72, alignSelf: 'center' }} />
                <Text style={styles.title}>Order History</Text>
                <Text style={styles.subtitle}>You don't have any orders</Text>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={()=> navigate('Search')}>
                    <Text style={styles.buttonTitle}>Shop Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 9,
        justifyContent: 'center'
    },
    footer: {
        flex: 1,
    },
    title:{
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
        backgroundColor: Colors.YELLOW,
        width: 180,
        alignSelf: 'center'
    },
    buttonTitle: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center'
    }
})