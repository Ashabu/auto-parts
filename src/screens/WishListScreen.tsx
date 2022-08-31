import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const WishListScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1}}>
            <View style={{flex: 8, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.title}>
                    Wishlist is empty
                </Text>
                <Text style={styles.subTitle}>
                    There is no item in wishlist
                </Text>
            </View>
            <View style={{flex: 2, alignItems: 'center'}}>
                <TouchableOpacity style={styles.showNowBtn}>
                    <Text style={styles.subTitle}>Shop Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default WishListScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 15
    },
    subTitle: {
        fontSize: 14,
        textAlign: 'center'
    },
    showNowBtn: {
        backgroundColor: '#ffdd00',
        padding: 15,
        borderRadius: 10,
        width: 150
    }
})