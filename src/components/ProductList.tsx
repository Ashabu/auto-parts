import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { navigate } from '../navigation/Navigation';
import { Images } from '../utils/Images';

const ProductList = ({ product }: any) => {
    const { name, price } = product;

    const handleProductPress = () => {
        navigate("Checkout", {
            screen: "ProductDetailScreen",
            params: {
                item: product
            }
        });
    };

    return (
        <TouchableOpacity style={styles.productWrap} onPress={handleProductPress}>
            <Image source={Images.NO_IMAGE} style={{ width: 100, height: 100, resizeMode: 'cover' }} />
            <View style={styles.productRight}>
                <Text style={styles.title} numberOfLines={4} ellipsizeMode="tail">
                    {name}
                </Text>
                <Text style={styles.price}>
                    ${price}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default ProductList;

const styles = StyleSheet.create({
    productWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#CFCFCF'
    },
    productRight: {
        marginLeft: 10,
        flexShrink: 1
    },
    title: {
        fontSize: 16,
        marginBottom: 10
    },
    price: {
        fontSize: 20
    }
})