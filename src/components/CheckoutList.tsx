import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../Context/Context';
import { Images } from '../utils/Images';
import ProductList from './ProductList';

const CheckoutList = ({ item }: any) => {
    const { cartItems, handleAddItem } = useCart()
    const [itemCount, setItemCount] = useState<number>(item.item_count);

  
    const handleItemCount = (type: string) => {
        const tempCartItems = cartItems;
        let index = cartItems.findIndex(el => el.id == item.id);
        if (type == 'INCREMENT') {
            tempCartItems[index].item_count += 1;
            setItemCount(prev => prev + 1)
        } else {
            tempCartItems[index].item_count -= 1;
            setItemCount(prev => prev - 1)
        }
        handleAddItem(tempCartItems);
    }


    return (
        <View style={{height: 130, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10}}>
            <View style={{ flex: 1 }}>
                <ProductList product={item} />
            </View>
            <View style={styles.counterBox}>
                <TouchableOpacity onPress={() => handleItemCount('INCREMENT')}>
                    <Image source={Images.COUNT_ARROW_UP} style={{ width: 15, height: 7 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 26 }}>{itemCount}</Text>
                <TouchableOpacity onPress={() => handleItemCount('DECREMENT')}>
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