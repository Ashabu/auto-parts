import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useProduct, useProductDispatch } from '../Context/ProductsContext';
import { Colors } from '../utils/AppColors';
import { Images } from '../utils/Images';
import ProductList from './ProductList';

const CheckoutList = ({ item, isCheckout = false }: { item: any, isCheckout: boolean }) => {
    const { shoppingCart } = useProduct();
    const dispatch = useProductDispatch();


    const handleItemCount = (type: string) => {
        let tempCartItems = shoppingCart;
        tempCartItems.map(el => {
            if (el.ARticle == item.ARticle) {
                if (type == 'INCREMENT') {
                    if (el.count + 1 > item.Volume) return;
                    item.count++;
                } else {
                    if (el.count - 1 == 0) return;
                    item.count--;
                };
            };
            return el;
        });
        dispatch({ shoppingCart: [...tempCartItems] });
    };

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <ProductList
                    product={item}
                    hideIcons={isCheckout} />
            </View>
            <View style={styles.counterBox}>
                <TouchableOpacity onPress={() => handleItemCount('INCREMENT')} style={styles.counterArrow}>
                    <Image source={Images.COUNT_ARROW_UP} style={{ width: 15, height: 7 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 26, color: Colors.BLACK }}>{item.count}</Text>
                <TouchableOpacity onPress={() => handleItemCount('DECREMENT')} style={styles.counterArrow}>
                    <Image source={Images.COUNT_ARROW_DOWN} style={{ width: 15, height: 7 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CheckoutList;

const styles = StyleSheet.create({
    container: {
        height: 130,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    counterBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 5,
        width: 90,

    },
    counterArrow: {
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }
})