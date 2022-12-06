import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCartItems } from '../Context/ProductsContext';
import { Images } from '../utils/Images';
import ProductList from './ProductList';

const CheckoutList = ({ item }: any) => {
    const { cartItems, handleAddItem, handleIncrement, handleDecrement } = useCartItems();
    const [itemCount, setItemCount] = useState<number>(item.item_count);

  
    const handleItemCount = (type: string) => {
        let  tempCartItems;
        let index = cartItems.findIndex(el => el.Code == item.Code);
   
        if (type == 'INCREMENT') {
            tempCartItems = cartItems.map(el => {
                if(el.Code == item.Code) {
                    el.item_count += 1;
                }
                return el;
            }) 
            setItemCount(prev => prev + 1)
        } else {
            tempCartItems = cartItems.map(el => {
                if(el.Code == item.Code) {
                    el.item_count -= 1;
                }
                return el;
            }) 
            
        }
        handleAddItem(item);
    }


    return (
        <View style={{height: 130, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10}}>
            <View style={{ flex: 1 }}>
                <ProductList product={item} />
            </View>
            <View style={styles.counterBox}>
                <TouchableOpacity onPress={() => handleIncrement(item)}  style={styles.counterArrow}>
                    <Image source={Images.COUNT_ARROW_UP} style={{ width: 15, height: 7 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 26 }}>{item.item_count}</Text>
                <TouchableOpacity onPress={() => handleDecrement(item)}  style={styles.counterArrow}>
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
       
    },
    counterArrow :{
        height: 30, 
        width: 30, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
})