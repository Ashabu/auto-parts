import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '../utils/Images';
import ProductList from './ProductList';

const CheckoutList = ({ item }: any) => {
    const [itemCount, setItemCount] = useState<number>(item.item_count);
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
            <View style={{ flex: 5 }}>
                <ProductList product={item} />
            </View>
            <View style={styles.counterBox}>
                <TouchableOpacity onPress={() => setItemCount(prev => prev + 1)}>
                    <Image source={Images.COUNT_ARROW_UP} style={{ width: 15, height: 7 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 26}}>{itemCount}</Text>
                <TouchableOpacity onPress={() => setItemCount(prev => prev - 1)}>
                    <Image source={Images.COUNT_ARROW_DOWN} style={{ width: 15, height: 7 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CheckoutList;

const styles = StyleSheet.create({
    counterBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 5,
        width: 90,
        paddingHorizontal: 10,
    },
})